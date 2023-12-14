import {View, Linking, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ModalPopup from '../../components/customs/CustomModal';
import CustomButton from '../../components/customs/CustomButton';
import {useForm} from 'react-hook-form';
import * as Animatable from 'react-native-animatable';
import {setStatusBarColor} from '../../utils/global/StatusBarManager';
import SQLite from 'react-native-sqlite-storage';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import GratitudeCountDown from './components/GratitudeCountDown/GratitudeCountDown';

export default function FeedBackScreen({navigation}) {
  let identify = useUserCredentials();

  const [showModal, setShowModal] = useState(true);
  const [isMessageSend, setIsMessageSend] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const [countdown, setCountdown] = useState(4);

  const {control, handleSubmit, watch} = useForm();
  let message = watch('feedback');

  const sendMessage = async () => {
    await saveFeedbackIntoDB(identify, message);
    const subject = 'Связь с 4News';
    const mailtoUrl = `mailto:sevsufornews@gmail.com?subject=
        ${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    Linking.openURL(mailtoUrl);
    setIsMessageSend(true);
  };

  const saveFeedbackIntoDB = async (identify, message) => {
    try {
      console.log(message);
      const db = await SQLite.openDatabase({name: 'news.db', location: 1});

      let createTableQuery = `
                CREATE TABLE IF NOT EXISTS UsersFeedbacks (
                    userId INTEGER PRIMARY KEY AUTOINCREMENT,
                    userLogin TEXT NULL,
                    feedBack TEXT NULL 
                )`;
      await db.executeSql(createTableQuery);

      let insertFeedBackQuery = `
                INSERT INTO UsersFeedbacks (userLogin, feedBack)
                VALUES (?, ?)`;
      let insertFeedBackQueryArgs = [identify, message];
      const [results] = await db.executeSql(
        insertFeedBackQuery,
        insertFeedBackQueryArgs,
      );

      if (results.rowsAffected > 0) {
        console.log('Table UsersFeedbacks created or already exists.');
        console.log(`Rows affected by INSERT: ${results.rowsAffected}`);
      } else {
        console.error('Failed to insert feedback into the database.');
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  };

  const handleTypeComplete = () => setIsTyped(true);

  useEffect(() => {
    if (isTyped && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isTyped, countdown]);

  useEffect(() => {
    if (countdown === 0 && isTyped && navigation) {
      navigation.navigate('Домашняя страница');
    }
  }, [countdown, isTyped, navigation]);

  return (
    <>
      <StatusBar backgroundColor={'rgba(54, 209, 220, 0.5)'} />
      <LinearGradient
        colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
        style={{width: '100%', flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {showModal && (
            <>
              <ModalPopup
                navigation={navigation}
                visible={showModal}
                backgroundColor="#7692FF">
                {!isMessageSend ? (
                  <FeedbackForm
                    control={control}
                    title={'Оставьте свой отзыв и помогите нам стать лучше!'}
                    handleSubmit={handleSubmit}
                    sendMessage={sendMessage}
                  />
                ) : (
                  isMessageSend && (
                    <GratitudeCountDown
                      countdown={countdown}
                      isTyped={isTyped}
                      handleTypeComplete={handleTypeComplete}
                    />
                  )
                )}
                <Animatable.View
                  animation="fadeIn"
                  style={{justifyContent: 'center'}}>
                  <CustomButton
                    type="Tertiary"
                    text="Назад"
                    onPress={() => {
                      setShowModal(!showModal);
                      navigation.navigate('Домашняя страница');
                      setStatusBarColor('#36d1dc');
                    }}
                  />
                </Animatable.View>
              </ModalPopup>
            </>
          )}
        </View>
      </LinearGradient>
    </>
  );
}
