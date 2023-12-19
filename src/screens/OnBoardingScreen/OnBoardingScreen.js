import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {setItem} from '../../utils/global/asyncStorage';
import {width} from '../../utils/global/getDimensions';
import newsAnimation from '../../../assets/animations/noNewsInfo.json';
import infinityAnimation from '../../../assets/animations/infinity.json';
import interestsAnimation from '../../../assets/animations/interests.json';
import weatherAnimation from '../../../assets/animations/weather/rain_with_thunder.json';
import movieAnimation from '../../../assets/animations/movie.json';

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate('Добро пожаловать !');
    setItem('onboarded', '1');
  };

  const Button = ({text, onPress, buttonStyle, textStyle}) => {
    return (
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <Animatable.Text animation="fadeIn" style={textStyle}>
          {text}
        </Animatable.Text>
      </TouchableOpacity>
    );
  };

  const doneButton = ({...props}) => {
    return (
      <Button
        text="Начать"
        onPress={handleDone}
        buttonStyle={styles.done}
        textStyle={styles.text}
      />
    );
  };

  const skipButton = ({...props}) => {
    return (
      <Button
        text="Пропустить"
        onPress={handleDone}
        buttonStyle={styles.skip}
      />
    );
  };

  const nextButton = ({...props}) => {
    return (
      <Button
        text="Далее"
        {...props}
        buttonStyle={styles.done}
        textStyle={styles.text}
      />
    );
  };

  const [pageIndex, setPageIndex] = useState(0);

  const changePageHandler = index => setPageIndex(index);

  const screens = [
    {
      statusBarColor: 'rgb(14 165 233)',
      backgroundColor: 'rgb(14 165 233)',
      animationSource: newsAnimation,
      title: 'Новости на любой вкус',
      subtitle: 'Новостная лента с безграничной информацией.',
    },
    {
      statusBarColor: 'rgb(2 132 199)',
      backgroundColor: 'rgb(2 132 199)',
      animationSource: infinityAnimation,
      title: 'Новости со всего мира!',
      subtitle: 'Читайте, что угодно и сколько угодно.',
    },
    {
      statusBarColor: 'rgb(3 105 161)',
      backgroundColor: 'rgb(3 105 161)',
      animationSource: interestsAnimation,
      title: 'Находите Ваши интересы',
      subtitle: 'И получайте новости с тех источников, которые интересны Вам.',
    },
    {
      statusBarColor: 'rgb(37 99 235)',
      backgroundColor: 'rgb(37 99 235)',
      animationSource: weatherAnimation,
      title: 'Мировой прогноз погоды',
      subtitle: 'Смотрите информацию о погоде в любом городе!',
    },
    {
      statusBarColor: 'rgb(30 64 175)',
      backgroundColor: 'rgb(30 64 175)',
      animationSource: movieAnimation,
      title: 'Свежие новости мира кино',
      subtitle: 'Узнавайте, какие фильмы в тренде прямо сейчас!',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={screens[pageIndex].statusBarColor} />
      <Onboarding
        bottomBarHighlight={false}
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        NextButtonComponent={nextButton}
        SkipButtonComponent={skipButton}
        pageIndexCallback={changePageHandler}
        containerStyles={{paddingHorizontal: 15}}
        pages={screens.map((screen, index) => ({
          backgroundColor: screen.backgroundColor,
          image: (
            <View key={index}>
              <LottieView
                style={styles.lottie}
                source={screen.animationSource}
                autoPlay={true}
                loop={true}
              />
            </View>
          ),
          title: <Text style={styles.title}>{screen.title}</Text>,
          subtitle: <Text style={styles.subtitle}>{screen.subtitle}</Text>,
        }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Light',
    textAlign: 'center',
    fontSize: 20,
  },

  lottie: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: width,
  },

  done: {
    padding: 20,
    backgroundColor: '#DF02D4',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },

  text: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Inter-ExtraBold',
  },

  skip: {
    padding: 20,
  },
});

export default OnBoardingScreen;
