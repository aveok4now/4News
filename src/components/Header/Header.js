import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({navigation}) => {
  const [identify, setIdenify] = useState('');

  useEffect(() => {
    const checkUserCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');
      const guestID = await AsyncStorage.getItem('guestID');

      if (savedUsername && savedPassword) {
        setIdenify(savedUsername);
      } else if (savedUsername === 'guest') {
        if (guestID) {
          setIdenify('Гость');
        }
      }
    };

    checkUserCredentials();
  }, []);

  return (
    <Animatable.View style={styles.header} animation="fadeIn" duration={1500}>
      <TouchableOpacity onPress={() => {}}>
        <Icon2 name="menu" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.text}>Новости</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Icon name="search" size={24} color="white" />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.25,
    borderColor: '#F3FAE1',
    backgroundColor: '#7371FC',
    elevation: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Inter-Light',
  },
});
