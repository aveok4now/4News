import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const useUserCredentials = () => {
  const [identify, setIdentify] = useState('');
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    const checkUserCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');
      const guestID = await AsyncStorage.getItem('guestID');

      if (savedUsername && savedPassword) {
        setIdentify(savedUsername);
        try {
          const db = await SQLite.openDatabase({name: 'news.db', location: 1});

          db.transaction(tx => {
            tx.executeSql(
              'SELECT userEmail FROM Users WHERE userLogin = ?',
              [savedUsername],
              (_, {rows}) => {
                if (rows.length > 0) {
                  const {userEmail} = rows.item(0);
                  setUserEmail(userEmail);
                  console.log(userEmail);
                }
              },
              error => {
                console.error(error);
              },
            );
          });
        } catch (error) {
          console.error(error);
        }
      } else if (savedUsername === 'guest') {
        if (guestID) {
          setIdentify('Гость');
        }
      }
    };

    checkUserCredentials();
  }, []);
  return identify;
};

export default useUserCredentials;
