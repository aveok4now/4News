import SQLite from 'react-native-sqlite-storage';

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

  db.transaction(tx => {
    tx.executeSql(queryCount, [], (_, resultSet) => {
      const rowCount = resultSet.rows.item(0)['COUNT(*)'];
      if (rowCount === 0) {
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
  console.log('createtablemovies')
  try {
    const checkTableQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name= 'likedMovies' `;
    const [checkResult] = await db.executeSql(checkTableQuery);

    if (checkResult && checkResult.rows.length === 0) {
      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS likedMovies(
            id INTEGER NULL,
            title TEXT NULL
          )
        `;
      await db.executeSql(createTableQuery);
      console.log('Таблица likedMovies успешно создана.');
    } else {
      console.log('Таблица likedMovies уже существует. Создание не требуется.');
    }

  } catch (error) {
    console.error('Ошибка при создании таблицы likedMovies:', error);
  }
};


export const addIsLikedColumnIfNeeded = async () => {
  const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

  // try {
  //   await db.transaction(async (tx) => {
  //     const checkColumnQuery = `
  //       SELECT name FROM sqlite_master 
  //       WHERE type='table' AND name='Likes' AND sql LIKE '%isLiked%';
  //     `;
  //     const [result] = await tx.executeSql(checkColumnQuery, []);

  //     if (result && result.rows.length === 0) {
  //       const addColumnQuery = 'ALTER TABLE Likes ADD COLUMN isLiked BOOLEAN;';
  //       await tx.executeSql(addColumnQuery, []);
  //       console.log('Столбец isLiked успешно добавлен в таблицу Likes.');
  //     } else {
  //       console.log('Столбец isLiked уже существует в таблице Likes. Добавление не требуется.');
  //     }
  //   });
  // } catch (error) {
  //   console.error('Ошибка при добавлении столбца isLiked в таблицу Likes:', error);
  // }
  try {
    const checkColumnQuery = `
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='Likes' AND sql LIKE '%isLiked%';
      `;
    const [result] = await db.executeSql(checkColumnQuery);

    if (result.rows.length === 0) {
      const addColumnQuery = 'ALTER TABLE Likes ADD COLUMN isLiked BOOLEAN;';
      await db.executeSql(addColumnQuery);
      console.log('Столбец isLiked успешно добавлен в таблицу Likes.');
    } else {
      console.log('Столбец isLiked уже существует в таблице Likes. Добавление не требуется.');
    }
  } catch (error) {
    console.error('Ошибка при добавлении столбца isLiked в таблицу Likes:', error);
  }
};


export const createTableUsersFeedbacks = async () => {
  const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

  try {
    await db.transaction(async (tx) => {
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

export const alterTableLikes = async () => {
  const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

  try {
    const checkColumnQuery = `
        PRAGMA table_info(Likes);
      `;
    const [checkResult] = await db.executeSql(checkColumnQuery);

    let hasPostTitleColumn = false;
    for (let i = 0; i < checkResult.rows.length; i++) {
      if (checkResult.rows.item(i).name === 'postTitle') {
        hasPostTitleColumn = true;
        break;
      }
    }

    if (!hasPostTitleColumn) {
      const addColumnQuery = 'ALTER TABLE Likes ADD COLUMN postTitle TEXT';
      await db.executeSql(addColumnQuery);
      console.log('Added postTitle column to Likes table');
    }

  } catch (error) {
    console.error('Ошибка при редактировании таблицы Likes:', error);
  }
};

export const alterTableFavorites = async () => {
  const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

  try {
    const checkColumnQuery = `
        PRAGMA table_info(userFavorites);
      `;
    const [checkResult] = await db.executeSql(checkColumnQuery);

    let hasNewsTitleColumn = false;
    for (let i = 0; i < checkResult.rows.length; i++) {
      if (checkResult.rows.item(i).name === 'newsTitle') {
        hasNewsTitleColumn = true;
        break;
      }
    }

    if (!hasNewsTitleColumn) {
      const addColumnQuery = 'ALTER TABLE userFavorites ADD COLUMN newsTitle TEXT';
      await db.executeSql(addColumnQuery);
      console.log('Added newsTitle column to userFavorites table');
    }

  } catch (error) {
    console.error('Ошибка при редактировании таблицы userFavorites:', error);
  }
};
