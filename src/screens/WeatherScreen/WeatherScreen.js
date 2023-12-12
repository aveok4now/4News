import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Image} from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from './theme';
import Icon from 'react-native-vector-icons/Ionicons';
import WindIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropIcon from 'react-native-vector-icons/Entypo';
import SunRiseIcon from 'react-native-vector-icons/Feather';
import CalendarIcon from 'react-native-vector-icons/FontAwesome6';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import {debounce} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fetchLocations, fetchWeatherForecast} from '../../api/weather';
import {weatherImages} from '../../constants';
import * as Progress from 'react-native-progress';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import SQLite from 'react-native-sqlite-storage';

const {width, height} = Dimensions.get('window');

export default function WeatherScreen({navigation}) {
  let identify = useUserCredentials();

  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [showBorder, setShowBorder] = useState(true);

  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  //const [moreInfo, setMoreInfo] = useState([moreInfo]);

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
      //setItem('city', loc.name);
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
    //imageSource: imageSources[key]
  }));

  // const imageSources = {
  //     'Шанс дождя': weatherImages[weatherTranslations['Rain']],
  //     'Шанс снега': weatherImages[weatherTranslations['Snow']],
  //     'Минимальная температура': weatherImages[weatherTranslations['Light rain']],
  //     'Максимальная температура': weatherImages[weatherTranslations['Sunny']],
  //     'Средняя влажность': weatherImages[weatherTranslations['Sunny']],
  // };

  const checkLocation = (city, country) =>
    city === 'Sevastopol' && country === 'Ukraine' ? 'Россия' : country;

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        blurRadius={300}
        style={{position: 'absolute', width: '100%', height: '100%'}}
        source={require('../assets/images/search-bg.jpg')}
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
          source={require('../assets/images/search-bg.jpg')}
        />
        <SafeAreaView style={{display: 'flex', flex: 1}}>
          <View
            style={{
              height: '7%',
              marginLeft: 16,
              marginRight: 16,
              position: 'relative',
              zIndex: 50,
            }}>
            <Animatable.View
              animation="fadeIn"
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderRadius: 35,
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : 'transparent',
                marginTop: '2%',
              }}>
              {showSearch ? (
                <TextInput
                  selectionColor="white"
                  onChangeText={handleTextDebounce}
                  placeholder="Искать город"
                  placeholderTextColor={'lightgray'}
                  style={{
                    paddingLeft: 24,
                    height: 40,
                    flex: 1,
                    fontSize: 16,
                    lineHeight: 24,
                    fontFamily: 'Inter-Light',
                    paddingBottom: 8,
                  }}
                />
              ) : null}

              <TouchableOpacity
                onPress={() => setShowSearch(!showSearch)}
                style={{
                  backgroundColor: theme.bgWhite(0.3),
                  borderRadius: 55,
                  padding: 10,
                  margin: 2,
                }}>
                <Icon name="search-outline" size={24} color="white" />
              </TouchableOpacity>
            </Animatable.View>
            {locations.length > 0 && showSearch ? (
              <Animatable.View
                duration={1000}
                animation="flipInY"
                style={{
                  position: 'absolute',
                  width: '100%',
                  backgroundColor: 'rgb(209 213 219)',
                  top: 64,
                  borderRadius: 24,
                  shadowColor: 'white',
                  shadowOpacity: 0.8,
                  shadowOffset: {
                    width: 4,
                    height: 4,
                  },
                  shadowRadius: 16,
                  elevation: 4,
                }}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0,
                        padding: 12,
                        paddingHorizontal: 16,
                        marginBottom: 4,
                        borderBottomWidth: showBorder ? 1 : 0,
                        borderBottomColor: 'rgb(156 163 175)',
                      }}>
                      <Icon name="location-sharp" size={24} color="gray" />
                      <Text
                        style={{
                          fontFamily: 'Inter-Bold',
                          color: 'black',
                          marginLeft: 8,
                          fontSize: 18,
                        }}>
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            ) : null}
          </View>

          <View
            style={{
              marginHorizontal: 16,
              display: 'flex',
              justifyContent: 'space-around',
              flex: 1,
              marginBottom: 8,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-ExtraBold',
                textAlign: 'center',
                fontSize: 20,
              }}>
              {location?.name === 'Sevastopol' ? 'Севастополь' : location?.name}
              ,{/* {location?.name} */}
              <Text
                style={{
                  fontSize: 18,
                  color: 'lightgray',
                  fontFamily: 'Inter-Light',
                }}>
                {' '}
                {checkLocation(location?.name, location?.country)}
              </Text>
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <LottieView
                style={styles.lottie}
                source={weatherImages[current?.condition?.text]}
                autoPlay
                loop
              />
            </View>

            <View style={{}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Inter-SemiBold',
                  color: 'white',
                  marginLeft: 20,
                  fontSize: 60,
                }}>
                {current?.temp_c}&#176;
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Inter-Light',
                  color: 'white',
                  fontSize: 20,
                }}>
                {/* {weatherTranslations[current?.condition?.text] ||
                                current?.condition?.text} */}
                {current?.condition?.text}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Inter-ExtraLight',
                  color: 'white',
                  fontSize: 16,
                  marginTop: 5,
                }}>
                Ощущается как{' '}
                <Text style={{fontFamily: 'Inter-ExtraBold', color: 'yellow'}}>
                  {current?.feelslike_c}&#176;
                </Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 16,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 8,
                  alignItems: 'center',
                  marginVertical: 32,
                }}>
                <WindIcon name="weather-windy" size={24} color="lightgray" />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 16,
                  }}>
                  {' '}
                  {current?.wind_kph} м/c
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 8,
                  alignItems: 'center',
                  marginVertical: 32,
                }}>
                <DropIcon name="drop" size={24} color="lightgray" />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 16,
                  }}>
                  {' '}
                  {current?.humidity}%
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 8,
                  alignItems: 'center',
                  marginVertical: 32,
                }}>
                <SunRiseIcon name="sunrise" size={24} color="lightgray" />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 16,
                  }}>
                  {' '}
                  {
                    weather?.forecast?.forecastday[0]?.astro?.sunrise.split(
                      'AM',
                    )[0]
                  }
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 40}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                marginLeft: 12,
              }}>
              <CalendarIcon name="calendar-days" size={22} color="white" />
              <Text style={{fontFamily: 'Inter-Light', color: 'white'}}>
                {'  '}Прогноз на{' '}
                <Text style={{fontFamily: 'Inter-ExtraBold'}}>Неделю</Text>
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{paddingHorizontal: 15}}
              showsHorizontalScrollIndicator={false}
              //keyboardShouldPersistTaps='handled'
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let options = {weekday: 'long'};
                let dayName = date.toLocaleDateString('ru-RU', options);
                dayName = dayName.split(',')[0];
                dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
                let currentDate = new Date();
                let isCurrentDate =
                  date.toDateString() === currentDate.toDateString();
                return (
                  <View
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 106,
                      borderRadius: 24,
                      paddingVertical: 12,
                      marginTop: 8,
                      marginRight: 16,
                      backgroundColor: isCurrentDate
                        ? theme.bgWhite(0.3)
                        : theme.bgWhite(0.15),
                    }}>
                    <LottieView
                      style={{height: 44, width: 44}}
                      source={
                        weatherImages[item?.day?.condition?.text || 'other']
                      }
                      autoPlay
                      loop
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: 'Inter-Light',
                      }}>
                      {isCurrentDate ? 'Сегодня' : dayName}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontFamily: 'Inter-ExtraBold',
                      }}>
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={{marginBottom: 80}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                marginLeft: 12,
              }}>
              <Icon name="information-circle-outline" size={28} color="white" />
              <Text style={{fontFamily: 'Inter-Light', color: 'white'}}>
                {'  '}
                Дополнительная информация на{' '}
                <Text style={{fontFamily: 'Inter-ExtraBold'}}>Сегодня</Text>
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{paddingHorizontal: 15}}
              showsHorizontalScrollIndicator={false}>
              {combinedInfo.map(({key, value}) => (
                <View
                  key={key}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 106,
                    borderRadius: 24,
                    paddingVertical: 12,
                    marginTop: 8,
                    marginRight: 16,
                    backgroundColor: theme.bgWhite(0.15),
                  }}>
                  {/* <LottieView
                                        style={{ height: 44, width: 44 }}
                                        source={imageSource}
                                        autoPlay
                                        loop
                                    /> */}
                  <Text
                    style={{
                      color: 'white',
                      fontSize: key.length < 30 ? 12 : 10,
                      fontFamily: 'Inter-Light',
                      textAlign: 'center',
                    }}>
                    {key}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'Inter-ExtraBold',
                    }}>
                    {value}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: width * 0.8,
    height: 250,
  },
});
