import { StyleSheet, Text, View, Dimensions, useWindowDimensions, Image } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import Logo from '../assets/images/seved.png';
import RadialGradient from 'react-native-radial-gradient';
import { NavigationContainer } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const Splash = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Домашняя страница');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Домашняя страница' }],
            });
        }, 2000);

    }, []);
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

                <Image
                    // animation="bounceIn"
                    // duration={1500}
                    source={Logo}
                    style={[styles.logo, { height: height * 0.17 }]}
                    resizeMode="contain"
                />
                <Text
                    // animation="fadeInDownBig"
                    // duration={2000}>
                    style={styles.splashText}
                >
                    4News — Новостное приложение
                </Text>

            </Animatable.View>
        </RadialGradient>
    );
};

export default Splash;

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: '100%',
        maxWidth: width - 25,
        maxHeight: height - 25,
    },

    splashText: {
        fontSize: 12,
        fontWeight: '700',
        marginTop: 30,
        textAlign: 'center',
        position: 'absolute',
        top: '90%',
        opacity: 0.5,
        letterSpacing: 1
    }

});