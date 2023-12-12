import React, { useEffect, useState } from 'react';
import { SafeAreaView, BackHandler } from 'react-native';
import Navigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import SQLite from 'react-native-sqlite-storage';
import ExitModal from './src/components/customs/CustomModal/ExitModal';

const App = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hide();

    db = SQLite.openDatabase({
      name: 'news.db',
      createFromLocation: 1,
    });

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

  const onYes = () => BackHandler.exitApp();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ExitModal visible={visible} onYes={onYes} setVisible={setVisible} />
        <Navigation />
      </SafeAreaView>
    </>
  );
};

export default App;
