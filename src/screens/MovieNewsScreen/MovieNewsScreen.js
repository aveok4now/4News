import {View, StatusBar, ScrollView, Image, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomDrawer from '../../components/customs/CustomDrawer';
import TrendingMovies from '../../components/MovieNewsComponents/TrendingMovies';
import MovieList from '../../components/MovieNewsComponents/MovieList';
import Loader from '../../components/MovieNewsComponents/Loader';
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from '../../api/moviedb';
import searchBg from '../../../assets/images/search-bg.jpg';

export default function MovieNewsScreen({navigation}) {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getTrendingMovies();
    await getUpcomingMovies();
    await getTopRatedMovies();
  };

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setTrending(data.results);
    }
    setIsLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      setUpcoming(data.results);
    }
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      setTopRated(data.results);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#092439" />
      <View style={{flex: 1}}>
        <Image
          blurRadius={50}
          style={{position: 'absolute', width: '100%', height: '100%'}}
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
              contentContainerStyle={{paddingBottom: 10}}>
              {/* Сейчас в тренде */}
              {trending.length > 0 && (
                <TrendingMovies data={trending} navigation={navigation} />
              )}

              {/* Будущие новинки */}
              {upcoming.length > 0 && (
                <MovieList
                  title="Будущие новинки"
                  data={upcoming}
                  navigation={navigation}
                />
              )}

              {/* Топ рейтинга */}
              {trending.length > 0 && (
                <MovieList
                  title="Топ рейтинга"
                  data={topRated}
                  navigation={navigation}
                />
              )}
            </ScrollView>
          )}
        </CustomDrawer>
      </View>
    </>
  );
}
