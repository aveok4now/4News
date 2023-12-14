export const saveNewsItem = async (db, userId, newsItemId, createdAt) => {
    const insertNewsQuery = `INSERT INTO UserFavorites (userId, favoriteNewsId, favoriteNewsCount) VALUES (?, ?, ?)`;
    const insertNewsQueryArgs = [userId, createdAt, 1];

    await db.executeSql(insertNewsQuery, insertNewsQueryArgs);
};

export const removeNewsItem = async (db, userId, newsItemId) => {
    const removeNewsQuery = `DELETE FROM UserFavorites WHERE userId = ? AND favoriteNewsId = ?`;
    const removeNewsQueryArgs = [userId, newsItemId];

    await db.executeSql(removeNewsQuery, removeNewsQueryArgs);
};

export const getSavedNewsCount = async (db, userId) => {
    const getSavedNewsCountQuery = `SELECT COALESCE(SUM(favoriteNewsCount), 0) as savedNewsCount FROM UserFavorites WHERE userId = ?`;
    const getSavedNewsCountQueryArgs = [userId];

    const savedNewsCountResult = await db.executeSql(getSavedNewsCountQuery, getSavedNewsCountQueryArgs);
    const savedNewsCount = savedNewsCountResult[0].rows.item(0).savedNewsCount;

    return savedNewsCount;
};

export const isNewsAlreadySaved = async (db, userId, newsItemId) => {
    const checkNewsQuery = `SELECT COUNT(*) as newsCount FROM UserFavorites WHERE userId = ? AND favoriteNewsId = ?`;
    const checkNewsQueryArgs = [userId, newsItemId];

    const newsCountResult = await db.executeSql(checkNewsQuery, checkNewsQueryArgs);
    const newsCount = newsCountResult[0].rows.item(0).newsCount;

    return newsCount > 0;
};