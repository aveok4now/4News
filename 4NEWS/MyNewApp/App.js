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


const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#B0ABD9" />
      <SafeAreaView style={styles.root}>
        <SignUpScreen />
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
