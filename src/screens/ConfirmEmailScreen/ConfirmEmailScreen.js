import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/customs/CustomInput/CustomInput';
import CustomButton from '../../components/customs/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
// import { Container } from './styles';

const code_regex = /^\d+$/;
const ConfirmEmailScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onConfirmPressed = data => {
    //console.warn("Подтвердить");
    // валидация
    navigation.navigate('Домашняя страница');
  };

  const onSignInPress = () => {
    //console.warn("Вернуться к входу в аккаунт");
    navigation.navigate('Добро пожаловать !');
  };

  const onResendPress = () => {
    // console.warn("Повторный код");
    // ....
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Подтверждение почты</Text>
        <CustomInput
          name="code"
          control={control}
          placeholder="Введите код подтверждения"
          rules={{
            required: 'Необходимо ввести код подтверждения',
            minLength: {value: 4, message: 'Код состоит из четырёх символов'},
            maxLength: {value: 4, message: 'Код состоит из четырёх символов'},
            pattern: {value: code_regex, message: 'Код состоит только из цифр'},
          }}
        />

        <CustomButton
          text="Подтвердить"
          onPress={handleSubmit(onConfirmPressed)}
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
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
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
});

export default ConfirmEmailScreen;
