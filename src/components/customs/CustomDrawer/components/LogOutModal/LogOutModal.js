import {View, Text} from 'react-native';
import React from 'react';
import ModalPopup from '../../../CustomModal/CustomModal';
import * as Animatable from 'react-native-animatable';
import CustomButton from '../../../CustomButton';

export default function LogOutModal({
  navigation,
  showLogOutModal,
  onYesPress,
  setShowLogOutModal,
}) {
  return (
    <>
      <ModalPopup
        navigation={navigation}
        visible={showLogOutModal}
        backgroundColor="#7692FF">
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Inter-ExtraBold',
            }}>
            Вы уверены, что хотите выйти из аккаунта?
          </Text>

          <Animatable.View
            animation="fadeIn"
            duration={1500}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <CustomButton
              bgColor="#3a86ff"
              type="Tertiary"
              text="Да, выйти из аккаунта"
              onPress={onYesPress}
            />
          </Animatable.View>
        </View>
        <Animatable.View animation="fadeIn" style={{justifyContent: 'center'}}>
          <CustomButton
            type="Primary"
            text="Отмена"
            bgColor="transparent"
            onPress={() => {
              setShowLogOutModal(!showLogOutModal);
            }}
          />
        </Animatable.View>
      </ModalPopup>
    </>
  );
}
