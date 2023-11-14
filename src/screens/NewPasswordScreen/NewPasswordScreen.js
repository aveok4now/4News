import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/customs/CustomInput/CustomInput';
import CustomButton from '../../components/customs/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import { useForm } from 'react-hook-form';



const NewPasswordScreen = () => {

    const { control, handleSubmit, watch } = useForm();
    const navigation = useNavigation();
    const pwd = watch('password');
    const code_regex = /^\d+$/;
    const onSubmitPressed = (data) => {
        //console.warn("Подтвердить");
        // валидация
        navigation.navigate("Домашняя страница");
    }

    const onSignInPress = () => {
        // console.warn("Вернуться к входу в аккаунт");
        navigation.navigate("Добро пожаловать !");
    }



    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Сброс пароля</Text>

                <CustomInput
                    placeholder="Код подтверждения"
                    name="code"
                    control={control}
                    rules={{
                        required: 'Необходимо ввести код подтверждения',
                        minLength: { value: 4, message: 'Код состоит из четырёх символов' },
                        maxLength: { value: 4, message: 'Код состоит из четырёх символов' },
                        pattern: { value: code_regex, message: 'Код состоит только из цифр' }
                    }}
                />
                <CustomInput
                    name="password"
                    control={control}
                    placeholder="Введите свой новый пароль"
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
                    placeholder="Подтвердите новый пароль"
                    rules={{
                        validate: value =>
                            value === pwd || 'Пароли не совпадают',
                    }}
                    secureTextEntry
                />

                <CustomButton
                    text="Подтвердить"
                    onPress={handleSubmit(onSubmitPressed)}
                />


                <CustomButton
                    text="Вернуться к входу в аккаунт"
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

export default NewPasswordScreen;