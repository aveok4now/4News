import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import WeatherScreen from '../../screens/WeatherScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import UsersIcon from 'react-native-vector-icons/FontAwesome6';
import { assets } from '../../../react-native.config';
import * as Animatable from 'react-native-animatable';
import FavoritesScreen from '../../screens/FavoritesScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UsersNewsScreen from '../../screens/UsersNewsScreen';

const screens = [
    {
        name: 'Новости',
        component: HomeScreen,
        icon: {
            type: Icon2,
            focusedName: 'newspaper',
            unfocusedName: 'newspaper-outline',
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
            type: Icon2,
            focusedName: 'star',
            unfocusedName: 'star-outline',
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
            type: UsersIcon,
            focusedName: 'users-line',
            unfocusedName: 'users',
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
            focusedName: 'cloud-sun',
            unfocusedName: 'cloud',
            focusedColor: '#3a86ff',
            unfocusedColor: '#28587B',
        },
        animation: 'flipInX',
        animationDuration: 1300,
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
            //shifting={true}
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
                                    size={24}
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

const styles = StyleSheet.create({
    iconText: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'Inter-Light',
    },
    selIconText: {
        fontSize: 14,
        color: 'white',
    },
});
