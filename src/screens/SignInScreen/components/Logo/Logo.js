import {TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

export default function Logo({navigation, height, source}) {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('NewsViewer', {
          url: 'www.sevsu.ru',
        })
      }>
      <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={source}
        style={[
          {
            height: height * 0.17,
            marginTop: '20%',
            marginBottom: '5%',
            width: '70%',
            maxWidth: 500,
            maxHeight: 200,
            tintColor: 'rgb(29 78 216)',
          },
        ]}
        resizeMode="contain"
      />
    </TouchableWithoutFeedback>
  );
}
