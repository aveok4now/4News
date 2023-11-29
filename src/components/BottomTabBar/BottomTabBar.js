import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import WeatherScreen from '../../screens/WeatherScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import FavoritesScreen from '../../screens/FavoritesScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UsersNewsScreen from '../../screens/UsersNewsScreen';
import MovieNewsScreen from '../../screens/MovieNewsScreen';
import { Icons } from '../Icons';

const screens = [
    {
        name: 'Новости',
        component: HomeScreen,
        icon: {
            type: Icon,
            focusedName: 'newspaper-variant',
            unfocusedName: 'newspaper-variant-outline',
            focusedColor: '#3a86ff',
            unfocusedColor: '#28587B',
        },
        animation: 'flipInX',
        animationDuration: 1000,
    },
    {
        name: 'Избранное',
        component: FavoritesScreen,
        icon: {
            type: Icon,
            focusedName: 'star-circle',
            unfocusedName: 'star-circle-outline',
            focusedColor: '#3a86ff',
            unfocusedColor: '#28587B',
        },
        animation: 'flipInX',
        animationDuration: 1100,
    },
    {
        name: 'Сообщество',
        component: UsersNewsScreen,
        icon: {
            type: Icon,
            focusedName: 'account-group',
            unfocusedName: 'account-group-outline',
            focusedColor: '#3a86ff',
            unfocusedColor: '#28587B',
        },
        animation: 'flipInX',
        animationDuration: 1200,
    },
    {
        name: 'Погода',
        component: WeatherScreen,
        icon: {
            type: Icon,
            focusedName: 'weather-cloudy',
            unfocusedName: 'weather-partly-cloudy',
            focusedColor: '#3a86ff',
            unfocusedColor: '#28587B',
        },
        animation: 'flipInX',
        animationDuration: 1300,
    },
    {
        name: 'Кино',
        component: MovieNewsScreen,
        icon: {
            type: Icon,
            focusedName: 'movie',
            unfocusedName: 'movie-outline',
            focusedColor: '#3a86ff',
            unfocusedColor: '#28587B',
        },
        animation: 'flipInX',
        animationDuration: 1400,
    },
];

const Tab = createMaterialBottomTabNavigator();



export default function BottomTabBar({ showing }) {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: '#0f172a' }}
            activeColor="rgb(14 165 233)"
            inactiveColor="rgb(87 83 78)"
            labeled={true}
            shifting={true}
            initialRouteName="Новости"
            tabBarVisible={showing}
        >
            {screens.map(screen => (
                <Tab.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Animatable.View
                                animation={screen.animation}
                                duration={screen.animationDuration}
                                style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <screen.icon.type
                                    name={
                                        focused
                                            ? screen.icon.focusedName
                                            : screen.icon.unfocusedName
                                    }
                                    size={28}
                                    color={
                                        focused
                                            ? screen.icon.focusedColor
                                            : screen.icon.unfocusedColor
                                    }
                                />
                            </Animatable.View>
                        ),
                        accessibilityLabel: screen.name,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}

