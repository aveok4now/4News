import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';

const ForgotPasswordScreen = () => {

    const navigation = useNavigation();
    const [username, setUsername] = useState('');


    const onSendPressed = () => {
        //console.warn("Отправить");
        // валидация ...
        navigation.navigate("Восстановление пароля");
    }

    const onSignInPress = () => {
        //console.warn("Вернуться к входу в аккаунт");
        navigation.navigate("Добро пожаловать !");
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Сброс пароля</Text>
                <CustomInput
                    placeholder="Имя пользователя"
                    value={username}
                    setValue={setUsername}
                />


                <CustomButton
                    text="Отправить"
                    onPress={onSendPressed}
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

export default ForgotPasswordScreen;