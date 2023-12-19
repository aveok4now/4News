export const usersQuery =
  'SELECT COUNT(*) as usersCount from Users where userLogin NOT LIKE "admin%"';
export const adminsQuery = 'SELECT COUNT(*) as adminsCount from Administrators';
export const postsQuery = 'SELECT COUNT(*) as postsCount from News';
export const likesQuery =
  'SELECT postId, SUM(isLiked) as likesCount FROM Likes';
export const favoritesQuery =
  'SELECT COUNT(*) as favoritesCount from UserFavorites';

export const guestsQuery = 'SELECT COUNT(*) as guestsCount from Guests';
export const ratesQuery = 'SELECT id, AVG(rating) as ratesCount from Rates';
export const commentsQuery = 'SELECT COUNT(*) as commentsCount from Comments';
export const categoriesQuery =
  'SELECT COUNT(*) as categoriesCount from Categories';

export const mostPopularCityQuery = `SELECT userCity, COUNT(userCity) as cityCount
    FROM Users
    GROUP BY userCity
    ORDER BY cityCount DESC;
    `;
export const feedBacksQuery =
  'SELECT COUNT(*) as feedBacksCount FROM UsersFeedbacks';
export const likedMoviesQuery =
  'SELECT COUNT(*) as likedMoviesCount FROM likedMovies';
export const lastRegisteredUserQuery =
  'SELECT userLogin FROM Users ORDER BY userId DESC LIMIT 1';
export const lastSavedMovieQuery =
  'SELECT title FROM likedMovies WHERE rowid = last_insert_rowid()';
