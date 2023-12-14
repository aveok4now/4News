import { View, StatusBar, ScrollView, Image, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomDrawer from '../../components/customs/CustomDrawer';
import TrendingMovies from '../../components/MovieNewsComponents/TrendingMovies';
import MovieList from '../../components/MovieNewsComponents/MovieList';
import Loader from '../../components/MovieNewsComponents/Loader';
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
} from '../../api/moviedb';
import searchBg from '../../../assets/images/search-bg.jpg';

export default function MovieNewsScreen({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);

    try {
      const [trendingData, upcomingData, topRatedData] = await Promise.all([
        getTrendingMovies(),
        getUpcomingMovies(),
        getTopRatedMovies(),
      ]);

      setTrending(trendingData);
      setUpcoming(upcomingData);
      setTopRated(topRatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#092439" />
      <View style={{ flex: 1 }}>
        <Image
          blurRadius={50}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          source={searchBg}
        />
        <CustomDrawer
          type="Новости Кино"
          fontFamily="Inter-ExtraBold"
          letterSpacing={1}
          showBorder={true}
          showSearch="true"
          navigation={navigation}
          destination="MovieSearchScreen">
          {isLoading ? (
            <Loader />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  colors={['white']}
                  refreshing={isRefreshing}
                  progressBackgroundColor={'rgb(99 102 241)'}
                  onRefresh={() => getData()}
                />
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}>
              {/* Сейчас в тренде */}
              {trending.length > 0 && (
                <TrendingMovies data={trending} navigation={navigation} />
              )}

              {/* Будущие новинки */}
              <MovieList
                title="Будущие новинки"
                data={upcoming}
                navigation={navigation}
              />
              {/* Топ рейтинга */}
              <MovieList
                title="Топ рейтинга"
                data={topRated}
                navigation={navigation}
              />
            </ScrollView>
          )}
        </CustomDrawer>
      </View>
    </>
  );
}
