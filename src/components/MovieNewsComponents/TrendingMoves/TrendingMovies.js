import { View, Text } from 'react-native';
import React from 'react';
import { assets } from '../../../../react-native.config';
import { styles } from '../../../screens/MovieNewsScreen/theme';
import Carousel from 'react-native-snap-carousel';
import MovieCard from '../../customs/CustomMovieCard/MovieCard';
import { width } from '../../../utils/getDimensions';

export default function TrendingMovies({ data, navigation }) {

    const handleCardPress = (item) => {
        navigation.navigate('MovieScreen', item);
    }

    return (
        <View style={{ marginBottom: 32 }}>
            <Text
                style={{
                    color: 'white',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 20,
                    lineHeight: 28,
                    marginHorizontal: 16,
                    marginBottom: 20,
                }}>
                Сейчас в{' '}
                <Text style={{ fontFamily: 'Inter-ExtraBold' }}>
                    тренде
                </Text>
            </Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleCardPress={() => handleCardPress(item)} />}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}

            />
        </View>
    );
}
