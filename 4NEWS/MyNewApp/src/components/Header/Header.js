import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Container } from './styles';
import Search from '../../utils/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ navigation }) => {
    const [identify, setIdenify] = useState('')

    useEffect(() => {
        const checkUserCredentials = async () => {
            const savedUsername = await AsyncStorage.getItem('username');
            const savedPassword = await AsyncStorage.getItem('password');
            const guestID = await AsyncStorage.getItem('guestID');

            if (savedUsername && savedPassword) {
                //onSignInPressed({ username: savedUsername, password: savedPassword });
                setIdenify(savedUsername)
            } else if (savedUsername === 'guest') {
                if (guestID) {
                    setIdenify("Гость")
                }
            }
        }

        checkUserCredentials();
    }, []);


    return (
        <Animatable.View style={styles.header} animation="fadeIn" duration={1500}>
            <TouchableOpacity onPress={async () => {
                const savedUsername = await AsyncStorage.getItem('username');
                const savedPassword = await AsyncStorage.getItem('password');

                if (savedUsername) {
                    await AsyncStorage.removeItem(savedUsername);
                }

                if (savedPassword) {
                    await AsyncStorage.removeItem(savedPassword);
                }

                const isGuestUser = savedUsername === 'guest';

                if (isGuestUser) {
                    await AsyncStorage.removeItem('guestID');
                }

                await AsyncStorage.setItem('loggedOut', 'true');
                navigation.navigate('Добро пожаловать !', { status: "logout" });
            }}>
                <Icon name="close" size={24} color="#F7F6C5" />
            </TouchableOpacity>

            <Text style={styles.text}>Привет, {identify}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Icon name="search" size={24} color="#F7F6C5" />
            </TouchableOpacity>

        </Animatable.View>
    );
}

export default Header;
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 4,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.25,
        // borderRadius: 5,
        borderColor: '#F3FAE1',
        backgroundColor: '#7371FC',
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#F7F6C5',
        letterSpacing: 1,

    }
})