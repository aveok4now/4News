import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { setItem } from "../../utils/asyncStorage";
import { assets } from "../../../react-native.config";

const { width, height } = Dimensions.get('window');

const OnBoardingScreen = () => {

    const navigation = useNavigation();
    const handleDone = () => {
        navigation.navigate('Добро пожаловать !')
        setItem('onboarded', '1');
    }

    const Button = ({ text, onPress, buttonStyle, textStyle }) => {
        return (
            <TouchableOpacity style={buttonStyle} onPress={onPress}>
                <Animatable.Text animation="fadeIn" style={textStyle}>
                    {text}
                </Animatable.Text>
            </TouchableOpacity>
        );
    };


    const doneButton = ({ ...props }) => {
        return <Button text="Начать" onPress={handleDone} buttonStyle={styles.done} textStyle={styles.text} />;
    };

    const skipButton = ({ ...props }) => {
        return <Button text="Пропустить" onPress={handleDone} buttonStyle={styles.skip} />;
    };

    const nextButton = ({ ...props }) => {
        return <Button text="Далее" {...props} buttonStyle={styles.done} textStyle={styles.text} />;
    };



    return (
        <View style={styles.container}>
            <Onboarding
                bottomBarHighlight={false}
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                NextButtonComponent={nextButton}
                SkipButtonComponent={skipButton}
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#40BBC4',
                        image: (
                            <View>

                                <LottieView style={styles.lottie}
                                    source={require("../assets/animations/first.json")}
                                    autoPlay={true}
                                    loop={true} />
                            </View>
                        ),
                        title: <Text style={styles.title}>Узнавайте всё первыми</Text>,
                        subtitle: 'Новостная лента с регулярными обновлениями',
                    },
                    {
                        backgroundColor: '#7da9f2',
                        image: (
                            <View>
                                <LottieView style={styles.lottie}
                                    source={require("../assets/animations/infinity.json")}
                                    autoPlay
                                    loop />
                            </View>
                        ),
                        title: <Text style={styles.title}>Лента не имеет конца!</Text>,
                        subtitle: 'Читайте, сколько угодно',
                    },
                    {
                        backgroundColor: '#5a88e4',
                        image: (
                            <View>
                                <LottieView style={styles.lottie} source={require("../assets/animations/interests.json")} autoPlay loop />
                            </View>
                        ),
                        title: <Text style={styles.title}>Находите Ваши интересы</Text>,
                        subtitle: 'И получайте новости о том, что Вам интересно',
                    },

                ]}
            />
        </View>
    );
}


const styles = StyleSheet.create({

    title: {
        fontFamily: 'Inter-ExtraBold',
        fontSize: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    container: {
        flex: 1,

        //backgroundColor: 'white'
    },

    lottie: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
        height: width
    },

    done: {
        padding: 20,
        // color: 'white',
        backgroundColor: '#DF02D4',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,

    },

    text: {
        color: 'white',
        fontWeight: '500',
        fontFamily: "Inter-ExtraBold",
    },

    skip: {
        padding: 20,
        // color: 'white',
    },

});





export default OnBoardingScreen;

