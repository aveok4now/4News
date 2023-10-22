import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import { setItem, getItem, removeItem } from '../utils/asyncStorage';
import Search from '../utils/Search';
import Splash from '../screens/SplashScreen/SplashScreen';
import NewsViewer from '../components/NewsViewer/NewsViewer';
import WeatherScreen from '../screens/WeatherScreen';
import BottomTabBar from '../components/BottomTabBar';



const Stack = createNativeStackNavigator();

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

const Navigation = () => {
    const [showOnboarding, setShowOnboarding] = useState(null);
    useEffect(() => {
        checkIfAlreadyOnboarded()
    }, [])

    const checkIfAlreadyOnboarded = async () => {
        let onboarded = await getItem('onboarded');
        if (onboarded == 1) {
            setShowOnboarding(false);
        } else {
            setShowOnboarding(true);
        }
    }

    if (showOnboarding == null) return null;


    return (
        <>
            <NavigationContainer theme={navTheme} style={styles.container}>
                {/* show header or not */}
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={showOnboarding ? 'Приветствие' : 'Добро пожаловать !'}>
                    <Stack.Screen name="Приветствие" component={OnBoardingScreen} />
                    <Stack.Screen name="Добро пожаловать !"
                        component={SignInScreen}
                        options={{
                            headerStyle: {
                                backgroundColor: '#648DE5',
                                shadowColor: 'rgba(0, 0, 0, 0.75)',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 5,
                            },
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontSize: 24,
                                color: 'white',
                                fontWeight: 'bold',
                            },
                        }} />
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Search" component={Search} />
                    <Stack.Screen name="NewsViewer" component={NewsViewer} />
                    <Stack.Screen name="Weather Screen" component={WeatherScreen} />
                    <Stack.Screen name="Регистрация"
                        component={SignUpScreen}
                        options={{
                            headerShown: true,
                            headerTransparent: true,
                            headerTintColor: 'white',
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },

                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontSize: 24,
                                color: 'white',
                                //fontWeight: 'bold',
                                fontFamily: "Inter-ExtraBold"
                            },
                        }} />
                    <Stack.Screen name="Подтверждение почты" component={ConfirmEmailScreen} />
                    <Stack.Screen name="Восстановление пароля"
                        component={ForgotPasswordScreen}
                        options={{
                            headerShown: true,
                            headerTransparent: true,
                            headerTintColor: 'white',
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontSize: 20,
                                color: 'white',
                                fontFamily: "Inter-ExtraBold"
                            }
                        }} />
                    {/* <Stack.Screen name="Восстановление пароля" component={NewPasswordScreen} /> */}

                    <Stack.Screen name="Домашняя страница" component={BottomTabBar} />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B0ABD9',
        flex: 1,
    }
})

export default Navigation;