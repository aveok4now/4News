/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#B0ABD9" />
      <SafeAreaView style={styles.root}>
        <ForgotPasswordScreen />
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
