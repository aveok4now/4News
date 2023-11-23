import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    DefaultTheme,
    NavigationContainer,
    useNavigation,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
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
import FavoritesScreen from '../screens/FavoritesScreen';
import FeedBackScreen from '../screens/FeedBackScreen/FeedBackScreen';
import CommentsScreen from '../screens/CommentsScreen';
import NewsOverviewScreen from '../screens/NewsOverviewScreen';
import { theme } from '../screens/WeatherScreen/theme';
import { Icons } from '../components/Icons';
import UsersNewsScreen from '../screens/UsersNewsScreen';

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
        checkIfAlreadyOnboarded();
    }, []);

    const checkIfAlreadyOnboarded = async () => {
        let onboarded = await getItem('onboarded');
        if (onboarded == 1) {
            setShowOnboarding(false);
        } else {
            setShowOnboarding(true);
        }
    };

    if (showOnboarding == null) return null;

    const screenOptions = {
        headerShown: true,
        headerTransparent: true,
        headerTintColor: 'white',
        //headerTitleAlign: 'flex-s',
        headerTitleStyle: {
            fontSize: 20,
            color: 'white',
            fontFamily: 'Inter-ExtraBold',
            headerTitleAlign: 'center',
        },
    };

    return (
        <>
            <NavigationContainer theme={navTheme} style={styles.container}>
                {/* show header or not */}
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName={
                        showOnboarding ? 'Приветствие' : 'Добро пожаловать !'
                    }>
                    <Stack.Screen name="Приветствие" component={OnBoardingScreen} />
                    <Stack.Screen
                        name="Добро пожаловать !"
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
                        }}
                    />
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Search" component={Search} />
                    <Stack.Screen name="NewsViewer" component={NewsViewer} />
                    <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
                    <Stack.Screen name="Weather Screen" component={WeatherScreen} />
                    <Stack.Screen name="FeedBack Screen" component={FeedBackScreen} />
                    <Stack.Screen
                        name="Регистрация"
                        component={SignUpScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Подтверждение почты"
                        component={ConfirmEmailScreen}
                    />
                    <Stack.Screen
                        name="Восстановление пароля"
                        component={ForgotPasswordScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Новый пароль"
                        component={NewPasswordScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen name="Домашняя страница" component={BottomTabBar} />
                    <Stack.Screen
                        name="Комментарии"
                        component={CommentsScreen}
                        options={{
                            ...screenOptions,
                            headerTitleAlign: 'start',
                        }}
                    />
                    <Stack.Screen
                        name="Новости по категориям"
                        component={NewsOverviewScreen}
                        options={({ navigation }) => ({
                            ...screenOptions,
                            headerTitle: '',
                            headerLeft: () => (
                                <Animatable.View animation="flipInX">
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={{
                                            padding: 8,
                                            borderRadius: 100,
                                            backgroundColor: '#041147',
                                        }}>
                                        <Icons.AntDesign name="arrowleft" size={30} color="white" />
                                    </TouchableOpacity>
                                </Animatable.View>
                            ),
                        })}
                    />
                    <Stack.Screen name="Сообщество" component={UsersNewsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B0ABD9',
        flex: 1,
    },
});

export default Navigation;
