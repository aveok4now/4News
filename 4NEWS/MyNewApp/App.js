/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import Navigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';



const App = () => {
  SplashScreen.hide();
  return (
    <>
      <StatusBar backgroundColor="#989be2" />
      <SafeAreaView style={styles.root}>
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
});

export default App;
