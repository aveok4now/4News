import { StyleSheet, Text, View, Dimensions, useWindowDimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import Logo from '../assets/images/seved.png';
import RadialGradient from 'react-native-radial-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { assets } from '../../../react-native.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TypeWriter from 'react-native-typewriter'
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import { resetStatusBarColor, setStatusBarColor } from '../../utils/StatusBarManager';

const { width, height } = Dimensions.get('window');

const Splash = ({ navigation }) => {

    setStatusBarColor('#5b86e5')
    const { width, height } = useWindowDimensions()

    const [isTyped, setIsTyped] = useState(false)


    let identify = useUserCredentials();

    const handleTypeComplete = () => {

        setIsTyped(true);
        resetStatusBarColor();
        navigation.navigate('Домашняя страница');

        navigation.reset({
            index: 0,
            routes: [{ name: 'Домашняя страница' }],
        });

    }


    const getCurrentHour = new Date().getHours();

    let hello;

    (getCurrentHour >= 4 && getCurrentHour <= 10)
        ? hello = "Доброе утро" : (
            (getCurrentHour > 10 && getCurrentHour <= 16)
                ? hello = "Добрый день" : (
                    (getCurrentHour >= 16 && getCurrentHour <= 23)
                        ? hello = "Добрый вечер" : hello = "Доброй ночи"
                ))

    return (
        <RadialGradient
            style={{ flex: 1 }}
            colors={['#36d1dc', '#5b86e5']}
            stops={[0.1, 0.9]}
            center={[200, 360]}
            radius={200}
        >
            <Animatable.View
                style={styles.splash}
                animation="zoomInUp"
                duration={2000}

            >
                <View style={{ alignItems: 'center', justifyContent: 'center', position: "absolute", top: '15%' }}>
                    <TypeWriter
                        style={styles.greeting}
                        minDelay={2}
                        typing={1}
                        onTypingEnd={handleTypeComplete}
                    >
                        {hello}, {identify}!
                    </TypeWriter>
                </View>

                <View style={[styles.logo, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                    <Image
                        source={Logo}
                        style={[styles.logo, { height: height * 0.18 }]}
                        resizeMode="contain"
                    />
                </View>
                <Text
                    style={styles.splashText}
                >
                    4News — Новостное приложение 📰
                </Text>

            </Animatable.View>
        </RadialGradient>
    );
};

export default Splash;

const styles = StyleSheet.create({
    greeting: {
        fontFamily: "Inter-ExtraBold",
        fontSize: 22,
        textAlign: 'center',
        letterSpacing: 2
    },
    splash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        flex: 1,
        //position: "absolute",
        width: '100%',
        maxWidth: width - 200,
        maxHeight: height - 55,
    },

    splashText: {
        fontSize: 12,
        fontWeight: '700',
        marginTop: 30,
        textAlign: 'center',
        position: 'absolute',
        top: '90%',
        opacity: 0.5,
        letterSpacing: 1,
        fontFamily: "Inter-ExtraBold",
    }

});