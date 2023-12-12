import { View } from 'react-native';
import React from 'react';
import { width, height } from '../../../utils/global/getDimensions';
import * as Progress from 'react-native-progress';

export default function Loader() {
  return (
    <View
      style={{
        height: height * 0.9,
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Progress.CircleSnail thickness={10} size={140} color={'white'} />
    </View>
  );
}
