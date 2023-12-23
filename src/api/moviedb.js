import axios from 'axios';
import {movieApiKey} from '../utils/apiKeys/movieApiKeys';

// endpoints
const apiBaseUrl = 'http://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${movieApiKey}&language=ru-RU`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${movieApiKey}&language=ru-RU`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${movieApiKey}&language=ru-RU`;

// dynamic endpoints
const movieDetailsEndpoint = id =>
  `${apiBaseUrl}/movie/${id}?api_key=${movieApiKey}&language=ru-RU`;
const movieCreditsEndpoint = id =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${movieApiKey}&language=ru-RU`;
const similarMoviesEndpoint = id =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${movieApiKey}&language=ru-RU`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${movieApiKey}`;

const personDetailsEndpoint = id =>
  `${apiBaseUrl}/person/${id}?api_key=${movieApiKey}&language=ru-RU`;
const personMoviesEndpoint = id =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${movieApiKey}&language=ru-RU`;

export const image500 = path =>
  path ? `http://image.tmdb.org/t/p/w500/${path}` : fallbackMoviePoster;
export const image342 = path =>
  path ? `http://image.tmdb.org/t/p/w342/${path}` : fallbackMoviePoster;
export const image185 = path =>
  path ? `http://image.tmdb.org/t/p/w185/${path}` : fallbackPersonImage;
export const fallbackMoviePoster =
  'http://arbeitgeber.de/wp-content/uploads/2020/11/bda-news-header-1920x1280px-1536x1024.jpg';
export const fallbackPersonImage =
  'http://i.pinimg.com/564x/52/e3/b1/52e3b195a572d00afac7884a733b9bc5.jpg';

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error ' + error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upComingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = id => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = id => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = id => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = id => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = id => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = params => {
  return apiCall(searchMoviesEndpoint, params);
};
