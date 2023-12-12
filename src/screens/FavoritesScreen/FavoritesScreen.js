import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';
import * as Animatable from 'react-native-animatable';
import CustomButton from '../../components/customs/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import CustomDrawer from '../../components/customs/CustomDrawer';
import { width } from '../../utils/global/getDimensions';
import newsOverViewImage from '../../../assets/images/newsoverview.jpg'
import interestsAnimation from '../../../assets/animations/interests.json'

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  let identify = useUserCredentials();

  const loadFavorites = async () => {
    try {
      const savedNewsItems = await AsyncStorage.getItem('savedNewsItems');
      const parsedSavedNewsItems = JSON.parse(savedNewsItems) || [];
      setFavorites(parsedSavedNewsItems.reverse());
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error loading saved news items:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
    const refreshInterval = setInterval(loadFavorites, 5000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadFavorites();
  };

  const handleDelete = url => {
    const updatedFavorites = favorites.filter(item => item.url !== url);
    AsyncStorage.setItem('savedNewsItems', JSON.stringify(updatedFavorites))
      .then(() => {
        setFavorites(updatedFavorites);
      })
      .catch(error => {
        console.error('Error saving updated favorites:', error);
      });
  };

  return identify !== 'Гость' ? (
    <>
      <StatusBar backgroundColor="#092439" />
      <View style={{ flex: 1 }}>
        <Image
          blurRadius={150}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          source={newsOverViewImage}
        />

        <CustomDrawer
          type="Избранное"
          showBorder={true}
          letterSpacing={1}
          fontFamily="Inter-ExtraBold"
          navigation={navigation}>
          <Animatable.View animation="fadeIn" duration={500}>
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  colors={['white']}
                  refreshing={isRefreshing}
                  progressBackgroundColor={'rgb(99 102 241)'}
                  onRefresh={onRefresh}
                />
              }
              data={favorites}
              keyExtractor={item => item.url}
              renderItem={({ item }) => {
                return (
                  <Card item={item} navigation={navigation} data={favorites} />
                );
              }}
            />
            {favorites.length === 0 && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '30%',
                }}>
                <Text style={{ fontFamily: 'Inter-Light', fontSize: 20 }}>
                  Здесь будут появляться избранные новости, нажимайте на кнопку{' '}
                  <Icon name={'heart-o'} size={20} color="white" /> , чтобы
                  сохранить их!
                </Text>
                <View>
                  <LottieView
                    style={styles.lottie}
                    source={interestsAnimation}
                    autoPlay
                    loop
                  />
                </View>
              </View>
            )}
          </Animatable.View>
        </CustomDrawer>
      </View>
    </>
  ) : (
    <>
      <View style={{ flex: 1 }}>
        <Image
          blurRadius={150}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          source={newsOverViewImage}
        />
        <CustomDrawer navigation={navigation} showBorder={true}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 2,
              zIndex: 100,
            }}>
            <Text style={styles.guestInfo}>Упс...</Text>
            <Text style={styles.guestSubInfo}>
              Чтобы просматривать сохранённые новости, необходимо войти в
              аккаунт
            </Text>

            <View style={{ width: '60%', marginVertical: 15 }}>
              <CustomButton
                bgColor="white"
                fgColor="blue"
                text="Войти"
                onPress={() =>
                  navigation.navigate('Добро пожаловать !', { status: 'logout' })
                }
              />
            </View>
          </View>
        </CustomDrawer>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  lottie: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: width,
  },
  heading: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#8EBBF3',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerText: {
    fontFamily: 'Inter-ExtraBold',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  guestInfo: {
    textAlign: 'center',
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
  },
  guestSubInfo: {
    textAlign: 'center',
    fontFamily: 'Inter-Light',
  },
});
