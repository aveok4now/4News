import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Vibration,
    BackHandler,
    TouchableWithoutFeedback,
    StatusBar,
} from 'react-native';
import Logo from '../../../assets/images/seved.png';
import CustomInput from '../../components/customs/CustomInput/CustomInput';
import CustomButton from '../../components/customs/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeItem } from '../../utils/asyncStorage';
import { useForm } from 'react-hook-form';
import * as Animatable from 'react-native-animatable';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { theme } from '../WeatherScreen/theme';
import ExitModal from '../../components/customs/CustomModal/ExitModal';
import GradientBackground from '../../components/GradientBackground';
import { width, height } from '../../utils/getDimensions';
import { setStatusBarColor } from '../../utils/StatusBarManager';

SQLite.enablePromise(true);

const SignInScreen = ({ route }) => {
    const [userExist, setUserExist] = useState(true);
    const navigation = useNavigation();
    const invalidCredentialsText = '❌ Неверный логин или пароль';
    const [isTyping, setIsTyping] = useState(false);

    const [inputFocus, setIsInputFocus] = useState(false);

    const onYes = () => BackHandler.exitApp();

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const handlePasswordVisibilityChange = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        const checkUserCredentials = async () => {
            if (route.params?.status === 'logout') {
                AsyncStorage.setItem('loggedOut', 'true');
            }

            const isLoggedOut = await AsyncStorage.getItem('loggedOut');
            const savedUsername = await AsyncStorage.getItem('username');
            const savedPassword = await AsyncStorage.getItem('password');

            const guestID = await AsyncStorage.getItem('guestID');

            console.log('loggedout' + isLoggedOut);
            console.log('status' + route.params?.status);

            if (route.params?.status === 'logout') {
                await AsyncStorage.removeItem('username');
                await AsyncStorage.removeItem('password');
                AsyncStorage.setItem('loggedOut', 'true');
                console.log(savedUsername);
                console.log(savedPassword);
                return;
            } else {
                if (savedUsername && savedPassword) {
                    if (isLoggedOut === 'false') {
                        onSignInPressed({ username: savedUsername, password: savedPassword });
                        // AsyncStorage.setItem('loggedOut', '');
                    }
                } else if (savedUsername === 'guest') {
                    if (guestID) {
                        onSignInAsGuestPressed({ guestID: guestID });
                    } else {
                        onSignInAsGuestPressed();
                    }
                }
            }
        };

        checkUserCredentials();
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
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

    const onSignInPressed = async data => {
        try {
            console.log(data);
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            let query;
            let queryArgs;
            if (data.username.includes('@', '.com')) {
                query = `
                    SELECT u1.* 
                    FROM Users u1 
                    JOIN Users u2 ON u1.userID = u2.userID 
                    WHERE u2.userEmail = ? AND u2.userPassword = ?
                `;
                queryArgs = [data.username, data.password];
            } else {
                if (data.username.includes('admin')) {
                    query = 'SELECT * FROM Administrators WHERE adminLogin = ? AND adminPassword = ?';
                    queryArgs = [data.username, data.password];
                } else {
                    query = 'SELECT * FROM Users WHERE userLogin = ? AND userPassword = ?';
                    queryArgs = [data.username, data.password];
                }

            }

            const [result] = await db.executeSql(query, queryArgs);
            if (result.rows.length > 0) {
                const user = result.rows.item(0);
                const username = user.userLogin || user.adminLogin;
                setUserExist(true);
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('password', data.password);
                // navigation.navigate('Домашняя страница');
                AsyncStorage.setItem('loggedOut', 'false');
                navigation.navigate('Splash');
            } else {
                setUserExist(false);
                console.log('User does not exist');
                showToast(invalidCredentialsText);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSignInAsGuestPressed = async data => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
            const getLastGuestID = async () => {
                return new Promise((resolve, reject) => {
                    db.transaction(tx => {
                        tx.executeSql(
                            'SELECT MAX(guestId) AS maxID FROM Guests',
                            [],
                            (_, { rows }) => {
                                const { maxID } = rows.item(0);
                                resolve(maxID || 0);
                            },
                            error => {
                                reject(error);
                            },
                        );
                    });
                });
            };

            const lastGuestID = await getLastGuestID();
            const newGuestID = lastGuestID + 1;

            const [result] = await db.executeSql(
                'INSERT INTO Guests (guestId) VALUES (?)',
                [newGuestID],
            );

            if (result.rowsAffected > 0) {
                await AsyncStorage.setItem('username', 'guest');
                await AsyncStorage.setItem('guestID', newGuestID.toString());
                await AsyncStorage.removeItem('password');
                console.log('Вошёл как гость' + newGuestID);
                navigation.navigate('Splash');
            } else {
                console.log('Ошибка при добавлении гостя в базу данных');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onForgotPassword = () => {
        // console.warn("Забыли пароль");
        navigation.navigate('Восстановление пароля');
    };

    const onSignUpPress = () => {
        //  console.warn("Регистрация");
        navigation.navigate('Регистрация');
    };

    const handleReset = async () => {
        Vibration.vibrate(10);
        await removeItem('onboarded');
        navigation.push('Приветствие');
    };

    const [modalVisible, setModalVisible] = useState(false); // Состояние для видимости модального окна

    const openModal = () => {
        Vibration.vibrate(10);
        setModalVisible(true); // Функция для открытия модального окна
    };

    const closeModal = () => {
        setModalVisible(false); // Функция для закрытия модального окна
    };

    const handleInputFocus = () => {
        setIsInputFocus(true);
    };

    const showToast = (text, type = 'error') => {
        Toast.show({
            text1: text,
            type: type,
            position: 'bottom',
            visibilityTime: 4000,
            autoHide: true,
        });
    };

    return (
        <>
            <StatusBar backgroundColor="#57e0f3" />
            <Toast />
            <GradientBackground>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.root}>
                        <TouchableOpacity onPress={handleReset} style={styles.questionIcon}>
                            <Animatable.View animation="bounceIn" duration={1500}>
                                <Icon name="question-circle" size={30} color="white" />
                            </Animatable.View>
                        </TouchableOpacity>

                        <TouchableWithoutFeedback
                            onPress={() =>
                                navigation.navigate('NewsViewer', {
                                    url: 'www.sevsu.ru',
                                })
                            }>
                            <Animatable.Image
                                animation="bounceIn"
                                duration={1500}
                                source={Logo}
                                style={[
                                    styles.logo,
                                    {
                                        height: height * 0.17,
                                    },
                                ]}
                                resizeMode="contain"
                            />
                        </TouchableWithoutFeedback>

                        <TouchableOpacity onPress={openModal} style={styles.exitIcon}>
                            <Animatable.View animation="bounceIn" duration={1500}>
                                <Icon name="sign-out" size={30} color="white" />
                            </Animatable.View>
                        </TouchableOpacity>

                        <ExitModal
                            visible={modalVisible}
                            onYes={onYes}
                            setVisible={setModalVisible}
                        />

                        <CustomInput
                            name="username"
                            placeholder="Имя пользователя или эл. почта"
                            control={control}
                            rules={{
                                required: 'Ввведите имя или эл. почту 🤖',
                                minLength: {
                                    value: 4,
                                    message: 'Имя пользователя должно быть не менее 4 символов',
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        'Имя пользователя или эл.почта должны быть не больше 20 символов',
                                },
                            }}
                            setIsTyping={setIsTyping}
                        />

                        <CustomInput
                            name="password"
                            placeholder="Пароль"
                            secureTextEntry
                            control={control}
                            rules={{
                                required: 'Введите пароль 👺',
                                minLength: {
                                    value: 4,
                                    message: 'Длина пароля должна быть не менее 5 символов',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Длина пароля должна быть не больше 15 символов',
                                },
                            }}
                            setIsTyping={setIsTyping}
                            isPasswordVisible={isPasswordVisible}
                            onPasswordVisibilityChange={handlePasswordVisibilityChange}
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
                </ScrollView>
            </GradientBackground>
        </>
    );
};

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
        textAlign: 'center',
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
        height: width,
    },
    lottieClose: {
        width: 90,
        height: 90,
        marginLeft: 55,
    },

    header: {
        width: '120%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    noUser: {
        color: 'red',
        marginTop: 10,
        marginBottom: 10,
        textShadowColor: 'rgba(226, 232, 240, 0.15)',
        textShadowOffset: { width: -2, height: 1 },
        textShadowRadius: 4,
        fontFamily: 'Inter-Bold',
    },
});

export default SignInScreen;
