
import React, { useEffect, useState, useRef } from 'react';
import { Modal, View, Animated, Text, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import LottieView from 'lottie-react-native';
import { assets } from '../../../react-native.config';
import CustomButton from '../CustomButton';


const { width, height } = Dimensions.get('window');
const ModalPopup = ({ visible, children, route, navigation }) => {
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


    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>

                <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
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
        height: height,

    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#48ade0',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        overflow: 'hidden',
        fontFamily: "Inter-Bold"
    },




};

export default ModalPopup;
