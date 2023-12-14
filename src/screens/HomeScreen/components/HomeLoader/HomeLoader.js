import {View, Image} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import newsBackgroundImage from '../../../../../assets/images/newsoverview.jpg';

export default function HomeLoader() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        blurRadius={100}
        style={{position: 'absolute', width: '100%', height: '100%'}}
        source={newsBackgroundImage}
      />
      <Progress.CircleSnail thickness={10} size={140} color="white" />
    </View>
  );
}
