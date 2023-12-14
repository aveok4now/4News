import {View, Text} from 'react-native';
import React from 'react';
import ModalPopup from '../../../../components/customs/CustomModal/CustomModal';
import TypeWriter from 'react-native-typewriter';
import CustomButton from '../../../../components/customs/CustomButton';

export default function UnregisteredModal({
  showGuestModal,
  navigation,
  onBackPress,
  onSignInPress,
}) {
  return (
    <ModalPopup visible={showGuestModal}>
      <View style={{alignItems: 'center'}}>
        <TypeWriter
          style={{fontFamily: 'Inter-ExtraBold', fontSize: 20}}
          minDelay={2}
          typing={1}>
          Упс...
        </TypeWriter>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            marginTop: 5,
            color: 'white',
            opacity: 0.85,
          }}>
          Чтобы делиться своими новостями, зарегестрируйтесь или войдите в
          аккаунт!
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '50%',
          padding: 5,
          justifyContent: 'space-between',
          gap: 10,
        }}>
        <CustomButton text="Назад" type="Tertiary" onPress={onBackPress} />
        <CustomButton text="Войти" onPress={onSignInPress} />
      </View>
    </ModalPopup>
  );
}
