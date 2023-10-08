
import React, { useEffect, useState, useRef } from 'react';
import { Modal, View, Animated, Text, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import LottieView from 'lottie-react-native';



const { width, height } = Dimensions.get('window');
const ModalPopup = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }


    };

    const onYes = () => BackHandler.exitApp()
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>

                <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => onYes()} style={styles.buttonYes}>
                            <Text style={styles.buttonYes}>Да</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

            </View>
        </Modal>
    );
};

const styles = {
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 50,
        overflow: 'hidden',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    buttonYes: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 5,
        width: 55,
        //margin: 10,
        //width: '50%',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 14
    },

};

export default ModalPopup;
