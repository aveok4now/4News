import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { width, height, ios } from '../../../utils/getDimensions';
import { theme } from '../theme';
import HeaderButtons from '../../../components/MovieNewsComponents/HeaderButtons';
import MovieList from '../../../components/MovieNewsComponents/MovieList';
import Loader from '../../../components/MovieNewsComponents/Loader';
import { useRoute } from '@react-navigation/native';
import { fetchPersonDetails, image342 } from '../../../api/moviedb';


export default function MoviePersonScreen({ navigation }) {
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const { params: item } = useRoute();

    useEffect(() => {
        setIsLoading(true);
        getPersonDetails(item.id);
    }, [item]);

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        console.log(data);
        if (data) setPerson(data);
        setIsLoading(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const months = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];

        return `${day} ${months[monthIndex]}, ${year}`;
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1, backgroundColor: 'rgb(17 24 39)' }}>
            <HeaderButtons navigation={navigation} />
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Loader />
                </View>
            ) : (
                <View style={{ marginTop: 64, backgroundColor: 'transparent' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                                borderRadius: 999,
                                overflow: 'hidden',
                                height: 288,
                                width: 288,
                                borderWidth: 1,
                                borderColor: theme.background,
                                elevation: 5,
                                shadowColor: 'white',
                                shadowRadius: 140,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1,
                                elevation: 15,
                            }}>
                            <Image
                                style={{ height: height * 0.43, width: width * 0.74 }}
                                source={{
                                    uri: image342(person?.profile_path),
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 24 }}>
                        <Text
                            style={{
                                fontSize: 24,
                                lineHeight: 32,
                                textAlign: 'center',
                                fontFamily: 'Inter-ExtraBold',
                                color: 'white',
                                textShadowColor: 'rgba(226, 232, 240, 0.25)',
                                textShadowOffset: { width: 0, height: 3 },
                                textShadowRadius: 4,
                            }}>
                            {person?.name}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'Inter-Light',
                                color: 'rgb(163 163 163)',
                            }}>
                            {person?.place_of_birth}
                        </Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 16,
                            flexDirection: 'row',
                        }}
                        style={{
                            marginTop: 24,
                            marginHorizontal: 12,
                            backgroundColor: theme.bgWhite(0.1),
                            borderRadius: 16,
                        }}>
                        <View
                            style={{
                                borderRightWidth: 2,
                                borderRightColor: 'rgb(163 163 163)',
                                paddingHorizontal: 8,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                    fontFamily: 'Inter-SemiBold',
                                    color: 'white',
                                }}>
                                Пол
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    fontFamily: 'Inter-Light',
                                    color: 'rgb(163 163 163)',
                                }}>
                                {
                                    person?.gender === 1 ? 'Женский' : 'Мужской'
                                }
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRightWidth: 2,
                                borderRightColor: 'rgb(163 163 163)',
                                paddingHorizontal: 8,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                    fontFamily: 'Inter-SemiBold',
                                    color: 'white',
                                }}>
                                Дата рождения
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    fontFamily: 'Inter-Light',
                                    color: 'rgb(163 163 163)',
                                }}>
                                {formatDate(person?.birthday)}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRightWidth: 2,
                                borderRightColor: 'rgb(163 163 163)',
                                paddingHorizontal: 8,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                    fontFamily: 'Inter-SemiBold',
                                    color: 'white',
                                }}>
                                {person?.gender === 1 ? 'Известна как' : 'Известен как'}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    fontFamily: 'Inter-Light',
                                    color: 'rgb(163 163 163)',
                                }}>
                                {person?.known_for_department === 'Acting' ? person?.gender === 1 ? 'Актриса' : 'Актёр' : person?.known_for_department}
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 8,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                    fontFamily: 'Inter-SemiBold',
                                    color: 'white',
                                }}>
                                Рейтинг
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    fontFamily: 'Inter-Light',
                                    color: 'rgb(163 163 163)',
                                }}>
                                {person?.popularity ? person.popularity.toFixed(1) : ''}
                            </Text>
                        </View>
                    </ScrollView>
                    <View
                        style={{ marginVertical: 24, marginHorizontal: 16, marginTop: 8 }}>
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'Inter-ExtraBold',
                                fontSize: 20,
                                lineHeight: 28,
                                textShadowColor: 'rgba(226, 232, 240, 0.25)',
                                textShadowOffset: { width: 0, height: 3 },
                                textShadowRadius: 4,
                            }}>
                            Биография
                        </Text>
                        <Text
                            style={{
                                color: 'rgb(212 212 212)',
                                fontFamily: 'Inter-Light',
                                letterSpacing: 0.25,
                            }}>
                            {person?.biography}
                        </Text>
                    </View>

                    {/* <MovieList
                        title="Фильмы"
                        data={personMovies}
                        navigation={navigation}
                        hideSeeAll={true}
                    /> */}
                </View>
            )}
        </ScrollView>
    );
}
