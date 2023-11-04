import { View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomDrawer from '../../components/customs/CustomDrawer';
import { Image } from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';
import { assets } from '../../../react-native.config';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

export default function WeatherScreen({ navigation }) {
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([1, 2, 3]);
    const [showBorder, setShowBorder] = useState(true);

    const handleLocation = loc => {
        console.log('Локация' + loc);
    };

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Image
                blurRadius={200}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                source={require('../assets/images/weather-bg.jpg')}
            />
            <SafeAreaView style={{ display: 'flex', flex: 1 }}>
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
                                            Москва, Россия
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </Animatable.View>
                    ) : null}
                </View>
            </SafeAreaView>
        </View>
    );
}
