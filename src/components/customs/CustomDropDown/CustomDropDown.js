import {
    View,
    Text,
    FlatList,
    Modal,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { Icons } from '../../Icons';
import { assets } from '../../../../react-native.config';

export default function CustomDropDown({
    visible,
    onClose,
    onOptionSelect,
    identify,
    authorName,
}) {
    const condition = identify === authorName ? true : false;

    const options = [
        {
            id: condition ? 'delete' : 'alert-circle-outline',
            label: condition ? 'Удалить' : 'Пожаловаться',
            icon: condition ? 'delete' : 'alert-circle-outline',
        },
        { id: 'share', label: 'Поделиться', icon: 'share' },
    ];

    const handleBackgroundPress = () => onClose();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={handleBackgroundPress}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => onOptionSelect(item.id)}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            alignItems: 'center',
                                        }}>
                                        <Text style={styles.optionText}>{item.label}</Text>
                                        <Icons.MaterialCommunityIcons
                                            name={item.icon}
                                            color="rgb(186 230 253)"
                                            size={28}
                                            style={{ marginLeft: 8 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'rgb(2 132 199)',
        padding: 20,
        borderRadius: 10,
        width: 200,
    },
    optionText: {
        fontSize: 16,
        paddingVertical: 10,
        color: 'white',
        fontFamily: 'Inter-Black',
        //letterSpacing: 1,
    },
});
