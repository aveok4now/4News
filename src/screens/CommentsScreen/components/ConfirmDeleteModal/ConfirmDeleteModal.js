import {View, Text} from 'react-native';
import React from 'react';
import ModalPopup from '../../../../components/customs/CustomModal/CustomModal';
import CustomButton from '../../../../components/customs/CustomButton';

export default function ConfirmDeleteModal({
  showConfirmDeleteModal,
  setShowConfirmDeleteModal,
  handleDeleteComment,
}) {
  return (
    <ModalPopup
      visible={showConfirmDeleteModal}
      backgroundColor="rgb(59 130 246)">
      <View style={{padding: 5}}>
        <Text style={{fontFamily: 'Inter-ExtraBold', fontSize: 18}}>
          Подтверждение
        </Text>
      </View>
      <View style={{width: '100%', padding: 5}}>
        <Text style={{fontFamily: 'Inter-Light', fontSize: 18}}>
          Вы действительно хотите удалить этот пост?
        </Text>
      </View>
      <View
        style={{
          border: 1,
          borderBottomColor: '#DDDDDD',
          borderBottomWidth: 1,
          width: '90%',
          alignSelf: 'center',
          marginTop: 15,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '50%',
          padding: 5,
          justifyContent: 'space-between',
          gap: 10,
        }}>
        <CustomButton
          text="Нет"
          type="Tertiary"
          onPress={() => setShowConfirmDeleteModal(!showConfirmDeleteModal)}
        />
        <CustomButton text="Да" type="Tertiary" onPress={handleDeleteComment} />
      </View>
    </ModalPopup>
  );
}
