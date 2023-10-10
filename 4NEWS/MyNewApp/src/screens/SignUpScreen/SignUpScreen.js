import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import { useForm } from 'react-hook-form';


const email_regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const name_regex = /^[a-zA-Z]+$/;
const SignUpScreen = () => {

    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();

    const onRegisterPressed = (data) => {
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
                {/* <Text style={styles.title}>Создать аккаунт</Text> */}

                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Имя пользователя"
                    rules={{
                        required: 'Необходимо ввести имя пользователя',
                        minLength: { value: 5, message: 'Имя пользователя должно быть не менее 5 символов' },
                        maxLength: { value: 15, message: 'Имя пользователя должно быть не более 15 символов' },
                        pattern: { value: name_regex, message: 'Некорректный ввод имени' }
                    }}
                />

                <CustomInput
                    name="email"
                    control={control}
                    placeholder="Эл. почта"
                    rules={{
                        required: 'Необходимо ввести адрес эл.почты',
                        pattern: { value: email_regex, message: 'Неправильный ввод электронной почты' }
                    }}
                />

                <CustomInput
                    name="password"
                    control={control}
                    placeholder="Пароль"
                    secureTextEntry
                    rules={{
                        required: 'Необходимо ввести пароль',
                        minLength: {
                            value: 5,
                            message: 'Длина пароля должна быть не менее 5 символов'
                        },
                        maxLength: {
                            value: 15,
                            message: 'Длина пароля должна быть не больше 15 символов'
                        }
                    }}
                />

                <CustomInput
                    name="password-repeat"
                    control={control}
                    placeholder="Повторите пароль"
                    secureTextEntry
                    rules={{
                        validate: value =>
                            value === pwd || 'Пароли не совпадают',
                    }}
                />

                <CustomButton
                    text="Зарегестрироваться"
                    onPress={handleSubmit(onRegisterPressed)}
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
        marginTop: '10%'
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