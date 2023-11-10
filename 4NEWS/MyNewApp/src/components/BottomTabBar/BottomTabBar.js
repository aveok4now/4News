import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../../screens/HomeScreen';
import WeatherScreen from '../../screens/WeatherScreen';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { assets } from '../../../react-native.config';
import * as Animatable from 'react-native-animatable';
import FavoritesScreen from '../../screens/FavoritesScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();


export default function BottomTabBar() {
    return (

        <Tab.Navigator
            barStyle={{ backgroundColor: '#0f172a' }}
            activeColor="#e91e63"
            inactiveColor="#2563eb"
            labeled={false}
            shifting={true}
            tabBarBadge={true}
        >
            <Tab.Screen
                name="Домашнняя страница"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Animatable.View
                            animation="fadeInLeft"
                            duration={1000}
                            style={{ alignItems: "center", justifyContent: "center" }}>
                            <Icon
                                name="newspaper"
                                size={24}
                                color={focused ? "#3a86ff" : "#28587B"}
                            />
                            <Animatable.Text
                                animation="jello"
                                duration={1500}
                                style={[styles.iconText, { color: focused ? 'white' : '#2563eb' }]}>
                                Новости
                            </Animatable.Text>
                        </Animatable.View>
                    ),

                }}
            />
            <Tab.Screen
                name="Избранное"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Animatable.View
                            animation="fadeInDown"
                            duration={1000}
                            style={{ alignItems: "center", justifyContent: "center" }}>
                            <Icon2
                                name={focused ? "star" : "star-outline"}
                                size={24}
                                color={focused ? "#EDFFAB" : "#28587B"}
                            />
                            <Animatable.Text
                                animation="jello"
                                duration={1500}
                                style={[styles.iconText, { color: focused ? 'white' : '#2563eb' }]}>
                                Избранное
                            </Animatable.Text>
                        </Animatable.View>
                    )
                }}
            />
            <Tab.Screen
                name="Погода"
                component={WeatherScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Animatable.View
                            animation="fadeInRight"
                            duration={1000}
                            style={{ alignItems: "center", justifyContent: "center" }}>
                            <Icon
                                name="cloud-sun-rain"
                                size={24}
                                color={focused ? "#3a86ff" : "#28587B"}
                            />
                            <Animatable.Text
                                animation="jello"
                                duration={1500}
                                style={[styles.iconText, { color: focused ? 'white' : '#2563eb' }]}>
                                Погода
                            </Animatable.Text>
                        </Animatable.View>
                    )
                }}
            />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    iconText: {
        fontSize: 12,
        color: "black",
        fontFamily: "Inter-Light"
    },
    selIconText: {
        fontSize: 14,
        color: "white",
    },
})