import SQLite from 'react-native-sqlite-storage';
import {createCommentsTable} from '../../CommentsScreen/db/commentFunctions';

export const updatePostTitles = async db => {
  try {
    const updateQuery =
      'UPDATE Likes SET postTitle = (SELECT newsTitle FROM News WHERE Likes.postId = News.newsId)';
    await db.executeSql(updateQuery);
    console.log('Updated postTitle for existing Likes entries');
  } catch (err) {
    console.error(err);
  }
};

export const insertLikesCount = async (data, db) => {
  try {
    let createLikesTableQuery = `
        CREATE TABLE IF NOT EXISTS Likes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          postId INTEGER,
          postTitle TEXT,
          userId INTEGER,
          FOREIGN KEY (postId) REFERENCES News (newsId) ON DELETE CASCADE,
          FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE
        ) `;
    await db.executeSql(createLikesTableQuery);

    console.log('post', data.post);

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

    let insertLikesCountQuery =
      'INSERT INTO Likes (postId, likesCount, postTitle) VALUES (?, ?, ?)';
    let insertLikesCountQueryArgs = [data.newsId, 0, data.post];

    const [result] = await db.executeSql(
      insertLikesCountQuery,
      insertLikesCountQueryArgs,
    );

    if (result.rowsAffected > 0) {
      console.log('Post likes have been inserted into the database');
    } else {
      console.log('Post likes have not been inserted into the database');
    }
    //await updatePostTitles(db);
  } catch (err) {
    console.error(err);
  }
};

export const insertPost = async (data, identify) => {
  try {
    console.log(data);
    const db = await SQLite.openDatabase({name: 'news.db', location: 1});
    //const postDate = data.postTime.toISOString().substring(0, 10);
    let query = `INSERT INTO News (newsId, AuthorName, newsTitle, publishDate, AuthorAdminId, AuthorUserId, categoryType)
                          VALUES (?, ?, ?, ?, COALESCE(?, 0), COALESCE(?, 0), ?)`;

    let queryArgs = [
      data.newsId,
      data.userName,
      data.post,
      data.postTime.toISOString(),
      !identify.includes('admin') ? null : data.id,
      !identify.includes('admin') ? data.id : null,
      'UsersNews',
    ];

    const [result] = await db.executeSql(query, queryArgs);

    if (result.rowsAffected > 0) {
      console.log('Post has been inserted into the database');
      if (identify.includes('admin')) {
        let updateQuery =
          'UPDATE Administrators SET adminPosts = adminPosts + 1 WHERE adminLogin = ?';
        let updateQueryArgs = [data.userName];
        await db.executeSql(updateQuery, updateQueryArgs);
        console.log('adminPosts has been updated');
      }
    } else {
      console.log('Post has not been inserted into the database');
    }

    await insertLikesCount(data, db);
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId, authorName, isAdmin) => {
  try {
    console.log('deletePost', postId, authorName, isAdmin);

    const db = await SQLite.openDatabase({name: 'news.db', location: 1});

    let deleteNewsQuery = 'DELETE FROM News WHERE newsId = ?';
    let deleteNewsArgs = [postId];

    const [newsResult] = await db.executeSql(deleteNewsQuery, deleteNewsArgs);

    if (newsResult.rowsAffected > 0) {
      console.log(
        `Post with ID ${postId} has been deleted from the News table`,
      );
    } else {
      console.log(`Post with ID ${postId} not found in the News table`);
    }

    let deleteLikesQuery = 'DELETE FROM Likes WHERE postId = ?';
    let deleteLikesArgs = [postId];

    const [likesResult] = await db.executeSql(
      deleteLikesQuery,
      deleteLikesArgs,
    );

    if (likesResult.rowsAffected > 0) {
      console.log(
        `Likes for Post with ID ${postId} have been deleted from the Likes table`,
      );
    } else {
      console.log(
        `No likes found for Post with ID ${postId} in the Likes table`,
      );
    }

    let deleteCommentsQuery = 'DELETE FROM Comments WHERE postId = ?';
    let deleteCommentsArgs = [postId];
    const [commentsResult] = await db.executeSql(
      deleteCommentsQuery,
      deleteCommentsArgs,
    );

    if (commentsResult.rowsAffected > 0) {
      console.log(
        `Comments for Post with ID ${postId} have been deleted from the Comments table`,
      );
    } else {
      console.log(
        `No comments found for Post with ID ${postId} in the Comments table`,
      );
    }

    if (isAdmin) {
      let updateAdminPostsQuery =
        'UPDATE Administrators SET adminPosts = adminPosts - 1 WHERE adminLogin = ?';
      let updateAdminPostsArgs = [authorName];

      await db.executeSql(updateAdminPostsQuery, updateAdminPostsArgs);
      console.log(
        `adminPosts for admin ${authorName} has been updated (decremented)`,
      );
    }
  } catch (err) {
    console.log('Error deleting post:', err);
  }
};

export const toggleLike = async (postId, liked) => {
  try {
    const db = await SQLite.openDatabase({name: 'news.db', location: 1});

    if (liked) {
      let incrementLikesQuery = `
                UPDATE Likes SET likesCount = likesCount + 1 WHERE postId = ?
            `;
      let incrementLikesQueryArgs = [postId];
      console.log('updated');
      await db.executeSql(incrementLikesQuery, incrementLikesQueryArgs);
    } else {
      let decrementLikesQuery = `
                UPDATE Likes SET likesCount = likesCount - 1 WHERE postId = ?
            `;
      let decrementLikesQueryArgs = [postId];
      console.log('deupdated');
      await db.executeSql(decrementLikesQuery, decrementLikesQueryArgs);
    }

    let updateIsLikedQuery = `
            UPDATE Likes SET isLiked = ? WHERE postId = ?
        `;
    let updateIsLikedQueryArgs = [liked ? 1 : 0, postId];
    await db.executeSql(updateIsLikedQuery, updateIsLikedQueryArgs);
  } catch (err) {
    console.log(err);
  }
};

export const getCommentsCount = async (postId, setCommentsCount) => {
  try {
    await createCommentsTable();
    console.log('post.id', postId);
    const db = await SQLite.openDatabase({name: 'news.db', location: 1});

    let query =
      'SELECT COUNT(*) as commentsCount FROM Comments WHERE postId = ?';
    let queryArgs = [postId];

    const [result] = await db.executeSql(query, queryArgs);
    const commentsCount = result.rows.item(0).commentsCount;
    console.log('Number of comments:', commentsCount);

    setCommentsCount(commentsCount);
    return commentsCount;
  } catch (err) {
    console.log(err);
    setCommentsCount(0);
    return 0;
  }
};
