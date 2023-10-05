import React from 'react';
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

const Stack = createNativeStackNavigator();

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

const Navigation = () => {
    return (
        <NavigationContainer theme={navTheme} style={styles.container}>
            {/* show header or not */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
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
                <Stack.Screen name="Регистрация" component={SignUpScreen} />
                <Stack.Screen name="Подтверждение почты" component={ConfirmEmailScreen} />
                <Stack.Screen name="Забыли пароль" component={ForgotPasswordScreen} />
                <Stack.Screen name="Восстановление пароля" component={NewPasswordScreen} />

                <Stack.Screen name="Домашняя страница" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B0ABD9',
        flex: 1,
    }
})

export default Navigation;