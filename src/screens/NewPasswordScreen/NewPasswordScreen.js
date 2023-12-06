import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import CustomInput from '../../components/customs/CustomInput/CustomInput';
import CustomButton from '../../components/customs/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import { useForm } from 'react-hook-form';
import GradientBackground from '../../components/GradientBackground';

const NewPasswordScreen = ({ route }) => {
    const { username } = route?.params;
    console.log('newpassword screen' + username);

    const { control, handleSubmit, watch } = useForm();
    const navigation = useNavigation();
    const pwd = watch('password');
    const code_regex = /^\d+$/;
    const onSubmitPressed = data => {
        //console.warn("Подтвердить");
        // валидация
        navigation.navigate('Домашняя страница');
    };

    const onSignInPress = () => {
        // console.warn("Вернуться к входу в аккаунт");
        navigation.navigate('Добро пожаловать !');
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const handlePasswordVisibilityChange = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <>
            <StatusBar backgroundColor='#357ae0' />
            <GradientBackground colors={['#357ae0', '#57e0f3']}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.root}>
                        <CustomInput
                            placeholder="Код подтверждения"
                            name="code"
                            control={control}
                            rules={{
                                required: 'Необходимо ввести код подтверждения',
                                minLength: { value: 4, message: 'Код состоит из четырёх символов' },
                                maxLength: { value: 4, message: 'Код состоит из четырёх символов' },
                                pattern: { value: code_regex, message: 'Код состоит только из цифр' },
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
                                    message: 'Длина пароля должна быть не менее 5 символов',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Длина пароля должна быть не больше 15 символов',
                                },
                            }}
                            secureTextEntry
                            isPasswordVisible={isPasswordVisible}
                            onPasswordVisibilityChange={handlePasswordVisibilityChange}
                        />

                        <CustomInput
                            name="password-repeat"
                            control={control}
                            placeholder="Подтвердите новый пароль"
                            rules={{
                                validate: value => value === pwd || 'Пароли не совпадают',
                            }}
                            secureTextEntry
                            showeye={false}
                            isPasswordVisible={isPasswordVisible}
                            onPasswordVisibilityChange={handlePasswordVisibilityChange}
                        />

                        <CustomButton
                            text="Подтвердить"
                            onPress={handleSubmit(onSubmitPressed)}
                            showBorder
                        />

                        <CustomButton
                            text="Вернуться к входу в аккаунт"
                            onPress={onSignInPress}
                            type="Tertiary"
                        />
                    </View>
                </ScrollView>
            </GradientBackground>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingVertical: 55,
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
});

export default NewPasswordScreen;
