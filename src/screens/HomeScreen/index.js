import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    Image,
    StatusBar,
    TouchableHighlight,
    Animated,
} from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';
import CategoryComp from '../../components/Category/CategoryComp';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import CustomDrawer from '../../components/customs/CustomDrawer';
import {
    setStatusBarColor,
    resetStatusBarColor,
} from '../../utils/StatusBarManager';
import { theme } from '../WeatherScreen/theme';
import * as Progress from 'react-native-progress';
import FloatingButton from '../../components/customs/FloatingButton';
import CustomCarousel from '../../components/customs/CustomCarousel';

const HomeScreen = ({ navigation }) => {
    // setTimeout(() => {
    //     setStatusBarColor('#0f172a');
    // }, 1000);
    const [isFetchingError, setIsFetchingError] = useState(false);
    const [Loading, setIsLoading] = useState(false);
    const [Data, setData] = useState([]);
    const [Select, setSelect] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

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

    const apiKeyList = [
        'ef0cca7fb1924225a4c6c42e0f32924b',
        'abc3f76eb9ec4195b35c7c5b3771a40b',
        '5bb375e99be54883b8b9aee7001fc660',
        '2c7f28792cc64ca699bfd3bbf2768105',
    ];
    let apiKeyIndex = 0;

    const [isConnected, setIsConnected] = useState(false);
    const [showConnectionStatus, setShowConnectionStatus] = useState(false);

    const getData = async () => {
        try {
            setIsLoading(true);
            const ruResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&category=${Category[Select].category}`,
            );

            if (ruResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData();
                return;
                //throw new Error(`RuResponse Error: ${ruResponse.status}`);
            }

            const ruData = await ruResponse.json();

            const usResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&category=${Category[Select].category}`,
            );

            if (usResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData();
                return;
                //throw new Error(`UsResponse Error: ${usResponse.status}`);
            }

            const usData = await usResponse.json();

            const combinedData = [...ruData.articles, ...usData.articles];

            combinedData.sort(() => Math.random() - 0.5);
            //console.log(combinedData)
            setData(combinedData);
            setIsRefreshing(false);
            //console.log(combinedData)
            //apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.lrength;
            setIsLoading(false);
        } catch (error) {
            console.error('Error in getData:', error);
            setIsFetchingError(true);
            setIsRefreshing(false);
        }
    };

    const getData2 = async category => {
        try {
            //setIsLoading(true)
            const ruResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&category=${category}`,
            );

            if (ruResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData2();
                return;
                //throw new Error(`RuResponse Error: ${ruResponse.status}`);
            }

            const ruData = await ruResponse.json();

            const usResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&category=${category}`,
            );

            if (usResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData2();
                return;
                //throw new Error(`UsResponse Error: ${usResponse.status}`);
            }

            const usData = await usResponse.json();
            const combinedData = [...ruData.articles, ...usData.articles];

            combinedData.sort(() => Math.random() - 0.5);

            setData(combinedData);
            setIsRefreshing(false);
            //apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
            setIsLoading(false);
        } catch (error) {
            console.error('Error in getData2:', error);
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

    const [canBeShowed, setCanBeShowed] = useState(false);
    const handleAnimEnd = () => {
        setTimeout(() => {
            setCanBeShowed(true);
        }, 1500);
    };

    const flatListRef = useRef(null);

    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);
    const [isScrolledToTop, setIsScrolledToTop] = useState(true);

    const [showTabBar, setShowTabBar] = useState(true);



    return (
        <>
            <StatusBar backgroundColor="transparent" />
            {!isConnected ? (
                <Animatable.View
                    animation="fadeInDown"
                    duration={1000}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red',
                    }}>
                    <Text style={{ fontFamily: 'Inter-Light' }}>
                        Отсутствует интернет-соединение
                    </Text>
                </Animatable.View>
            ) : (
                showConnectionStatus && (
                    <Animatable.View
                        animation="fadeInDown"
                        onAnimationEnd={handleAnimEnd}
                        duration={1000}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'green',
                            flex: 2,
                            zIndex: 1,
                        }}>
                        <Text style={{ fontFamily: 'Inter-Light' }}>
                            Подключение установлено!
                        </Text>
                    </Animatable.View>
                )
            )}

            {/* TODO: Lottie */}
            {Loading ? (
                // <View style={styles.load}>
                //     <ActivityIndicator color={'#754da6'} size={36}></ActivityIndicator>
                // </View>
                <View style={styles.load}>
                    <Progress.CircleSnail thickness={10} size={140} color="white" />
                </View>
            ) : (
                canBeShowed && (
                    <View style={{ flex: 1 }}>
                        <Image
                            blurRadius={200}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                            source={require('../assets/images/newsoverview.jpg')}
                        />
                        <CustomDrawer
                            type="Новости"
                            showSearch="true"
                            showBorder={true}
                            //backgroundColor="#4361ee"
                            //backgroundColor="#0ea5e9"
                            fontFamily='Inter-ExtraBold'
                            letterSpacing={1}
                            navigation={navigation}>
                            <View style={{ flex: 1 }}>
                                {/* <Header navigation={navigation} /> */}

                                <Animatable.View
                                    animation="fadeIn"
                                    duration={1500}
                                    style={styles.horList}>
                                    <FlatList
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


                                <View style={{ flex: 2 }}>
                                    <View style={{ height: Dimensions.get('window').height * 0.78 }}>
                                        <FlatList
                                            ref={flatListRef}
                                            style={{ flex: 1, zIndex: 100, position: 'relative' }}
                                            showsVerticalScrollIndicator={false}
                                            scrollEventThrottle={16}
                                            onRefresh={onRefresh}
                                            refreshing={isRefreshing}
                                            data={Data}
                                            onScroll={event => {
                                                const currentScrollPosition = event.nativeEvent.contentOffset.y;
                                                setShowFloatingButton(currentScrollPosition < prevScrollPosition);
                                                setPrevScrollPosition(currentScrollPosition);
                                                setIsScrolledToTop(currentScrollPosition === 0);
                                            }}
                                            ListHeaderComponent={() => (
                                                <View style={{ flex: 3 }}>
                                                    <Image
                                                        blurRadius={200}
                                                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                                                        source={require('../assets/images/newsoverview.jpg')}
                                                    />
                                                    <CustomCarousel apiKeyList={apiKeyList} apiKeyIndex={apiKeyIndex} navigation={navigation} />

                                                </View>
                                            )}
                                            renderItem={({ item, index }) => {
                                                return <Card item={item} navigation={navigation} data={Data} />;
                                            }}
                                        />
                                    </View>
                                </View>
                                {showFloatingButton && !isScrolledToTop && Data.length > 0 && (
                                    <FloatingButton
                                        onPress={() =>
                                            flatListRef.current.scrollToOffset({
                                                offset: 0,
                                                animated: true,
                                            })
                                        }
                                    />
                                )}
                            </View>
                        </CustomDrawer>
                    </View>
                )
            )}

            {/* <Tab.Navigator screenOptions={screenOptions} initialRouteName='Домашняя страница'>
                <Tab.Screen name="Домашняя страница" component={HomeScreen} />
                <Tab.Screen name="Добро пожаловать !" component={SignInScreen} />
            </Tab.Navigator> */}
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
        backgroundColor: 'transparent',
    },

    horList: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#0284c7',
        borderWidth: 0.5,
        borderColor: 'rgb(156 163 175)',
    },

    horListItem: {
        //backgroundColor: '#8EBBF3',
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
        //fontWeight: '500',
        color: 'rgb(203 213 225)',
        fontFamily: 'Inter-Bold',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 2,
    },

    selListText: {
        //fontWeight: 'bold',
        fontFamily: 'Inter-ExtraBold',
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
});
