import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';

const SignUpScreen = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () => {
        //console.warn("Регистрация");
        //валидация
        navigation.navigate("Подтверждение почты");
    }

    const onSignInPress = () => {
        //console.warn("Регистрация");
        navigation.navigate("Добро пожаловать !")
    }

    const onTermsOfUsePressed = () => {
        console.warn("Условия пользования");
        // добавить навигацию
    }

    const onPrivacyPolicyPressed = () => {
        console.warn("Политика конфиденциальности");
        // добавить навигацию
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Создать аккаунт</Text>
                <CustomInput
                    placeholder="Имя пользователя"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Эл. почта"
                    value={email}
                    setValue={setEmail}
                />
                <CustomInput
                    placeholder="Пароль"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomInput
                    placeholder="Повторите пароль"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
                />

                <CustomButton
                    text="Зарегестрироваться"
                    onPress={onRegisterPressed}
                />


                <Text style={styles.text}>
                    Регистрируясь, Вы подтверждаете, что принимаете наши {''}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Условия использования</Text> и <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Политику конфиденциальности</Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    text="Есть аккаунт? Войти."
                    onPress={onSignInPress}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#0400FC",
        margin: 10,
    },
    text: {
        fontSize: 12,
        color: '#FCF7F8',
        marginVertical: 10,
        textAlign: 'center'
    },
    link: {
        color: '#9FFFCB',
    }

})

export default SignUpScreen;