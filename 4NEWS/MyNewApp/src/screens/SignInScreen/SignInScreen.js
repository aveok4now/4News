import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, ImageBackground, Dimensions, TextInput } from 'react-native';
import Logo from '../../../assets/images/seved.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeItem } from '../../utils/asyncStorage';
import { useForm, Controller } from 'react-hook-form';


const { width, height } = Dimensions.get('window');
const SignInScreen = () => {

    //const image = { uri: 'https://i.pinimg.com/736x/b3/4e/12/b34e12e24fe377683d2182d40a040f5c.jpg' };
    // const image = { uri: 'https://i.pinimg.com/564x/c7/1f/00/c71f00ea86ee2bb9eac2d0c99b978d5b.jpg' };
    //const image = require('D:/react/4NEWS/MyNewApp/assets/images/backgr.jpg');
    const image = require('../assets/images/backgr.jpg');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();


    const { control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSignInPressed = (data) => {
        //console.warn("Вход");
        //валидация
        console.warn(data);
        navigation.navigate('Домашняя страница');

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
        await removeItem('onboarded');
        navigation.push('Приветствие');
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.root}>

                    <TouchableOpacity onPress={handleReset} style={styles.questionIcon}>
                        <Icon name="question-circle" size={30} color="white" />
                    </TouchableOpacity>
                    <Image source={Logo} style={[styles.logo, { height: height * 0.17 }]} resizeMode="contain" />


                    <CustomInput
                        name="username"
                        placeholder="Имя пользователя или эл. почта"
                        control={control}
                        rules={{
                            required: 'Ввведите имя или эл. почту 🤖',
                            minLength: { value: 5, message: 'Имя пользователя должно быть не менее 5 символов' },
                            //maxLength: { value: 20, message: 'Имя пользователя или эл.почта должны быть не больше 20 символов' }
                        }}
                    />

                    <CustomInput
                        name="password"
                        placeholder="Пароль"
                        secureTextEntry
                        control={control}
                        rules={{
                            required: 'Введите пароль 👺',
                            minLength: { value: 5, message: 'Длина пароля должна быть не менее 5 символов' },
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

                    <SocialSignInButtons />

                    <CustomButton
                        text="Нет аккаунта? Создать сейчас"
                        onPress={onSignUpPress}
                        type="Tertiary"
                    />

                </View>
            </ImageBackground>
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
        // top: height * 0.001,
        left: 15,
    },
})

export default SignInScreen;