import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Icons } from '../../../../constants/Icons';
import LottieView from 'lottie-react-native';
import { weatherImages } from '../../../../constants/WeatherImages';
import { theme } from '../../theme';

export default function WeaklyForeCast({ weather }) {
    return (
        <View style={{ marginBottom: 40 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginLeft: 12,
                }}>
                <Icons.FontAwesome6 name="calendar-days" size={22} color="white" />
                <Text style={{ fontFamily: 'Inter-Light', color: 'white' }}>
                    {'  '}Прогноз на{' '}
                    <Text style={{ fontFamily: 'Inter-ExtraBold' }}>Неделю</Text>
                </Text>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}>
                {weather?.forecast?.forecastday?.map((item, index) => {
                    let date = new Date(item.date);
                    let options = { weekday: 'long' };
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
                                style={{ height: 44, width: 44 }}
                                source={weatherImages[item?.day?.condition?.text || 'other']}
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
    );
}
