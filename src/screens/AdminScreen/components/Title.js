import {View, Text} from 'react-native';
import React from 'react';

export default function Title({title}) {
  return (
    <View style={{padding: 8, marginVertical: 8}}>
      <Text
        style={{
          fontFamily: 'Inter-Black',
          fontSize: 32,
          textShadowColor: 'rgba(226, 232, 240, 0.25)',
          textShadowOffset: {width: 0, height: 3},
          textShadowRadius: 4,
        }}>
        {title}
      </Text>
    </View>
  );
}
