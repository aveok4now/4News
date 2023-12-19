import SQLite from 'react-native-sqlite-storage';

export const createCommentsTable = async () => {
  const db = await SQLite.openDatabase({name: 'news.db', location: 1});

  let query = `
        CREATE TABLE IF NOT EXISTS Comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          postId INTEGER,
          authorName TEXT,
          commentText TEXT,
          timestamp TEXT,
          FOREIGN KEY (postId) REFERENCES News (newsId) ON DELETE CASCADE
        )
      `;
  await db.executeSql(query);
};
