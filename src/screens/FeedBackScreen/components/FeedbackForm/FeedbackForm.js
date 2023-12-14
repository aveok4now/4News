import {View, Text} from 'react-native';
import React from 'react';
import CustomInput from '../../../../components/customs/CustomInput';
import CustomButton from '../../../../components/customs/CustomButton';

export default function FeedbackForm({
  control,
  title,
  handleSubmit,
  sendMessage,
}) {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Inter-ExtraBold',
        }}>
        {title}
      </Text>
      <CustomInput
        name="feedback"
        placeholder="Мне не понравилось ..."
        control={control}
        needTrim={false}
        rules={{
          required: 'Пожалуйста, напишите сообщение',
          minLength: {
            value: 3,
            message: 'Сообщение слишком короткое',
          },
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <CustomButton
          text="Отправить"
          onPress={handleSubmit(sendMessage)}
          showBorder
        />
      </View>
    </View>
  );
}
