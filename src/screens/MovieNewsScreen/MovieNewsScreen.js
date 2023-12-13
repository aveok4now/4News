import {View, StatusBar, ScrollView, Image} from 'react-native';
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

  let mainColor = 'rgb(49 46 129)';

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log('TrendingData: ' + data);

    if (data && data.results) {
      setTrending(data.results);
    }
    setIsLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log('UpComingData: ' + data);

    if (data && data.results) {
      setUpcoming(data.results);
    }
    setIsLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log('topRatedData: ' + data);

    if (data && data.results) {
      setTopRated(data.results);
    }
    setIsLoading(false);
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
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 10}}>
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
