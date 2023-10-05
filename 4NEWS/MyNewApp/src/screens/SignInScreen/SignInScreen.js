import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/seved.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeItem } from '../../utils/asyncStorage';

const SignInScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        //console.warn("Вход");
        //валидация
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
            <View style={styles.root}>
                <TouchableOpacity onPress={handleReset} style={styles.questionIcon}>
                    <Icon name="question-circle" size={30} color="white" />
                </TouchableOpacity>
                <Image source={Logo} style={[styles.logo, { height: height * 0.17 }]} resizeMode="contain" />
                <CustomInput
                    placeholder="Имя пользователя или эл. почта"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Пароль"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomButton
                    text="Войти"
                    onPress={onSignInPressed}
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
        </ScrollView>
    );
}


const styles = StyleSheet.create({
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
    },
})

export default SignInScreen;