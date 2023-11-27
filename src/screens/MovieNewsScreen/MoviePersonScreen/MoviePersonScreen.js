import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { width, height, ios } from '../../../utils/getDimensions';
import { theme } from '../theme';
import HeaderButtons from '../../../components/MovieNewsComponents/HeaderButtons';
import MovieList from '../../../components/MovieNewsComponents/MovieList';
import Loader from '../../../components/MovieNewsComponents/Loader';

export default function MoviePersonScreen({ person, navigation }) {
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);

    const [isLoading, setIsLoading] = useState(true);
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1, backgroundColor: 'rgb(17 24 39)' }}>
            <HeaderButtons navigation={navigation} />
            {isLoading ? (
                <Loader />

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
                                    uri: 'https://static.kinoafisha.info/k/persons/1080x1920/upload/persons/195010465372.jpg',
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
                            Леонардо ДиКаприо
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'Inter-Light',
                                color: 'rgb(163 163 163)',
                            }}>
                            Лос-Анджелес, Калифорния, США
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
                                Мужской
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
                                11 ноября, 1974
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
                                Известен как
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    fontFamily: 'Inter-Light',
                                    color: 'rgb(163 163 163)',
                                }}>
                                Актёр
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
                                87.5
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
                            Ex exercitation anim ipsum minim deserunt. Ipsum deserunt ad
                            deserunt ipsum. Pariatur et enim esse cupidatat id deserunt ex do
                            qui pariatur eu adipisicing Lorem. Fugiat esse reprehenderit eu
                            anim excepteur et irure. Minim anim est exercitation amet. Eiusmod
                            ex commodo tempor id nulla. Nisi voluptate est non sit deserunt
                            anim veniam laborum nisi. Sit non Lorem anim excepteur est esse
                            irure id commodo pariatur. Et ipsum Lorem commodo dolor elit anim
                            voluptate dolore sint ullamco. In excepteur aute enim occaecat
                            ipsum sunt et dolore. Voluptate fugiat aute nostrud ad occaecat
                            veniam nulla ex culpa cillum fugiat consectetur.Ut incididunt
                            excepteur excepteur laboris ut aliquip veniam adipisicing laborum
                            duis consectetur esse pariatur. Irure ullamco minim cupidatat
                            aliqua ea ad aliqua cillum esse. Quis do duis veniam ut quis est
                            cillum magna cupidatat ad anim. Ad ullamco enim occaecat qui.
                            Excepteur dolore quis ex irure veniam non incididunt.
                        </Text>
                    </View>

                    <MovieList
                        title="Фильмы"
                        data={personMovies}
                        navigation={navigation}
                        hideSeeAll={true}
                    />
                </View>
            )}
        </ScrollView>
    );
}
