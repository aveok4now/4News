import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';

const ConfirmEmailScreen = () => {

    const navigation = useNavigation();

    const [code, setCode] = useState('');


    const onConfirmPressed = () => {
        //console.warn("Подтвердить");
        // валидация
        navigation.navigate("Домашняя страница");
    }

    const onSignInPress = () => {
        //console.warn("Вернуться к входу в аккаунт");
        navigation.navigate("Добро пожаловать !");
    }

    const onResendPress = () => {
        // console.warn("Повторный код");
        // ....
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Подтверждение почты</Text>
                <CustomInput
                    placeholder="Введите код подтверждения"
                    value={code}
                    setValue={setCode}
                />


                <CustomButton
                    text="Подтвердить"
                    onPress={onConfirmPressed}
                />


                <CustomButton
                    text="Отправить код повторно"
                    onPress={onResendPress}
                    type="Secondary"
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

export default ConfirmEmailScreen;