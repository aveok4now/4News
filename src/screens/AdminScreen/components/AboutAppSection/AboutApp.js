import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { width } from '../../../../utils/global/getDimensions';
import meditatingAnimation from '../../../../../assets/animations/meditating.json';
import { Icons } from '../../../../utils/global/Icons';
import { openLinkInBrowserHandler } from '../../../../components/customs/CustomDrawer/utils/openLink';
import Button from '../Button';

export default function AboutApp() {
  return (
    <View style={{ marginVertical: 16 }}>
      <LottieView
        style={styles.lottie}
        source={meditatingAnimation}
        autoPlay={true}
        loop={true}
      />
      <View style={{ padding: 8 }}>
        <Text style={{ fontFamily: 'Inter-Light', fontSize: 18 }}>
          Программное решение новостного приложения было разработано с
          использованием JavaScript-библиотеки{' '}
          <Text style={{ fontFamily: 'Inter-ExtraBold' }}>React Native</Text>,
          база данных была разработана в СУБД{' '}
          <Text style={{ fontFamily: 'Inter-ExtraBold' }}>SQLite</Text>. Является
          нормализанованной и находится в третьей нормальной форме. Исходный код
          приложения:
        </Text>
        <Button onPress={() => openLinkInBrowserHandler(3)}>
          <Icons.AntDesign name="github" size={50} />
          <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 24 }}>
            Github
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width,
    height: width,
  },
});
