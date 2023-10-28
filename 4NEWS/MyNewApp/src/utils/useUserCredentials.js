import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserCredentials = () => {
    const [identify, setIdentify] = useState('')
    useEffect(() => {
        const checkUserCredentials = async () => {
            const savedUsername = await AsyncStorage.getItem('username');
            const savedPassword = await AsyncStorage.getItem('password');
            const guestID = await AsyncStorage.getItem('guestID');

            if (savedUsername && savedPassword) {
                //onSignInPressed({ username: savedUsername, password: savedPassword });
                setIdentify(savedUsername);
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