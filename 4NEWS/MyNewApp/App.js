import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, BackHandler, Modal, ListItem, View, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Navigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';

import ModalPopup from './src/components/customs/CustomModal/CustomModal';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
const { width, height } = Dimensions.get('window');
import SQLite from 'react-native-sqlite-storage'
import { assets } from './react-native.config';
//import CustomButton from 'D:/react/4NEWS/MyNewApp/src/components/customs/CustomButton/CustomButton.js';
import CustomButton from './src/components/customs/CustomButton';

// SQLite.enablePromise(true);
const App = () => {
  const [visible, setVisible] = useState(false);

  SplashScreen.hide();

  useEffect(() => {

    db = SQLite.openDatabase(
      {
        name: 'news.db',
        createFromLocation: 1,
      },
      successToOpenDB,
      failToOpenDB
    );


    const backAction = () => {
      setVisible(!visible);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const successToOpenDB = () => {
    //alert("База данных подключена!");
  }

  const failToOpenDB = (err) => {
    alert(err)
  }

  const onYes = () => BackHandler.exitApp()

  return (
    <>
      <StatusBar backgroundColor="#36d1dc" />
      {/* <LinearGradient colors={['#42275a', '#734b6d']} style={styles.gradient}> */}

      <LinearGradient colors={['#36d1dc', '#5b86e5']} style={styles.gradient}>
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
            <Text style={{ marginBottom: 20, fontSize: 20, textAlign: 'center', textDecorationColor: 'white', fontFamily: "Inter-Bold" }}>Вы уверены, что хотите выйти?</Text>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <CustomButton
                text="Да"
                onPress={() => onYes()}
              />
              <CustomButton
                type='Tertiary'
                text="Отмена"
                onPress={() => setVisible(false)}
              />
            </View>
          </ModalPopup>
          <Navigation />
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}




const styles = StyleSheet.create({
  root: {
    //backgroundColor: '#B0ABD9',
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  lottie: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: width
  },
  lottieClose: {
    width: 90,
    height: 90,
    marginLeft: 55
  },

  header: {
    width: '120%',
    height: 40,
    alignItems: 'flex-end',
    // paddingHorizontal: -15,
    justifyContent: 'center',
  },


});

export default App;
