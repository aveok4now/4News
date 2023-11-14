import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { assets } from '../../../react-native.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalPopup from '../customs/CustomModal/CustomModal';
import CustomButton from '../customs/CustomButton';
import useUserCredentials from '../../utils/useUserCredentials';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Icons } from '../Icons';
import { theme } from '../../screens/WeatherScreen/theme';
import Share from 'react-native-share';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Card = ({ item, navigation }) => {
    const defaultImage =
        'https://arbeitgeber.de/wp-content/uploads/2020/11/bda-news-header-1920x1280px-1536x1024.jpg';

    //console.log(item);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageUrl = item.urlToImage || defaultImage;

    const [isLiked, setIsLiked] = useState(false);
    const [isShared, setIsShared] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showShimmer, setshowShimmer] = useState(false);

    let getSaved = AsyncStorage.getItem('savedNewsItems');
    let identify = useUserCredentials();

    let includesG = item.url.includes('https://news.google.com/');

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleLike = async () => {
        setIsLiked(!isLiked);
        try {
            if (identify == 'Гость') {
                setShowModal(!showModal);
                setIsLiked(false);
                return;
            }
            const savedNewsItems = await AsyncStorage.getItem('savedNewsItems');
            const parsedSavedNewsItems = JSON.parse(savedNewsItems) || [];

            const isAlreadySaved = parsedSavedNewsItems.some(
                savedItem => savedItem.url === item.url,
            );

            if (!isAlreadySaved) {
                parsedSavedNewsItems.push(item);
                await AsyncStorage.setItem(
                    'savedNewsItems',
                    JSON.stringify(parsedSavedNewsItems),
                );
                console.log('saved');
            }
            const likedNewsItems = await AsyncStorage.getItem('likedNewsItems');
            const parsedLikedNewsItems = JSON.parse(likedNewsItems) || [];

            if (isLiked) {
                const updatedLikedNewsItems = parsedLikedNewsItems.filter(
                    likedItem => likedItem.url !== item.url,
                );
                await AsyncStorage.setItem(
                    'likedNewsItems',
                    JSON.stringify(updatedLikedNewsItems),
                );
            } else {
                parsedLikedNewsItems.push(item);
                await AsyncStorage.setItem(
                    'likedNewsItems',
                    JSON.stringify(parsedLikedNewsItems),
                );
            }
        } catch (error) {
            console.error('Error saving news item:', error);
        }
    };


    const handleShare = async ({ url, newsTitle }) => {
        console.log(url)
        const options = {
            title: 'Поделиться новостью',
            message: `📰 Новость с приложения 4News\n\n${newsTitle}\n\n`,
            url: url
        }
        Share.open(options)
            .then(res => console.log(res))
            .catch(
                err => console.log(err)
            )
    }

    useEffect(() => {
        const checkLiked = async () => {
            const likedNewsItems = await AsyncStorage.getItem('likedNewsItems');
            const parsedLikedNewsItems = JSON.parse(likedNewsItems) || [];
            const isAlreadyLiked = parsedLikedNewsItems.some(
                likedItem => likedItem.url === item.url,
            );
            setIsLiked(isAlreadyLiked);
        };

        checkLiked();
    }, []);

    const onOk = () => {
        navigation.navigate('Добро пожаловать !', { status: 'logout' });
    };

    const today = new Date();
    const publishedDate = new Date(item.publishedAt);

    const diffInDays = (today - publishedDate) / (1000 * 60 * 60 * 24);

    const time = publishedDate.toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
    });

    let formattedDate;
    if (diffInDays < 1) {
        formattedDate = 'Сегодня в' + time;
    } else if (diffInDays < 2) {
        formattedDate = 'Вчера в ' + time;
    } else if (diffInDays < 3) {
        formattedDate = 'Позавчера в ' + time;
    } else {
        formattedDate = publishedDate.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
        });
    }

    return item.title.includes('Removed') ? null : (
        <LinearGradient
            // colors={['#8BC6EC', '#9599E2']}
            // start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
            // colors={['#D8B5FF', '#1EAE98']}
            // start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
            // colors={['#4E65FF', '#92EFFD']}
            // start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
            //colors={['#764BA2', '#667EEA']}
            //colors={['rgb(59, 130, 246)', 'rgb(37, 99, 235)']}
            colors={['rgb(15 23 42)', 'rgb(56 189 248)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <Animatable.View style={styles.card} animation="fadeIn" duration={1500}>
                {!imageLoaded && !item.imageUrl === null ? (
                    <ShimmerPlaceHolder
                        visible={imageLoaded}
                        style={[styles.image, { width: 'inherit' }]}
                        shimmerColors={['#564d4d', '#8e8e8e', '#564d4d']}
                    />
                ) : (
                    <Animatable.Image
                        animation="fadeInLeft"
                        duration={1000}
                        source={{ uri: imageUrl }}
                        style={[
                            styles.image,
                            {
                                opacity: imageLoaded ? 1 : 0,
                            },
                            styles.shadowProp,
                            { shadowOpacity: 0.8 },
                        ]}
                        onLoad={handleImageLoad}
                        resizeMethod="resize"
                    />
                )}

                <View style={styles.titleView}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description || ''}</Text>
                    <View
                        style={[
                            styles.podcard,
                            item.author && item.author.length > 40
                                ? { flexDirection: 'column', alignItems: 'flex-start' }
                                : null,
                        ]}>
                        <Text style={styles.description}>{item.author || ''} </Text>
                        <Text style={styles.description}>
                            {formattedDate}
                            {/* {' '}
                                {new Date(item.publishedAt).toLocaleString('ru-RU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    // second: '2-digit',
                                    timeZone: 'UTC',
                                })} */}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            disabled={includesG}
                            style={[
                                styles.more,
                                { opacity: includesG ? 0 : 1 },
                                styles.shadowProp,
                            ]}
                            onPress={() =>
                                navigation.navigate('NewsViewer', {
                                    url: item.url,
                                })
                            }>
                            <Text style={styles.moreText}>Подробнее</Text>
                            <Icon
                                name="arrow-right"
                                size={20}
                                color="white"
                                style={{ marginLeft: 8 }}
                            />
                        </TouchableOpacity>

                        <View
                            style={[
                                styles.more,
                                {
                                    //backgroundColor: isLiked ? '#DA2C38' : '#301315',
                                    paddingHorizontal: 5,
                                    //paddingVertical: 0,
                                    width: 'auto',
                                    flexWrap: 'wrap',
                                },
                                styles.shadowProp,
                            ]}>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10 }}
                                onPress={handleLike}>
                                <Icon
                                    name={isLiked ? 'heart' : 'heart-o'}
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                                <Icons.Fontisto
                                    name={isLiked ? 'comment' : 'commenting'}
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingHorizontal: 10 }}
                                onPress={() => handleShare({
                                    url: item.url,
                                    newsTitle: item.title
                                })}
                            >
                                <Icon
                                    name={isLiked ? 'send' : 'send-o'}
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.source}>
                    <Text style={styles.sourceText}>Источник: {item.source.name}</Text>
                </View>
                {showModal ? (
                    <View style={{ flex: 1 }}>
                        {/* {Alert.alert()} */}
                        <ModalPopup
                            navigation={navigation}
                            visible={showModal}
                            route="popup">
                            <View>
                                <Text style={styles.popUpText}>
                                    Чтобы добавлять новости в избранное, пожалуйста, войдите или
                                    зарегестрируйтесь 🥰
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        marginTop: 15,
                                    }}>
                                    <CustomButton text="ОК" onPress={() => onOk()} />
                                    <CustomButton
                                        type="Tertiary"
                                        text="Отмена"
                                        onPress={() => setShowModal(false)}
                                    />

                                    {/* <Text style={{ fontFamily: "Inter-ExtraBold" }}>ОК</Text> */}
                                </View>
                            </View>
                        </ModalPopup>
                    </View>
                ) : null}
            </Animatable.View>
        </LinearGradient>
    );
};

