import { View, Text, StyleSheet, ScrollView, Linking, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomDrawer from '../../components/customs/CustomDrawer'
import LinearGradient from 'react-native-linear-gradient'
import ModalPopup from '../../components/customs/CustomModal';
import CustomButton from '../../components/customs/CustomButton';
import CustomInput from '../../components/customs/CustomInput';
import { useForm } from 'react-hook-form';
import * as Animatable from 'react-native-animatable'
import TypeWriter from 'react-native-typewriter'

export default function FeedBackScreen({ navigation }) {
    const [showModal, setShowModal] = useState(true)
    const [isMessageSend, setIsMessageSend] = useState(false)

    const [isTyped, setIsTyped] = useState(false)

    const { control, handleSubmit, watch } = useForm();
    let message = watch('feedback');

    const [countdown, setCountdown] = useState(4);

    const sendMessage = () => {
        const subject = "Связь с 4News";
        const mailtoUrl = `mailto:sevsufornews@gmail.com?subject=
        ${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        Linking.openURL(mailtoUrl);
        setIsMessageSend(true);

    };

    const handleTypeComplete = () => setIsTyped(true)

    useEffect(() => {

        if (isTyped && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearInterval(timer);

        }
    }, [isTyped, countdown]);

    useEffect(() => {
        if (countdown === 0 && isTyped && navigation) {
            navigation.navigate("Домашняя страница");
        }
    }, [countdown, isTyped, navigation]);


    return (

        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            style={{ width: '100%', flex: 1, }}
        >
            {/* <CustomDrawer backgroundColor="#5b86e5" fgColor="#458fe6" elevation={35} navigation={navigation}> */}
            <View style={styles.root}>
                {showModal && (
                    <>
                        {/* {Alert.alert()} */}
                        <ModalPopup
                            navigation={navigation}
                            visible={showModal}
                            backgroundColor='#7692FF'
                        >
                            {!isMessageSend ? (
                                <View>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Inter-ExtraBold' }}>Оставьте свой отзыв и помогите нам стать лучше!
                                    </Text>
                                    <CustomInput
                                        name="feedback"
                                        placeholder="Мне не понравилось ..."
                                        //secureTextEntry
                                        control={control}

                                        rules={{
                                            required: 'Пожалуйста, напишите сообщение',
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


                                        {/* <Text style={{ fontFamily: "Inter-ExtraBold" }}>ОК</Text> */}
                                    </View>
                                </View>
                            ) : (
                                isMessageSend && (
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Inter-ExtraLight', opacity: isTyped ? 0.5 : 0, textAlign: 'center' }}>{countdown}</Text>
                                        <TypeWriter
                                            style={styles.text}
                                            minDelay={2}
                                            typing={1}
                                            onTypingEnd={handleTypeComplete}
                                        >
                                            Спасибо большое за Ваш отзыв!
                                        </TypeWriter>
                                    </View>
                                )
                            )
                            }

                            <Animatable.View animation="fadeIn" style={{ justifyContent: 'center' }}>
                                <CustomButton
                                    type="Tertiary"
                                    text="Назад"
                                    onPress={() => {
                                        setShowModal(!showModal)
                                        navigation.navigate("Домашняя страница")
                                    }}
                                />

                            </Animatable.View>
                        </ModalPopup>

                    </>
                )
                }
            </View>
            {/* </CustomDrawer> */}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    text: {
        fontFamily: 'Inter-ExtraBold', color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        textAlign: 'center',
        fontSize: 16
    }
});
