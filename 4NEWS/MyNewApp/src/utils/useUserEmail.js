import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const useUserEmail = () => {
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        const checkUserEmail = async () => {
            const savedUsername = await AsyncStorage.getItem('username');
            const guestID = await AsyncStorage.getItem('guestID');

            if (savedUsername) {
                try {
                    const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

                    db.transaction((tx) => {

                        tx.executeSql('SELECT userEmail FROM Users WHERE userLogin = ?', [savedUsername], (_, { rows }) => {
                            if (rows.length > 0) {
                                const { userEmail } = rows.item(0);
                                setUserEmail(userEmail);
                                console.log(userEmail)
                            }
                        },
                            (error) => {
                                console.error(error);
                            });
                    });
                } catch (error) {
                    console.error(error);
                }
            } else if (savedUsername === 'guest') {
                if (guestID) {
                    setUserEmail('');
                }
            }
        };

        checkUserEmail();
    }, []);
    return userEmail;

};

export default useUserEmail;