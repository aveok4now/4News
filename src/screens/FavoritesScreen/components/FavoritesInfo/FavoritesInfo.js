import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Icons} from '../../../../constants/Icons';
import {width} from '../../../../utils/global/getDimensions';

export default function FavoritesInfo({animation}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
      }}>
      <Text style={{fontFamily: 'Inter-Light', fontSize: 20}}>
        Здесь будут появляться избранные новости, нажимайте на кнопку{' '}
        <Icons.FontAwesome name={'heart-o'} size={20} color="white" /> , чтобы
        сохранить их!
      </Text>
      <View>
        <LottieView
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            width: width * 0.9,
            height: width,
          }}
          source={animation}
          autoPlay
          loop
        />
      </View>
    </View>
  );
}
