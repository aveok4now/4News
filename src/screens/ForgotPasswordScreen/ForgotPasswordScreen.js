import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/customs/CustomInput/CustomInput';
import CustomButton from '../../components/customs/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { set, useForm } from 'react-hook-form';
import LottieView from 'lottie-react-native';
import { width, height } from '../../utils/getDimensions';
import forgotPassword from '../assets/animations/forgot_password';
import SQLite from 'react-native-sqlite-storage';
import Toast from 'react-native-toast-message';

const ForgotPasswordScreen = () => {
    const email_regex =
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    const { control, handleSubmit } = useForm();
    const navigation = useNavigation();

    const [error, setError] = useState('');

    const showToast = (text, type = 'error') => {
        Toast.show({
            text1: text,
            type: type,
            position: 'bottom',
            visibilityTime: 4000,
            autoHide: true,
        });
    };

    const onSendPressed = async data => {
        //console.warn("Отправить");
        // валидация ...
        const userExists = await checkUser(data.username);

        if (userExists) {
            console.log('Пользователь существует');
            navigation.navigate('Новый пароль', { username: data.username });
        } else {
            console.log('Пользователь не существует');
            setError('Аккаунт не найден. Проверьте имя пользователя');
            showToast(error);
        }
    };

    const onSignInPress = () => {
        //console.warn("Вернуться к входу в аккаунт");
        navigation.navigate('Добро пожаловать !');
    };

    const checkUser = async username => {
        try {
            console.log(username);
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            let query;
            let queryArgs;

            query = 'SELECT * FROM Users WHERE userLogin = ?';
            queryArgs = [username];

            const [result] = await db.executeSql(query, queryArgs);

            if (result.rows.length > 0) {
                console.log('user exists');
                return true;
            } else {
                console.log('user is not exists');
            }
        } catch (error) { }
    };

    const [isTyping, setIsTyping] = useState(false);
    return (
        <>
            <Toast />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    {/* <Text style={styles.title}>Сброс пароля</Text> */}

                    <CustomInput
                        name="username"
                        control={control}
                        placeholder="Имя пользователя"
                        rules={{
                            required: 'Пожалуйста, введите имя пользователя',
                            minLength: {
                                value: 5,
                                message: 'Имя пользователя должно быть не менее 5 символов',
                            },
                            maxLength: {
                                value: 20,
                                message: 'Имя пользователя должно быть не больее 20 символов',
                            },
                        }}
                        error={error}
                        setIsTyping={setIsTyping}
                    />

                    <CustomButton
                        text="Отправить"
                        onPress={handleSubmit(onSendPressed)}
                    />

                    <CustomButton
                        text="Вернуться к входу в аккаунт"
                        onPress={onSignInPress}
                        type="Tertiary"
                    />

                    <View>
                        <LottieView
                            style={styles.lottie}
                            source={forgotPassword}
                            autoPlay
                            loop
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingVertical: 55,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0400FC',
        margin: 10,
    },
    text: {
        fontSize: 12,
        color: '#FCF7F8',
        marginVertical: 10,
        textAlign: 'center',
    },
    link: {
        color: '#9FFFCB',
    },

    lottie: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
        height: width,
    },
});

export default ForgotPasswordScreen;
