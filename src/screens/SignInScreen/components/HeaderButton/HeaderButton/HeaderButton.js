import {TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default function HeaderButton({onPress, style, iconName}) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Animatable.View animation="bounceIn" duration={1500}>
        <Icon name={iconName} size={30} color="white" />
      </Animatable.View>
    </TouchableOpacity>
  );
}
