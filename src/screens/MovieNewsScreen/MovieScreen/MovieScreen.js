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

export default function MovieScreen({ navigation }) {
    const { params: item } = useRoute();

    const [cast, setCast] = useState([1, 2, 3, 4, 5]);
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);

    useEffect(() => {
        // API CALL
    }, [item]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1, backgroundColor: 'rgb(23 23 23)' }}>
            <View style={{ width: '100%' }}>
                <HeaderButtons navigation={navigation} />
                <View style={{ flex: 1 }}>
                    <Image
                        source={{
                            uri: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/617303b7-cfa7-4273-bd1d-63974bf68927/600x900',
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
                    Остров проклятых
                </Text>
                <Text
                    style={{
                        color: 'rgb(212 212 212)',
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 16,
                        lineHeight: 24,
                        textAlign: 'center',
                    }}>
                    Год производства • 2004 • 150 мин
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginHorizontal: 16,
                        marginVertical: 16,
                    }}>
                    <Text
                        style={{
                            color: 'rgb(163 163 163)',
                            fontFamily: 'Inter-Light',
                            fontSize: 16,
                            lineHeight: 24,
                            textAlign: 'center',
                        }}>
                        Драма • Психология • Триллер
                    </Text>
                </View>

                <Text
                    style={{
                        color: 'rgb(163 163 163)',
                        letterSpacing: 1,
                        marginHorizontal: 12,
                    }}>
                    Quis dolore aliqua do ut. Culpa occaecat exercitation esse mollit sunt
                    sunt nulla aute anim. Consectetur proident quis non occaecat dolor.
                    Irure enim laboris laboris duis in dolor. Veniam adipisicing anim anim
                    labore nulla officia eiusmod ea ea sit id cillum. Amet nulla aliqua
                    incididunt culpa fugiat amet magna.
                </Text>
            </View>

            <Cast cast={cast} navigation={navigation} />

            <MovieList
                title="Похожее"
                data={similarMovies}
                hideSeeAll={true}
                navigation={navigation}
            />
        </ScrollView>
    );
}
