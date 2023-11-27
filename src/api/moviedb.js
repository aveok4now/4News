import axios from "axios";
import { movieApiKey } from "../utils/apiKeys/movieApiKeys";

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${movieApiKey}&language=ru-RU`
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${movieApiKey}&language=ru-RU&page=1`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${movieApiKey}&language=ru-RU&page=1`


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : fallbackMoviePoster;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : fallbackMoviePoster;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : fallbackMoviePoster;
export const fallbackMoviePoster = 'https://arbeitgeber.de/wp-content/uploads/2020/11/bda-news-header-1920x1280px-1536x1024.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';


const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error ' + error);
        return {};
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upComingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}
