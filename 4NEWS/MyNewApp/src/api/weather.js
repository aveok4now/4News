import axios from 'axios'

import { apiKey } from '../constants'

const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no`;
const locationsEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endPoint) => {
    const options = {
        method: 'GET',
        url: endPoint
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log("Ошибка", err);
        return null;
    }
}

export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params));
}

export const fetchLocations = params => {
    return apiCall(locationsEndpoint(params));
}