export default Card;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    card: {
        // flex: 1,
        position: 'relative',
        // height: 200,
        // width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 14,
        marginBottom: 4,
        // marginBottom: 15,
        // marginTop: 15,
        elevation: 0,
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
        borderWidth: 0.15,
        borderColor: 'rgb(156 163 175)',
    },
    image: {
        flex: 1,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 7,
    },
    loader: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
        color: 'red',
    },
    titleView: {
        paddingHorizontal: 2,
        marginVertical: 2,
    },
    title: {
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'justify',
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        // letterSpacing: -0.25
    },
    description: {
        fontSize: 12,
        lineHeight: 16,
        marginVertical: 4,
        color: '#E2E2E2',
        //fontWeight: '700',
        fontFamily: 'Inter-SemiBold',
    },

    source: {
        position: 'absolute',
        top: '3.75%',
        right: '1%',
        backgroundColor: 'rgb(8 47 73)',
        borderRadius: 8,
        padding: 5,
    },

    // like: {
    //     position: 'absolute',
    //     top: '5.5%',
    //     left: '2%',
    // },

    sourceText: {
        color: '#F7F6C5',
        //fontWeight: '500',
        fontFamily: 'Inter-ExtraLight',
    },
    podcard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 2,
    },
    more: {
        backgroundColor: theme.bgWhite(0.),
        borderRadius: 10,
        //backgroundColor: 'rgb(30 64 175)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '33%',
        textAlign: 'center',
        marginTop: 10,
        //borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //elevation: 1,
    },

    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    moreText: {
        //fontWeight: '700',
        color: 'white',
        fontFamily: 'Inter-ExtraBold',
    },

    popUpText: {
        fontFamily: 'Inter-Light',
        fontSize: 18,
        textAlign: 'center',
    },
});
