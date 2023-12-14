
export const usersQuery =
    'SELECT COUNT(*) as usersCount from Users where userLogin NOT LIKE "admin%"';
export const adminsQuery = 'SELECT COUNT(*) as adminsCount from Administrators';
export const postsQuery = 'SELECT COUNT(*) as postsCount from News';
export const likesQuery = 'SELECT postId, SUM(isLiked) as likesCount FROM Likes';
export const favoritesQuery =
    'SELECT COUNT(*) as favoritesCount from UserFavorites';
export const guestsQuery = 'SELECT COUNT(*) as guestsCount from Guests';
export const ratesQuery = 'SELECT id, AVG(rating) as ratesCount from Rates';
export const commentsQuery = 'SELECT COUNT(*) as commentsCount from Comments';
export const categoriesQuery =
    'SELECT COUNT(*) as categoriesCount from Categories';
