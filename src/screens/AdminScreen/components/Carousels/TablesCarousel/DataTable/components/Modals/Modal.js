import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from '../../../../../../../../components/customs/CustomButton';
import ModalPopup from '../../../../../../../../components/customs/CustomModal/CustomModal';
import { theme } from '../../../../../../../MovieNewsScreen/theme';

export default function Modal({
    showModal,
    onPress,
    onDelete,
    onUpdate,
    onSave,
}) {
    let fgColor = 'rgb(103 232 249)';
    let bgColor = theme.bgWhite(0.2);
    return (
        <ModalPopup visible={showModal} backgroundColor={'rgb(8 47 73)'}>
            <Text
                style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontFamily: 'Inter-Black',
                    fontSize: 18,
                }}>
                Что Вы хотите сделать с этим <Text style={{ color: fgColor }}>полем</Text>{' '}
                ?
            </Text>
            <View style={{ marginVertical: 8 }}>
                <CustomButton
                    text={'Удалить'}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    onPress={onDelete}
                />
                <CustomButton
                    text={'Обновить'}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    onPress={onUpdate}
                />
                <CustomButton
                    type="Tertiary"
                    text={'Отмена'}
                    onPress={onPress}
                    fgColor={fgColor}
                />
            </View>
        </ModalPopup>
    );
}
