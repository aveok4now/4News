import SQLite from 'react-native-sqlite-storage';
import { openLinkInBrowserHandler } from '../../../components/customs/CustomDrawer/utils/openLink';






export const fetchData = async (query, queryArgs) => {
  try {
    const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
    const result = await db.executeSql(query, queryArgs);
    return result[0].rows.item(0);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchAllUsers = async () => {
  const query = 'SELECT * FROM Users';

  try {
    const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
    const result = await db.executeSql(query);

    const rows = result[0].rows;
    const users = [];

    for (let i = 0; i < rows.length; i++) {
      users.push(rows.item(i));
    }

    return users;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const downloadFile = async () => {
  // const url =
  //     'https://drive.google.com/file/d/1BI5ZG27azsyxB6q7X3-ONQC2_tR10GKq/view?usp=sharing';
  // const filePath = '/data/user/0/com.mynewapp/files/news.db';

  // RNFS.downloadFile({
  //     fromUrl: url,
  //     toFile: filePath,
  //     progress: res => {
  //         const progress = (res.bytesWritten / res.contentLength) * 100;
  //         console.log(`Progress: ${progress.toFixed(2)}%`);
  //         console.log('bites written', res.bytesWritten);
  //     },
  // })
  //     .promise.then(response => {
  //         console.log('File downloaded!', response);
  //         console.log('file saved at: ', filePath);
  //     })
  //     .catch(err => {
  //         console.log('Download error:', err);
  //     });
  openLinkInBrowserHandler(2);
};



export const insertCategories = async () => {
  const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
  let categories = [
    [1, 'Главное'],
    [2, 'Спорт'],
    [3, 'Бизнес'],
    [4, 'Развлечения'],
    [5, 'Здоровье'],
    [6, 'Наука'],
    [7, 'Технологии'],
    [8, 'UsersNews']
  ];

  let queryCount = 'SELECT COUNT(*) FROM Categories';
  let queryInsert = 'INSERT INTO Categories VALUES (?, ?)';

  // Проверка количества записей в таблице
  db.transaction(tx => {
    tx.executeSql(queryCount, [], (_, resultSet) => {
      const rowCount = resultSet.rows.item(0)['COUNT(*)'];
      if (rowCount === 0) {
        // Таблица категорий пуста, выполняем вставку категорий
        db.transaction(tx => {
          categories.forEach(category => {
            tx.executeSql(queryInsert, category, (_, resultSet) => {
              console.log('Категория успешно вставлена:', category);
            },
              (_, error) => {
                console.log('Ошибка при вставке категории:', error);
              });
          });
        });
      } else {
        console.log('Таблица категорий уже содержит записи. Вставка категорий не требуется.');
      }
    });
  });
}


export const createTableLikedMovies = async () => {
  const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

  try {
    await db.transaction(async (tx) => {
      // Проверяем наличие таблицы likedMovies
      const checkTableQuery = "SELECT name FROM sqlite_master WHERE type='table' AND name='likedMovies'";
      const checkResult = await tx.executeSql(checkTableQuery, []);

      if (checkResult && checkResult.rows.length === 0) {
        // Таблица likedMovies отсутствует, создаем её
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS likedMovies(
            id INTEGER NULL,
            title TEXT NULL
          )
        `;
        await tx.executeSql(createTableQuery, []);
        console.log('Таблица likedMovies успешно создана.');
      } else {
        console.log('Таблица likedMovies уже существует. Создание не требуется.');
      }
    });
  } catch (error) {
    console.error('Ошибка при создании таблицы likedMovies:', error);
  }
};


export const addIsLikedColumnIfNeeded = async () => {
  const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

  try {
    await db.transaction(async (tx) => {
      // Проверяем наличие столбца isLiked в таблице Likes
      const checkColumnQuery = `
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='Likes' AND sql LIKE '%isLiked%';
      `;
      const [result] = await tx.executeSql(checkColumnQuery, []);

      if (result && result.rows.length === 0) {
        // Столбец isLiked отсутствует, добавляем его
        const addColumnQuery = 'ALTER TABLE Likes ADD COLUMN isLiked BOOLEAN;';
        await tx.executeSql(addColumnQuery, []);
        console.log('Столбец isLiked успешно добавлен в таблицу Likes.');
      } else {
        console.log('Столбец isLiked уже существует в таблице Likes. Добавление не требуется.');
      }
    });
  } catch (error) {
    console.error('Ошибка при добавлении столбца isLiked в таблицу Likes:', error);
  }
};


export const createTableUsersFeedbacks = async () => {
  const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

  try {
    await db.transaction(async (tx) => {
      // Создаем таблицу UsersFeedbacks, если она не существует
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS UsersFeedbacks(
          userId INTEGER PRIMARY KEY AUTOINCREMENT,
          userLogin TEXT NULL,
          feedBack TEXT NULL
        );
      `;
      await tx.executeSql(createTableQuery, []);
      console.log('Таблица UsersFeedbacks успешно создана или уже существует.');
    });
  } catch (error) {
    console.error('Ошибка при создании таблицы UsersFeedbacks:', error);
  }
};
