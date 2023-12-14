import {View, Text} from 'react-native';
import React from 'react';
import TypeWriter from 'react-native-typewriter';

export default function GratitudeCountDown({
  countdown,
  isTyped,
  handleTypeComplete,
}) {
  return (
    <View style={{justifyContent: 'center'}}>
      <Text
        style={{
          fontFamily: 'Inter-ExtraLight',
          opacity: isTyped ? 0.5 : 0,
          textAlign: 'center',
        }}>
        {countdown}
      </Text>
      <TypeWriter
        style={{
          fontFamily: 'Inter-ExtraBold',
          color: 'white',
          textShadowColor: 'rgba(0, 0, 0, 0.25)',
          textShadowOffset: {width: 0, height: 2},
          textShadowRadius: 4,
          textAlign: 'center',
          fontSize: 16,
        }}
        minDelay={2}
        typing={1}
        onTypingEnd={handleTypeComplete}>
        Спасибо большое за Ваш отзыв!
      </TypeWriter>
    </View>
  );
}
