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
import TrendingMoves from '../../components/MovieNewsComponents/TrendingMoves';
import MovieList from '../../components/MovieNewsComponents/MovieList';
import { ios } from '../../utils/getDimensions';

export default function MovieNewsScreen({ navigation }) {
    const [trending, setTrending] = useState([1, 2, 3]);
    const [upcoming, setUpcoming] = useState([1, 2, 3]);
    const [topRated, setTopRated] = useState([1, 2, 3]);

    let mainColor = 'rgb(49 46 129)';

    useEffect(() => {
        return () => {
            setStatusBarColor(mainColor);
        };
    }, []);

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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}>
                    {/* Сейчас в тренде */}
                    <TrendingMoves data={trending} navigation={navigation} />
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
            </CustomDrawer>
        </View>
    );
}
