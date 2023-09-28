import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';





const OnBoardingScreen = () => {
    return (
        <View style={styles.container}>
            <Onboarding
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#F1E4F3',
                        image: (
                            <View>

                                <LottieView style={styles.lottie} source={require("../assets/animations/first.json")}
                                    autoPlay={true}
                                    loop={true} />
                            </View>
                        ),
                        title: 'Узнавайте всё первыми',
                        subtitle: 'Новостная лента с регулярными обновлениями',
                        skipLabel: 'Проп.',
                        showNext: 'Далее',
                        bottomBarColor: 'black'
                    },
                    {
                        backgroundColor: '#83B5D1',
                        image: (
                            <View>
                                <LottieView style={styles.lottie} source={require("../assets/animations/infinity.json")} autoPlay loop />
                            </View>
                        ),
                        title: 'Лента не имеет конца!',
                        subtitle: 'Читайте, сколько угодно',
                    },
                    {
                        backgroundColor: '#7D53DE',
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
        width: 300,
        height: 400
    }
});










export default OnBoardingScreen;

