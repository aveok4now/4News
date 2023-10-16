import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, ImageBackground, Dimensions, TextInput, Vibration } from 'react-native';
import Logo from '../../../assets/images/seved.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeItem } from '../../utils/asyncStorage';
import { useForm, Controller } from 'react-hook-form';
import ModalPopup from '../../components/CustomModal/CustomModal';
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import SQLite from 'react-native-sqlite-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
SQLite.enablePromise(true);


const SignInScreen = () => {

    //const image = { uri: 'https://i.pinimg.com/736x/b3/4e/12/b34e12e24fe377683d2182d40a040f5c.jpg' };
    // const image = { uri: 'https://i.pinimg.com/564x/c7/1f/00/c71f00ea86ee2bb9eac2d0c99b978d5b.jpg' };
    //const image = require('D:/react/4NEWS/MyNewApp/assets/images/backgr.jpg');
    const image = require('../assets/images/backgr.jpg');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();

    useEffect(() => {
        const checkUserCredentials = async () => {
            const savedUsername = await AsyncStorage.getItem('username');
            const savedPassword = await AsyncStorage.getItem('password');

            if (savedUsername && savedPassword) {
                onSignInPressed({ username: savedUsername, password: savedPassword });
            } else if (savedUsername === 'guest') {
                onSignInAsGuestPressed({ username: savedUsername })
            }
        }

        checkUserCredentials();
    }, []);


    const { control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // const onSignInPressed = (data) => {
    //     //console.warn("Вход");
    //     //валидация
    //     console.warn(data);
    //     navigation.navigate('Домашняя страница');

    // }

    // const createGuestsTable = async () => {
    //     const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
    //     db.executeSql('CREATE TABLE IF NOT EXISTS Guests (guestId INTEGER PRIMARY KEY AUTOINCREMENT)');
    // };

    // const addGuestToDatabase = async () => {
    //     try {
    //         const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
    //         await db.executeSql('INSERT INTO Guests VALUES (guestId = 10)');
    //         console.log('Гость успешно добавлен в базу данных');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };



    const onSignInPressed = async (data) => {
        //StartVibration();
        try {

            console.log(data);
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
            const [result] = await db.executeSql('SELECT * FROM users WHERE userLogin = ? AND userPassword = ?', [data.username, data.password]);
            if (result.rows.length > 0) {
                // User exists in the database
                // Сохраните данные авторизации
                await AsyncStorage.setItem('username', data.username);
                await AsyncStorage.setItem('password', data.password);
                navigation.navigate('Домашняя страница');
            } else {
                // User does not exist in the database
                console.warn('User does not exist');
            }
        } catch (error) {
            console.error(error);
        }
    }


    const onSignInAsGuestPressed = async () => {
        //StartVibration();
        try {

            await AsyncStorage.setItem('username', 'guest');
            await AsyncStorage.removeItem('password');
            // createGuestsTable();
            // addGuestToDatabase();
            //console.log(data)
            console.log("Вошёл как гость")
            navigation.navigate('Домашняя страница');
            // if (result.rows.length > 0) {
            //     navigation.navigate('Домашняя страница');
            // } else {
            //     addGuestToDatabase(data.id);
            //     navigation.navigate('Домашняя страница');
            // }
        } catch (error) {
            console.error(error);
        }
    }


    const onForgotPassword = () => {
        // console.warn("Забыли пароль");
        navigation.navigate("Забыли пароль");
    }

    const onSignUpPress = () => {
        //  console.warn("Регистрация");
        navigation.navigate("Регистрация");
    }

    const handleReset = async () => {
        Vibration.vibrate(10);
        await removeItem('onboarded');
        navigation.push('Приветствие');
    }


    const [modalVisible, setModalVisible] = useState(false); // Состояние для видимости модального окна

    const openModal = () => {
        Vibration.vibrate(10);
        setModalVisible(true); // Функция для открытия модального окна
    };

    const closeModal = () => {
        setModalVisible(false); // Функция для закрытия модального окна
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
            <View style={styles.root}>

                <TouchableOpacity onPress={handleReset} style={styles.questionIcon}>
                    <Animatable.View animation="bounceIn" duration={1500}>
                        <Icon name="question-circle" size={30} color="white" />
                    </Animatable.View>
                </TouchableOpacity>


                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={Logo}
                    style={[styles.logo, { height: height * 0.17 }]}
                    resizeMode="contain"
                />

                <TouchableOpacity onPress={openModal} style={styles.exitIcon}>
                    <Animatable.View animation="bounceIn" duration={1500}>
                        <Icon name="sign-out" size={30} color="white" />
                    </Animatable.View>
                </TouchableOpacity>

                <ModalPopup visible={modalVisible} onClose={closeModal}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={closeModal}>
                                <LottieView style={styles.lottieClose}
                                    source={require("D:/react/4NEWS/MyNewApp/src/screens/assets/animations/close.json")}
                                    autoPlay={true}
                                    loop={false} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <LottieView style={styles.lottie}
                        source={require("D:/react/4NEWS/MyNewApp/src/screens/assets/animations/exit.json")}
                        autoPlay={true}
                        loop={false} />
                    <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>Вы уверены, что хотите выйти?</Text>
                </ModalPopup>

                <CustomInput
                    name="username"
                    placeholder="Имя пользователя или эл. почта"
                    control={control}
                    rules={{
                        required: 'Ввведите имя или эл. почту 🤖',
                        minLength: { value: 4, message: 'Имя пользователя должно быть не менее 4 символов' },
                        maxLength: { value: 20, message: 'Имя пользователя или эл.почта должны быть не больше 20 символов' }
                    }}
                />

                <CustomInput
                    name="password"
                    placeholder="Пароль"
                    secureTextEntry
                    control={control}
                    rules={{
                        required: 'Введите пароль 👺',
                        minLength: { value: 4, message: 'Длина пароля должна быть не менее 5 символов' },
                        maxLength: { value: 15, message: 'Длина пароля должна быть не больше 15 символов' }
                    }}
                />

                <CustomButton
                    text="Войти"
                    onPress={handleSubmit(onSignInPressed)}
                />

                <CustomButton
                    text="Забыли пароль?"
                    onPress={onForgotPassword}
                    type="Tertiary"
                />

                <CustomButton
                    text="Войти как Гость"
                    onPress={onSignInAsGuestPressed}
                    bgColor="#CFD8F7"
                    fgColor="#154ED3"
                />

                <CustomButton
                    text="Нет аккаунта? Создать сейчас"
                    onPress={onSignUpPress}
                    type="Tertiary"
                />

            </View>
            {/* </ImageBackground> */}

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    image: {
        flex: 2,
        justifyContent: 'center',
        width: width,
        height: height,
    },
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        marginTop: '20%',
        marginBottom: '5%',
        width: '70%',
        maxWidth: 500,
        maxHeight: 200,
    },
    questionIcon: {
        position: 'absolute',
        top: 15,
        left: 15,
        textAlign: 'center'
    },
    exitIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    lottie: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
        height: width
    },
    lottieClose: {
        width: 80,
        height: 80
    },

    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },



})

export default SignInScreen;