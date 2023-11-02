import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../../screens/HomeScreen';
import WeatherScreen from '../../screens/WeatherScreen';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { assets } from '../../../react-native.config';
import * as Animatable from 'react-native-animatable';
import FavoritesScreen from '../../screens/FavoritesScreen';


const Tab = createBottomTabNavigator();


export default function BottomTabBar() {
    return (

        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                //elevation: 1,
                height: 60,
                // borderTopRightRadius: 15,
                // borderTopLeftRadius: 15,
                //backgroundColor: '#3EF0FD',
                backgroundColor: '#8EBBF3',
            },

        }}>
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
                                color={focused ? "#7371FC" : "#28587B"}
                            />
                            <Animatable.Text
                                animation="jello"
                                duration={1500}
                                style={[styles.iconText, { color: focused ? 'white' : 'black' }]}>
                                Новости
                            </Animatable.Text>
                        </Animatable.View>
                    )
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
                                style={[styles.iconText, { color: focused ? 'white' : 'black' }]}>
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
                                style={[styles.iconText, { color: focused ? 'white' : 'black' }]}>
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