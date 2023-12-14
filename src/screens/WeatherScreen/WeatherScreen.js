import {View, StatusBar} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Image} from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';
import {debounce} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fetchLocations, fetchWeatherForecast} from '../../api/weather';
import * as Progress from 'react-native-progress';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import SQLite from 'react-native-sqlite-storage';
import searchBg from '../../../assets/images/search-bg.jpg';
import SearchView from './components/SearchView/SearchView';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import WeaklyForeCast from './components/WeaklyForeCast/WeaklyForeCast';
import AdditionalInfo from './components/AdditionalInfo/AdditionalInfo';

export default function WeatherScreen({navigation}) {
  let identify = useUserCredentials();

  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  const handleSearch = value => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        //console.log("Результат " + JSON.stringify(data))
        setLocations(data);
      });
    }
  };

  const handleLocation = loc => {
    setShowSearch(false);
    setLoading(true);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setLoading(false);
      setWeather(data);
      setUserCityToDB(loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, [identify]);

  const fetchMyWeatherData = async () => {
    const db = await SQLite.openDatabase({name: 'news.db', location: 1});
    let myCity = null;

    console.log('IDENTIFY' + identify);

    await db.transaction(tx => {
      tx.executeSql(
        `
            SELECT userCity
            FROM Users
            WHERE userLogin = ?
            `,
        [identify],
        (tx, resultSet) => {
          if (resultSet.rows.length > 0) {
            myCity = resultSet.rows.item(0).userCity;
          }
        },
        (tx, error) => {
          console.error(error);
        },
      );
    });

    console.log('Полученный город: ' + myCity);

    let cityName = 'Sevastopol';
    if (myCity) {
      cityName = myCity;
    }

    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  const setUserCityToDB = async name => {
    try {
      const db = await SQLite.openDatabase({name: 'news.db', location: 1});
      let userId = null;

      if (identify !== 'Гость') {
        const query = 'SELECT userId FROM users WHERE userLogin = ?';
        const queryArgs = [identify];
        const [result] = await db.executeSql(query, queryArgs);

        if (result.rows.length > 0) {
          userId = result.rows.item(0).userId;
          if (userId > 0) {
            db.transaction(tx => {
              tx.executeSql(
                `
                    UPDATE Users
                    SET userCity = ?
                    WHERE userID = ?
                    `,
                [name, userId],
                () => {
                  console.log('success');
                },
                error => {
                  // Обработка ошибки выполнения транзакции
                  console.error(error);
                },
              );
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const query = weather?.forecast?.forecastday[0]?.day;

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather || {};

  const moreInfo = {
    'Минимальная температура': `${query?.mintemp_c}°`,
    'Максимальная температура': `${query?.maxtemp_c}°`,
    'Шанс дождя': `${query?.daily_chance_of_rain}%`,
    'Шанс снега': `${query?.daily_chance_of_snow}%`,
    Закат: `${weather?.forecast?.forecastday[0]?.astro?.sunset}`,
    'Восход Луны': `${weather?.forecast?.forecastday[0]?.astro?.moonrise}`,
    'Заход Луны': `${weather?.forecast?.forecastday[0]?.astro?.moonset}`,
    'Средння влажность': `${query?.avghumidity}%`,
    'Средняя видимость': `${query?.avgvis_km} км`,
    'Максимальная скорость ветра': `${query?.maxwind_kph} км/ч`,
    'Уровень ультрафиолетового излучения': `${query?.uv}`,
  };

  const combinedInfo = Object.entries(moreInfo).map(([key, value]) => ({
    key,
    value,
  }));

  const checkLocation = (city, country) =>
    city === 'Sevastopol' && country === 'Ukraine' ? 'Россия' : country;

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        blurRadius={300}
        style={{position: 'absolute', width: '100%', height: '100%'}}
        source={searchBg}
      />
      <Progress.CircleSnail thickness={10} size={140} color="white" />
    </View>
  ) : (
    <>
      <StatusBar backgroundColor="#092439" />
      <KeyboardAwareScrollView
        style={{flex: 1, position: 'relative'}}
        showsVerticalScrollIndicator={false}>
        <Image
          blurRadius={100}
          style={{position: 'absolute', width: '100%', height: '100%'}}
          source={searchBg}
        />
        <SafeAreaView style={{display: 'flex', flex: 1}}>
          <SearchView
            showSearch={showSearch}
            handleTextDebounce={handleTextDebounce}
            setShowSearch={setShowSearch}
            locations={locations}
            handleLocation={handleLocation}
          />

          <WeatherInfo
            location={location}
            checkLocation={checkLocation}
            current={current}
            weather={weather}
          />

          <WeaklyForeCast weather={weather} />
          <AdditionalInfo combinedInfo={combinedInfo} />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
}
