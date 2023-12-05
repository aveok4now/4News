import React, { useEffect, useState } from 'react';
import { SafeAreaView, BackHandler, Dimensions } from 'react-native';
import Navigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';

import ExitModal from './src/components/customs/CustomModal/ExitModal';

const App = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hide();

    db = SQLite.openDatabase(
      {
        name: 'news.db',
        createFromLocation: 1,
      },
      successToOpenDB,
      failToOpenDB,
    );

    const backAction = () => {
      setVisible(!visible);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const successToOpenDB = () => {
    //alert("База данных подключена!");
  };

  const failToOpenDB = err => alert(err);

  const onYes = () => BackHandler.exitApp();

  return (
    <>
      {/* <LinearGradient colors={['#57e0f3', '#357ae0']} style={{ flex: 1 }}> */}
      <SafeAreaView style={{ flex: 1 }}>
        <ExitModal visible={visible} onYes={onYes} setVisible={setVisible} />
        <Navigation />
      </SafeAreaView>
      {/* </LinearGradient> */}
    </>
  );
};

export default App;
