import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { setItem } from "../../utils/asyncStorage";

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
                        backgroundColor: '#F1E4F3',
                        image: (
                            <View>

                                <LottieView style={styles.lottie}
                                    source={require("../assets/animations/first.json")}
                                    autoPlay={true}
                                    loop={true} />
                            </View>
                        ),
                        title: 'Узнавайте всё первыми',
                        subtitle: 'Новостная лента с регулярными обновлениями',
                    },
                    {
                        backgroundColor: '#83B5D1',
                        image: (
                            <View>
                                <LottieView style={styles.lottie}
                                    source={require("../assets/animations/infinity.json")}
                                    autoPlay
                                    loop />
                            </View>
                        ),
                        title: 'Лента не имеет конца!',
                        subtitle: 'Читайте, сколько угодно',
                    },
                    {
                        backgroundColor: '#a78bfa',
                        image: (
                            <View>
                                <LottieView style={styles.lottie} source={require("../assets/animations/interests.json")} autoPlay loop />
                            </View>
                        ),
                        title: 'Находите Ваши интересы',
                        subtitle: 'И получайте новости о том, что Вам интересно',
                    },

                ]}
            />
        </View>
    );
}


const styles = StyleSheet.create({

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
        backgroundColor: '#b9cbf2',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100
    },

    text: {
        color: 'white',
        fontWeight: '500',
    },

    skip: {
        padding: 20,
        // color: 'white',
    },

});





export default OnBoardingScreen;

