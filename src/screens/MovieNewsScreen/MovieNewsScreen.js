import {
    View,
    Text,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { setStatusBarColor } from '../../utils/StatusBarManager';
import CustomDrawer from '../../components/customs/CustomDrawer';
import TrendingMovies from '../../components/MovieNewsComponents/TrendingMovies';
import MovieList from '../../components/MovieNewsComponents/MovieList';
import { ios } from '../../utils/getDimensions';
import Loader from '../../components/MovieNewsComponents/Loader';
import {
    fetchTrendingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
} from '../../api/moviedb';

export default function MovieNewsScreen({ navigation }) {
    const [trending, setTrending] = useState([1, 2, 3]);
    const [upcoming, setUpcoming] = useState([1, 2, 3]);
    const [topRated, setTopRated] = useState([1, 2, 3]);
    const [isLoading, setIsLoading] = useState(true);

    let mainColor = 'rgb(49 46 129)';

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        return () => {
            setStatusBarColor(mainColor);
        };
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        console.log('TrendingData: ' + data);

        if (data && data.results) setTrending(data.results);
        setIsLoading(false)
    };

    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        console.log('UpComingData: ' + data);

        if (data && data.results) setUpcoming(data.results);
        setIsLoading(false)
    };

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        console.log('topRatedData: ' + data);

        if (data && data.results) setTopRated(data.results);
        setIsLoading(false)
    };

    return (
        <View style={{ flex: 1, backgroundColor: mainColor }}>
            <CustomDrawer
                type="Новости Кино"
                fontFamily="Inter-ExtraBold"
                letterSpacing={1}
                showBorder={true}
                showSearch="true"
                navigation={navigation}
                destination="MovieSearchScreen">
                {/* <SafeAreaView style={{ marginBottom: ios ? -8 : 16 }}>
                    <StatusBar style="light" />
                </SafeAreaView> */}
                {isLoading ? (
                    <Loader />
                ) : (
                    <ScrollView
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
    );
}
