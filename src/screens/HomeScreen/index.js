import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar,
    RefreshControl,
} from 'react-native';
import Card from '../../components/Card';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';
import CustomDrawer from '../../components/customs/CustomDrawer';
import { theme } from '../WeatherScreen/theme';
import * as Progress from 'react-native-progress';
import FloatingButton from '../../components/customs/FloatingButton';
import CustomCarousel from '../../components/customs/CustomCarousel';
import { apiKeyList } from '../../utils/apiKeys/newsApiKeys';
import { width } from '../../utils/global/getDimensions';
import newsBackgroundImage from '../../../assets/images/newsoverview.jpg'

const HomeScreen = ({ navigation }) => {
    const [isFetchingError, setIsFetchingError] = useState(false);
    const [Loading, setIsLoading] = useState(false);
    const [Data, setData] = useState([]);

    const [Select, setSelect] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [showFloatingButton, setShowFloatingButton] = useState(false);

    const [prevScrollPosition, setPrevScrollPosition] = useState(0);
    const [isScrolledToTop, setIsScrolledToTop] = useState(true);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    const [isConnected, setIsConnected] = useState(false);
    const [showConnectionStatus, setShowConnectionStatus] = useState(false);
    const [wasProblem, setWasProblem] = useState(false);
    const [canBeShowed, setCanBeShowed] = useState(false);

    const flatListRef = useRef(null);

    const [Category, SetCategory] = useState([
        {
            id: 1,
            name: 'Top Headlines',
            nameRU: 'Главное',
            category: 'general',
        },
        {
            id: 5,
            name: 'Sports',
            nameRU: 'Спорт',
            category: 'sports',
        },
        {
            id: 2,
            name: 'Business',
            nameRU: 'Бизнес',
            category: 'business',
        },
        {
            id: 3,
            name: 'Entertainment',
            nameRU: 'Развлечения',
            category: 'entertainment',
        },
        {
            id: 4,
            name: 'Health',
            nameRU: 'Здоровье',
            category: 'health',
        },
        {
            id: 6,
            name: 'Science',
            nameRU: 'Наука',
            category: 'science',
        },
        {
            id: 7,
            name: 'Technology',
            nameRU: 'Технологии',
            category: 'technology',
        },
    ]);

    let apiKeyIndex = 0;

    const fetchDataByCountry = async (country, category) => {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKeyList[apiKeyIndex]}&category=${category}`,
        );
        if (response.status === 429) {
            apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
            return fetchDataByCountry(country, category);
        }
        return response.json();
    };

    const getData = async () => {
        try {
            setIsLoading(true);

            const ruData = await fetchDataByCountry('ru', Category[Select].category);
            const usData = await fetchDataByCountry('us', Category[Select].category);

            const combinedData = [...ruData.articles, ...usData.articles];

            combinedData.sort(() => Math.random() - 0.5);
            setData(combinedData);
            setIsRefreshing(false);
            setIsLoading(false);
        } catch (error) {
            console.log('Error in getData:', error);
            setIsFetchingError(true);
            setIsRefreshing(false);
        }
    };

    const getData2 = async category => {
        try {
            //setIsLoading(true);

            const ruData = await fetchDataByCountry('ru', category);
            const usData = await fetchDataByCountry('us', category);

            const combinedData = [...ruData.articles, ...usData.articles];

            combinedData.sort(() => Math.random() - 0.5);
            setData(combinedData);
            setIsRefreshing(false);
            setIsLoading(false);
        } catch (error) {
            console.log('Error in getData2:', error);
            setIsFetchingError(true);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            if (state.isConnected == true) {
                getData();
                setShowConnectionStatus(true);
                setTimeout(() => {
                    setShowConnectionStatus(false);
                }, 2000);
            } else {
                setWasProblem(true);
            }
        });
        getData();

        return () => {
            unsubscribe();
        };
    }, []);

    const onRefresh = () => {
        setIsRefreshing(true);
        getData();
    };

    const handleAnimEnd = () => {
        setTimeout(() => {
            setCanBeShowed(true);
        }, 1500);
    };

    return (
        <>
            <StatusBar backgroundColor="#092439" />
            {!isConnected ? (
                <Animatable.View
                    animation="fadeInDown"
                    duration={1000}
                    style={[styles.infoToast, { backgroundColor: 'red' }]}>
                    <Text style={{ fontFamily: 'Inter-Light' }}>
                        Отсутствует интернет-соединение
                    </Text>
                </Animatable.View>
            ) : (
                showConnectionStatus &&
                wasProblem && (
                    <Animatable.View
                        animation="fadeInDown"
                        onAnimationEnd={handleAnimEnd}
                        duration={1000}
                        style={[styles.infoToast, { backgroundColor: 'green' }]}>
                        <Text style={{ fontFamily: 'Inter-Light' }}>
                            Подключение установлено!
                        </Text>
                    </Animatable.View>
                )
            )}

            {Loading ? (
                <View style={styles.load}>
                    <Image
                        blurRadius={100}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        source={newsBackgroundImage}
                    />
                    <Progress.CircleSnail thickness={10} size={140} color="white" />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <Image
                        blurRadius={200}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        source={newsBackgroundImage}
                    />
                    <CustomDrawer
                        type="Новости"
                        showSearch="true"
                        showBorder={true}
                        fontFamily="Inter-ExtraBold"
                        letterSpacing={1}
                        navigation={navigation}>
                        <View style={{ flex: 1 }}>
                            <Animatable.View
                                animation="fadeIn"
                                duration={1500}
                                style={styles.horList}>
                                <FlatList
                                    contentContainerStyle={{ paddingHorizontal: 10 }}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    data={Category}
                                    bounces={false}
                                    initialScrollIndex={0}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                style={
                                                    index == Select
                                                        ? styles.selListItem
                                                        : styles.horListItem
                                                }
                                                onPress={() => {
                                                    setSelect(index);
                                                    getData2(Category[index].category);
                                                    flatListRef.current.scrollToIndex({
                                                        index: 0,
                                                        animated: true,
                                                    });
                                                }}>
                                                <Text
                                                    style={
                                                        index == Select
                                                            ? styles.selListText
                                                            : styles.horListText
                                                    }>
                                                    {item.nameRU}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            </Animatable.View>

                            <View style={{ flex: 1 }}>
                                <View style={{ height: Dimensions.get('window').height * 0.78 }}>
                                    <FlatList
                                        ref={flatListRef}
                                        style={{ flex: 1, zIndex: 100, position: 'relative' }}
                                        showsVerticalScrollIndicator={false}
                                        scrollEventThrottle={16}
                                        refreshControl={
                                            <RefreshControl
                                                colors={['white']}
                                                refreshing={isRefreshing}
                                                progressBackgroundColor={'rgb(2 132 199)'}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                        data={Data}
                                        onScroll={event => {
                                            const currentScrollPosition =
                                                event.nativeEvent.contentOffset.y;
                                            setShowFloatingButton(
                                                currentScrollPosition < prevScrollPosition ||
                                                (isScrolledToBottom &&
                                                    currentScrollPosition > prevScrollPosition),
                                            );
                                            setPrevScrollPosition(currentScrollPosition);
                                            setIsScrolledToTop(currentScrollPosition === 0);

                                            const windowHeight = Dimensions.get('window').height;
                                            const contentHeight =
                                                event.nativeEvent.contentSize.height;
                                            const isBottomReached =
                                                currentScrollPosition + windowHeight >= contentHeight;
                                            setIsScrolledToBottom(isBottomReached);
                                        }}
                                        onEndReached={() => setIsScrolledToBottom(true)}
                                        ListHeaderComponent={React.memo(() => (
                                            <View>
                                                <Image
                                                    blurRadius={70}
                                                    style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                    source={newsBackgroundImage}
                                                />

                                                <CustomCarousel
                                                    apiKeyList={apiKeyList}
                                                    apiKeyIndex={apiKeyIndex}
                                                    navigation={navigation}
                                                />
                                            </View>
                                        ))}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <Card
                                                    item={item}
                                                    navigation={navigation}
                                                    data={Data}
                                                    needMargin={false}
                                                />
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                            {showFloatingButton && !isScrolledToTop && Data.length > 0 && (
                                <FloatingButton
                                    onPress={() => {
                                        flatListRef.current.scrollToOffset({
                                            offset: 0,
                                            animated: true,
                                        });
                                    }}
                                />
                            )}
                        </View>
                    </CustomDrawer>
                </View>
            )}
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        paddingHorizontal: 20,
    },
    load: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    horList: {
        //paddingHorizontal: 10,
        width: width,
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },

    horListItem: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 12,
        borderRadius: 24,
        borderColor: 'rgb(156 163 175)',
        backgroundColor: theme.bgWhite(0.15),
        borderWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
    },

    selListItem: {
        backgroundColor: theme.bgWhite(0.35),
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 12,
        borderRadius: 24,
        borderColor: '#c7d2fe',
        borderWidth: 0.75,
    },

    horListText: {
        color: 'rgb(203 213 225)',
        fontFamily: 'Inter-Bold',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 2,
    },

    selListText: {
        fontFamily: 'Inter-ExtraBold',
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },

    infoToast: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        elevation: 5,
    },
});
