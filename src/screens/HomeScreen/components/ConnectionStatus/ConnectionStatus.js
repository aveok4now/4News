import {Text} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

export default function ConnectionStatus({
  animationName = 'fadeIn',
  duration = 1000,
  bgColor,
  statusText,
}) {
  return (
    <Animatable.View
      //animation="fadeInDown"
      animation={animationName}
      duration={duration}
      style={{
        backgroundColor: bgColor,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        elevation: 5,
      }}>
      <Text style={{fontFamily: 'Inter-Light'}}>
        {/* Отсутствует интернет-соединение */}
        {statusText}
      </Text>
    </Animatable.View>
  );
}
