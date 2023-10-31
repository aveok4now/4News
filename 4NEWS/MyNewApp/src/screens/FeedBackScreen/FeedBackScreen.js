import { View, Text, StyleSheet, ScrollView, Linking, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import CustomDrawer from '../../components/customs/CustomDrawer'
import LinearGradient from 'react-native-linear-gradient'
import ModalPopup from '../../components/customs/CustomModal';
import CustomButton from '../../components/customs/CustomButton';
import CustomInput from '../../components/customs/CustomInput';
import { useForm } from 'react-hook-form';
import * as Animatable from 'react-native-animatable'


export default function FeedBackScreen({ navigation }) {
    const [showModal, setShowModal] = useState(true)
    const [isMessageSend, setIsMessageSend] = useState(false)

    const { control, handleSubmit, watch } = useForm();
    let message = watch('feedback');

    const sendMessage = () => {
        Linking.openURL(`mailto:sevsuphotoeditor@gmail.com?body=${encodeURIComponent(message)}`);
        setShowModal(!showModal);
        setIsMessageSend(!isMessageSend)
        setTimeout(() => {
            navigation.navigate("Домашняя страница")
        }, 5000);
    }

    return (

        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            style={{ width: '100%', flex: 1, }}
        >
            <CustomDrawer backgroundColor="#5b86e5" fgColor="#458fe6" elevation={35} navigation={navigation}>
                <View style={styles.root}>
                    {showModal ? (
                        <>
                            {/* {Alert.alert()} */}

                            <ModalPopup
                                navigation={navigation}
                                visible={showModal}
                            >
                                <View>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Inter-ExtraBold' }}>Оставьте свой отзыв и помогите нам стать лучше!
                                    </Text>
                                    <CustomInput
                                        name="feedback"
                                        placeholder="Мне не понравилось ..."
                                        //secureTextEntry
                                        control={control}

                                        rules={{
                                            required: 'Пожалуйста, напишите Ваше сообщение',
                                            minLength: { value: 3, message: 'Сообщение слишком короткое' },

                                        }}
                                    //errors={rules}
                                    //setIsTyping={setIsTyping}
                                    />
                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        marginTop: 15
                                    }}>
                                        <CustomButton
                                            text="Отправить"
                                            onPress={handleSubmit(sendMessage)}
                                        />
                                        <CustomButton
                                            type="Tertiary"
                                            text="Назад"
                                            onPress={() => {
                                                setShowModal(!showModal)
                                                navigation.navigate("Домашняя страница")
                                            }}
                                        />

                                        {/* <Text style={{ fontFamily: "Inter-ExtraBold" }}>ОК</Text> */}
                                    </View>
                                </View>
                            </ModalPopup>

                        </>
                    ) : (
                        isMessageSend && (
                            <View>
                                <Text style={{ color: 'green' }}>Спасибо за отзыв!</Text>
                            </View>
                        )
                    )
                    }
                </View>
            </CustomDrawer>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})