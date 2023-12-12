import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ModalPopup from '../CustomModal';
import CustomButton from '../../CustomButton';

const GuestModal = ({
  navigation,
  showModal,
  onOk,
  setShowModal,
  modalText = 'Чтобы добавлять новости в избранное, пожалуйста, войдите или зарегистрируйтесь 🥰',
}) => {
  return (
    <View>
      <ModalPopup navigation={navigation} visible={showModal} route="popup">
        <View>
          <Text style={styles.popUpText}>{modalText}</Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <CustomButton text="ОК" onPress={() => onOk()} />
            <CustomButton
              type="Tertiary"
              text="Отмена"
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </ModalPopup>
    </View>
  );
};

export default GuestModal;

const styles = StyleSheet.create({
  popUpText: {
    fontFamily: 'Inter-Light',
    fontSize: 18,
    textAlign: 'center',
  },
});
