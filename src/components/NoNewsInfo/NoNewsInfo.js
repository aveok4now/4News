import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {width} from '../../utils/global/getDimensions';
import noNewsInfoAnimation from '../../../assets/animations/noNewsInfo.json';
import {theme} from '../../screens/WeatherScreen/theme';
import * as Animatable from 'react-native-animatable';

export default function NoNewsInfo({
  primaryText,
  secondaryText,
  marginVertical = 100,
  inputRef,
}) {
  return (
    <TouchableWithoutFeedback
      onPress={() => inputRef && inputRef.current.blur()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            marginVertical: marginVertical,
          }}>
          <View style={styles.textWrap}>
            <Animatable.View animation="fadeIn" duration={1000}>
              <Text style={styles.primaryText}>{primaryText}</Text>
            </Animatable.View>
            <Animatable.View animation="fadeIn" duration={1100}>
              <Text style={styles.secondaryText}>
                {secondaryText.split(' ').map((word, index) =>
                  word.toLowerCase() === 'ваш' ? (
                    <Text key={index} style={styles.highlightedText}>
                      {word}{' '}
                    </Text>
                  ) : (
                    <Text key={index}>{word} </Text>
                  ),
                )}
              </Text>
            </Animatable.View>
          </View>

          <Animatable.View animation="flipInX" duration={1000}>
            <LottieView
              style={styles.lottie}
              source={noNewsInfoAnimation}
              autoPlay
              loop
            />
          </Animatable.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textWrap: {
    flexDirection: 'column',
    width: width,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgWhite(0.1),
    borderRadius: 15,
  },
  primaryText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 30,
    textShadowColor: 'rgba(226, 232, 240, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    textAlign: 'center',
  },
  highlightedText: {
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(226, 232, 240, 0.25)',
    textShadowOffset: {width: 0, height: 5},
    textShadowRadius: 4,
  },
  secondaryText: {
    fontFamily: 'Inter-Light',
    fontSize: 28,
    textShadowColor: 'rgba(226, 232, 240, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    textAlign: 'center',
  },
  lottie: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: width,
  },
});
