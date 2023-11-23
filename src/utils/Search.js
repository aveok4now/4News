import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import RadialGradient from 'react-native-radial-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Card from '../components/Card';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import { theme } from '../screens/WeatherScreen/theme';
import { setStatusBarColor, resetStatusBarColor } from './StatusBarManager';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { apiKeyList } from './apiKeys/newsApiKeys';
import * as Progress from 'react-native-progress';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Search = ({ navigation }) => {
    //const navigation = useNavigation();

    const isFocusedScreen = useIsFocused();

    useEffect(() => {
        if (isFocusedScreen) {
            setStatusBarColor('#2e408a');
        } else {
            resetStatusBarColor();
        }

        return () => {
            // Сброс цвета statusBar при размонтировании компонента
            resetStatusBarColor();
        };
    }, [isFocusedScreen]);

    const [SearchText, setSearchText] = useState('');
    const [Data, setData] = useState([]);
    const [wasSearched, setWasSearched] = useState(false);
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shimmering, setShimmering] = useState(true);

    let apiKeyIndex = 0;
    let searchTimer = null;

    const searchNews = async text => {
        try {
            setIsLoading(true);
            if (searchTimer) clearTimeout(searchTimer);

            searchTimer = setTimeout(async () => {
                const ruResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`,
                );
                const usResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`,
                );

                if (ruResponse.status === 429 || usResponse.status === 429) {
                    apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                    return await searchNews(text);
                    //throw new Error(`RuResponse Error: ${ruResponse.status}`);
                }

                const ruData = await ruResponse.json();
                const usData = await usResponse.json();

                const combinedData = [...ruData.articles, ...usData.articles];

                if (combinedData.length === 0) {
                    setNoResultsMessage('Кажется, ничего не найдено');
                } else {
                    setNoResultsMessage('');
                }
                setIsLoading(false);
                setData(combinedData);
                setWasSearched(!wasSearched);
            });
        } catch (error) {
            console.error('Error in SearchNews:', error);
        }
    };

    const handleTextChange = text => {
        setSearchText(text);
        if (text.length >= 2) {
            searchNews(text);
        } else {
            setData([]);
        }
    };


    const [isFocused, setIsFocused] = useState(false);


    const shimmerConfigs = [
        {
            style: {
                width: 'inherit',
                height: 200,
                borderRadius: 9,
            },
        },
        {
            style: {
                width: 'inherit',
                height: 52,
                marginTop: 4,
            },
        },
        {
            style: {
                width: 'inherit',
                height: 30,
                marginTop: 4,
            },
        },
        {
            style: {
                width: 80,
                height: 25,
                marginTop: 4,
                alignSelf: 'flex-end',
                borderRadius: 10,
            },
        },
        {
            style: {
                width: 125,
                height: 30,
                borderRadius: 10,
            },
        },
        {
            style: {
                width: 125,
                height: 30,
                borderRadius: 10,
            },
        },
    ];



    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                blurRadius={100}
                style={{
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 0,
                }}
                source={require('../screens/assets/images/search-bg.jpg')}
            />
            <Animatable.View
                style={[
                    { flex: 1 },
                    //Data[Data.length - 1] ? { marginBottom: '10%' } : null,
                ]}
                animation="fadeIn"
                duration={1500}>
                <Animatable.View
                    style={[
                        styles.search,
                        { backgroundColor: isFocused ? theme.bgWhite(0.2) : 'transparent' },
                    ]}
                    animation="fadeIn"
                    duration={1000}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Домашняя страница');
                        }}>
                        <Icon
                            style={styles.arrow}
                            name="arrowleft"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{ fontSize: 16, width: '100%', fontFamily: 'Inter-Bold' }}
                        placeholder="Что будем искать?"
                        placeholderTextColor={'white'}
                        onChangeText={handleTextChange}
                        selectionColor={'#F7F6C5'}
                        value={SearchText}
                        maxLength={20}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </Animatable.View>

                {/* //Data.length === 0 && isLoading && SearchText.length !== 0 && */}
                {Data.length === 0 && isLoading && SearchText.length !== 0 && (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {[...Array(10)].map((_, index) => (
                            <View key={index} style={styles.placeholder}>
                                <ShimmerPlaceholder
                                    shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                                    style={{
                                        width: 'inherit',
                                        height: 200,
                                        borderRadius: 9,
                                    }}
                                    autoRun={true}
                                />
                                <ShimmerPlaceholder
                                    shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                                    style={{
                                        width: 'inherit',
                                        height: 52,
                                        marginTop: 4,
                                    }}
                                    autoRun={true}
                                />
                                <ShimmerPlaceholder
                                    shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                                    style={{
                                        width: 'inherit',
                                        height: 30,
                                        marginTop: 4,
                                    }}
                                    autoRun={true}
                                />
                                <ShimmerPlaceholder
                                    shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                                    style={{
                                        width: 80,
                                        height: 25,
                                        marginTop: 4,
                                        alignSelf: 'flex-end',
                                        borderRadius: 10,
                                    }}
                                    autoRun={true}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <ShimmerPlaceholder
                                        shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                                        style={{
                                            width: 125,
                                            height: 30,
                                            borderRadius: 10,
                                        }}
                                        autoRun={true}
                                    />
                                    <ShimmerPlaceholder
                                        shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                                        style={{
                                            width: 125,
                                            height: 30,
                                            borderRadius: 10,
                                        }}
                                        autoRun={true}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>

                )}

                {Data.length === 0 && !isLoading && (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {wasSearched && SearchText.length !== 0 && (
                            <Text style={{ textAlign: 'center', fontFamily: 'Inter-Light' }}>
                                {noResultsMessage}
                            </Text>
                        )}
                        <LottieView
                            style={styles.lottie}
                            source={require('../screens/assets/animations/news.json')}
                            autoPlay={true}
                            loop={true}
                        />
                    </View>
                )}
                {SearchText.length !== 0 && (
                    <FlatList
                        style={{ flex: 1, zIndex: 1 }}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        data={Data}
                        renderItem={({ item, index }) => {
                            return <Card item={item} navigation={navigation} data={Data} />;
                        }}
                    />
                )}
            </Animatable.View>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    searchRoot: {
        flex: 1,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 0.25,
        borderColor: 'white',
        elevation: 1,
        paddingHorizontal: 10,
        borderRadius: 35,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    arrow: {
        marginRight: '5%',
    },
    lottie: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width,
        height: width,
        marginTop: '30%',
    },
    placeholder: {
        width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 14,
        marginBottom: 4,
        borderRadius: 9,
        borderWidth: 0.65,
        borderColor: 'rgb(156 163 175)',
    },
});
