import {View, Text} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import MovieCard from '../CustomMovieCard/MovieCard';
import {width} from '../../../utils/global/getDimensions';

export default function TrendingMovies({data, navigation}) {
  const handleCardPress = item => {
    navigation.navigate('MovieScreen', item);
  };

  return (
    <View style={{marginBottom: 32}}>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Inter-Bold',
          fontSize: 20,
          lineHeight: 28,
          marginHorizontal: 16,
          marginBottom: 20,
          textShadowColor: 'rgba(226, 232, 240, 0.25)',
          textShadowOffset: {width: 0, height: 3},
          textShadowRadius: 4,
        }}>
        Сейчас в <Text style={{fontFamily: 'Inter-ExtraBold'}}>тренде</Text>
      </Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard
            item={item}
            handleCardPress={() => handleCardPress(item)}
          />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
}
