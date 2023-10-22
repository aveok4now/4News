import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { set, useForm } from 'react-hook-form';
// import { Container } from './styles';

const ForgotPasswordScreen = () => {

    const email_regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    const { control, handleSubmit } = useForm();
    const navigation = useNavigation();

    const onSendPressed = (data) => {
        //console.warn("Отправить");
        // валидация ...
        navigation.navigate("Восстановление пароля");
    }

    const onSignInPress = () => {
        //console.warn("Вернуться к входу в аккаунт");
        navigation.navigate("Добро пожаловать !");
    }

    const [isTyping, setIsTyping] = useState(false);
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                {/* <Text style={styles.title}>Сброс пароля</Text> */}
                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Имя пользователя"
                    rules={{
                        required: 'Пожалуйста, введите имя пользователя',
                        minLength: { value: 5, message: 'Имя пользователя должно быть не менее 5 символов' },
                        maxLength: { value: 20, message: 'Имя пользователя должно быть не больее 20 символов' },
                    }}
                    setIsTyping={setIsTyping}
                />
                <CustomInput
                    name="email"
                    control={control}
                    placeholder="Эл. почта"
                    rules={{
                        required: 'Необходимо ввести адрес эл.почты',
                        pattern: { value: email_regex, message: 'Неправильный ввод электронной почты' }
                    }}
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

            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingVertical: 55
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

export default ForgotPasswordScreen;