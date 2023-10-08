/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, BackHandler, Modal, View, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Navigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';

import ModalPopup from './src/components/CustomModal/CustomModal';

const { width, height } = Dimensions.get('window');


const App = () => {
  const [visible, setVisible] = useState(false);

  SplashScreen.hide();

  useEffect(() => {
    const backAction = () => {
      setVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#989be2" />
      <SafeAreaView style={styles.root}>
        <ModalPopup visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <LottieView style={styles.lottieClose}
                  source={require("./src/screens/assets/animations/close.json")}
                  autoPlay={true}
                  loop={false} />
              </TouchableOpacity>
            </View>
          </View>
          <LottieView style={styles.lottie}
            source={require("./src/screens/assets/animations/exit.json")}
            autoPlay={true}
            loop={false} />
          <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>Вы уверены, что хотите выйти?</Text>
        </ModalPopup>
        <Navigation />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#B0ABD9',
    flex: 1,
  },

  lottie: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: width
  },
  lottieClose: {
    width: 80,
    height: 80
  },

  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },


});

export default App;
