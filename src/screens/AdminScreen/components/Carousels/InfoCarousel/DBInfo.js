import {View, Text} from 'react-native';
import React from 'react';
import {theme} from '../../../../MovieNewsScreen/theme';
import {width, height} from '../../../../../utils/getDimensions';

export default function DBInfo({item}) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.bgWhite(0.1),
        width: width * 0.6,
        height: height * 0.3,
        backgroundColor: theme.bgWhite(0.2),
        borderRadius: 16,
        marginTop: 16,
      }}>
      <Text
        style={{
          fontFamily: 'Inter-ExtraBold',
          marginLeft: 8,
          fontSize: 24,
        }}>
        {item.title}
      </Text>
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          top: '25%',
          right: 0,
          left: 0,
        }}>
        <Text style={{fontFamily: 'Inter-Bold', fontSize: 60}}>
          {item.count}
        </Text>
      </View>
      <View style={{position: 'absolute', bottom: 0, right: 5}}>
        {item.icon}
      </View>
    </View>
  );
}
