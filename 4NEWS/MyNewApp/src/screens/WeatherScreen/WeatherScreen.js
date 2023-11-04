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
import React, { useState, useEffect, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomDrawer from '../../components/customs/CustomDrawer';
import { Image } from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';
import { assets } from '../../../react-native.config';
import Icon from 'react-native-vector-icons/Ionicons';
import WindIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropIcon from 'react-native-vector-icons/Entypo';
import SunRiseIcon from 'react-native-vector-icons/Feather';
import CalendarIcon from 'react-native-vector-icons/FontAwesome6';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { setStatusBarColor } from '../../utils/StatusBarManager';
import { debounce } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { fetchLocations, fetchWeatherForecast } from '../../api/weather';
import { weatherTranslations } from '../../constants';

const { width, height } = Dimensions.get('window');

export default function WeatherScreen({ navigation }) {
    setStatusBarColor('#092439');
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [showBorder, setShowBorder] = useState(true);

    const [weather, setWeather] = useState({})

    const handleLocation = loc => {
        console.log('Локация' + JSON.stringify(loc));
        setLocations([]);
        setShowSearch(false);
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7'
        }).then(data => {
            setWeather(data)
            console.log('получено' + JSON.stringify(data))
        })
    };

    const handleSearch = value => {
        if (value.length > 2) {
            fetchLocations({ cityName: value }).then(data => {
                //console.log("Результат " + JSON.stringify(data))
                setLocations(data)
            })
        }

    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    const { current, location } = weather;



    return (
        <KeyboardAwareScrollView style={{ flex: 1, position: 'relative' }} showsVerticalScrollIndicator={false}>
            <Image
                blurRadius={200}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                source={require('../assets/images/weather-bg.jpg')}
            />
            <SafeAreaView style={{ display: 'flex', flex: 1 }}
            >
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
                            backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
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
                        {location?.name},
                        <Text
                            style={{
                                fontSize: 18,
                                color: 'lightgray',
                                fontFamily: 'Inter-Light',
                            }}>
                            {' '}
                            {location?.country}
                        </Text>
                    </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <LottieView
                            style={styles.lottie}
                            source={require('../assets/animations/weather/partly_cloudy.json')}
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
                            {weatherTranslations[current?.condition?.text] || current?.condition?.text}
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
                                22 м/c
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
                                23%
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
                                06:00
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 80 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            marginLeft: 12,
                        }}>
                        <CalendarIcon name="calendar-days" size={22} color="white" />
                        <Text style={{ fontFamily: 'Inter-Light', color: 'white' }}>
                            {'  '}Прогноз на неделю
                        </Text>
                    </View>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        showsHorizontalScrollIndicator={false}
                    //keyboardShouldPersistTaps='handled'
                    >
                        <View
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
                            <LottieView
                                style={{ height: 44, width: 44 }}
                                source={require('../assets/animations/weather/cloudy.json')}
                                autoPlay
                                loop
                            />
                            <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Inter-Light' }}>Понедельник</Text>
                            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Inter-ExtraBold' }}>19&#176;</Text>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    lottie: {
        width: width * 0.8,
        height: 250,
    },
});
