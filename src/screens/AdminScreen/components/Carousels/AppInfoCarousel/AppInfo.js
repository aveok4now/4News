import {View, Text} from 'react-native';
import React from 'react';
import GradientBackground from '../../../../../components/GradientBackground';
import AnimatedText from '../../../../../components/UsersNewsComponents/AnimatedText';
import {theme} from '../../../../MovieNewsScreen/theme';
import {width, height} from '../../../../../utils/getDimensions';

export default function AppInfo({item, activeSlide}) {
  return (
    <>
      <GradientBackground
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        //colors={[theme.bgWhite(0.1), '#FFDD0094']}
        colors={[item.color1, item.color2]}
        style={{
          borderWidth: 1,
          borderColor: theme.bgWhite(0.1),
          width: width * 0.8,
          height: height * 0.15,
          backgroundColor: theme.bgWhite(0.2),
          borderRadius: 16,
          //marginTop: 16
        }}>
        <Text
          style={{
            fontFamily: 'Inter-ExtraBold',
            marginLeft: 8,
            fontSize: 24,
            textAlign: 'left',
            position: 'absolute',
            top: 10,
          }}>
          {item.title}
        </Text>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}>
          <Text style={{fontFamily: 'Inter-Bold', fontSize: 60, left: 5}}>
            {item.count}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: '100%',
          }}>
          {item.icon}
        </View>
      </GradientBackground>
      {activeSlide === item.id - 1 && (
        <AnimatedText
          activeSlide={activeSlide}
          title={
            <Text style={{fontFamily: 'Inter-Light'}}>{item.description}</Text>
          }
        />
      )}
    </>
  );
}
