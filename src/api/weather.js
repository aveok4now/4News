import axios from 'axios'

import { apiKey } from '../constants'

const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&lang=ru`;
const locationsEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}&lang=ru`;

const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    };

    try {
        const response = await axios.request(options);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log("Ошибка", error);
        return null;
    }
}

export const fetchWeatherForecast = params => {
    let forecastUrl = forecastEndpoint(params);
    return apiCall(forecastUrl);
}

export const fetchLocations = params => {
    let locationsUrl = locationsEndpoint(params);
    return apiCall(locationsUrl);
}