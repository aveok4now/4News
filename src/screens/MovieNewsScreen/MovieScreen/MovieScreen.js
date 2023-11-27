import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Icons } from '../../../components/Icons';
import { styles, theme } from '../theme';
import { width, height, ios } from '../../../utils/getDimensions';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../../../components/MovieNewsComponents/Cast';
import MovieList from '../../../components/MovieNewsComponents/MovieList';
import HeaderButtons from '../../../components/MovieNewsComponents/HeaderButtons';
import Loader from '../../../components/MovieNewsComponents/Loader';
import {
    fetchMovieCredits,
    fetchMovieDetails,
    fetchSimilarMovies,
    image500,
} from '../../../api/moviedb';

export default function MovieScreen({ navigation }) {
    const { params: item } = useRoute();

    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        console.log('itemid', item.id);
        setIsLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        console.log('data: ', data);
        if (data) setMovie(data);
        setIsLoading(false);
    };

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast);
        //setIsLoading(false);
    };

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        //console.log('similar: ', data)
        if (data && data.results) setSimilarMovies(data.results);
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1, backgroundColor: 'rgb(23 23 23)' }}>
            <View style={{ width: '100%' }}>
                <HeaderButtons navigation={navigation} />
                {isLoading ? (
                    <Loader />
                ) : (
                    <View style={{ flex: 1 }}>
                        <Image
                            source={{
                                uri: image500(movie?.poster_path),
                            }}
                            style={{ width: width, height: height * 0.55 }}
                        />
                        <LinearGradient
                            colors={[
                                'transparent',
                                'rgba(23, 23, 23, 0.8)',
                                'rgba(23, 23, 23, 1)',
                            ]}
                            style={{
                                width,
                                height: height * 0.4,
                                position: 'absolute',
                                bottom: 0,
                            }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        />
                    </View>
                )}
            </View>
            <View style={{ marginTop: -(height * 0.09), marginVertical: 12 }}>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Inter-ExtraBold',
                        fontSize: 30,
                        lineHeight: 36,
                        textShadowColor: 'rgba(226, 232, 240, 0.25)',
                        textShadowOffset: { width: 0, height: 3 },
                        textShadowRadius: 4,
                    }}>
                    {movie?.title}
                </Text>

                {movie?.id ? (
                    <Text
                        style={{
                            color: 'rgb(212 212 212)',
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 16,
                            lineHeight: 24,
                            textAlign: 'center',
                        }}>
                        {movie?.status === 'Released' ? 'Вышел' : movie?.status} •{' '}
                        {movie?.release_date?.split('-')[0]} • {movie?.runtime} мин
                    </Text>
                ) : null}

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginHorizontal: 16,
                        marginVertical: 16,
                    }}>
                    {movie?.genres?.map((genre, index) => {
                        let showDot = index + 1 != movie.genres.length;
                        return (
                            <Text
                                key={index}
                                style={{
                                    color: 'rgb(163 163 163)',
                                    fontFamily: 'Inter-Light',
                                    fontSize: 16,
                                    lineHeight: 24,
                                    textAlign: 'center',
                                }}>
                                {genre?.name.charAt(0).toUpperCase() + genre?.name.slice(1)}{' '}
                                {showDot && ' • '}
                            </Text>
                        );
                    })}
                </View>

                <Text
                    style={{
                        color: 'rgb(163 163 163)',
                        letterSpacing: 1,
                        marginHorizontal: 12,
                    }}>
                    {movie?.overview}
                </Text>
            </View>

            {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

            {similarMovies.length > 0 && (
                <MovieList
                    title="Похожее"
                    data={similarMovies}
                    hideSeeAll={true}
                    navigation={navigation}
                />
            )}

            {cast.length === 0 && similarMovies.length === 0 && !isLoading && (
                <Text style={{
                    fontFamily: 'Inter-Light',
                    fontSize: 20,
                    lineHeight: 28,
                    textAlign: 'center'
                }}>Кажется, информации пока нет 😰 </Text>
            )}
        </ScrollView>
    );
}
