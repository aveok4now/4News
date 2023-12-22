import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StatusBar, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';
import * as Animatable from 'react-native-animatable';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import CustomDrawer from '../../components/customs/CustomDrawer';
import newsOverViewImage from '../../../assets/images/search-bg.jpg';
import interestsAnimation from '../../../assets/animations/interests.json';
import FavoritesInfo from './components/FavoritesInfo/FavoritesInfo';
import GuestInfo from './components/FavoritesGuestInfo/GuestInfo';

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
          blurRadius={50}
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
              <FavoritesInfo animation={interestsAnimation} />
            )}
          </Animatable.View>
        </CustomDrawer>
      </View>
    </>
  ) : (
    <GuestInfo navigation={navigation} />
  );
}
