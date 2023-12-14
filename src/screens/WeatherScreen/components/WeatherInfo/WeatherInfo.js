import {View, Text} from 'react-native';
import React from 'react';
import {Icons} from '../../../../constants/Icons';
import {weatherImages} from '../../../../constants/WeatherImages';
import LottieView from 'lottie-react-native';
import {width} from '../../../../utils/global/getDimensions';

export default function WeatherInfo({
  location,
  checkLocation,
  current,
  weather,
}) {
  return (
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
        {location?.name === 'Sevastopol' ? 'Севастополь' : location?.name},
        {/* {location?.name} */}
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
          style={{
            width: width * 0.8,
            height: 250,
          }}
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
          <Icons.MaterialCommunityIcons
            name="weather-windy"
            size={24}
            color="lightgray"
          />
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
          <Icons.Entypo name="drop" size={24} color="lightgray" />
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
          <Icons.Feather name="sunrise" size={24} color="lightgray" />
          <Text
            style={{
              color: 'white',
              fontFamily: 'Inter-SemiBold',
              fontSize: 16,
            }}>
            {' '}
            {weather?.forecast?.forecastday[0]?.astro?.sunrise.split('AM')[0]}
          </Text>
        </View>
      </View>
    </View>
  );
}
