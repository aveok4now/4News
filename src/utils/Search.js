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


    const apiKeyList = [
        'ef0cca7fb1924225a4c6c42e0f32924b',
        'abc3f76eb9ec4195b35c7c5b3771a40b',
        '5bb375e99be54883b8b9aee7001fc660',
        '2c7f28792cc64ca699bfd3bbf2768105',
    ];
    let apiKeyIndex = 0;
    let searchTimer = null;

    const searchNews = async text => {
        try {
            //setSearchText(text)

            if (searchTimer) clearTimeout(searchTimer);

            searchTimer = setTimeout(async () => {
                //console.warn("Первый" + apiKeyList[apiKeyIndex])
                const ruResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`,
                );

                if (ruResponse.status === 429) {
                    apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                    searchNews(text);
                    return;
                    //throw new Error(`RuResponse Error: ${ruResponse.status}`);
                }

                const ruData = await ruResponse.json();

                const usResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`,
                );

                if (usResponse.status === 429) {
                    apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                    searchNews(text);
                    return;
                    //throw new Error(`UsResponse Error: ${usResponse.status}`);
                }

                const usData = await usResponse.json();

                const combinedData = [...ruData.articles, ...usData.articles];

                //combinedData.sort(() => Math.random() - 0.5);

                if (combinedData.length === 0) {
                    setNoResultsMessage('Кажется, ничего не найдено');
                } else {
                    setNoResultsMessage('');
                }

                setData(combinedData);
                setWasSearched(!wasSearched)
            });
        } catch (error) {
            console.error('Error in SearchNews:', error);
        }
    };

    const handleTextChange = text => {
        setSearchText(text);
        searchNews(text);
    };

    const [isFocused, setIsFocused] = useState(false);

    return (
        <Animatable.View style={[{ flex: 1 }, Data[Data.length - 1] ? { marginBottom: '10%' } : null]} animation="fadeIn" duration={1500}>
            <Image
                blurRadius={100}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                source={require('../screens/assets/images/search-bg.jpg')}
            />
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
                    style={{ fontSize: 16, width: '100%' }}
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
            <View>
                <FlatList
                    data={Data}
                    renderItem={({ item, index }) => {
                        return <Card item={item} navigation={navigation} data={Data} />;
                    }}
                />
            </View>

            {Data.length === 0 && (
                <View>
                    {wasSearched && (
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
        </Animatable.View>
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
        // marginLeft: '2%',
        marginRight: '5%',
    },
    lottie: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
        height: width,
        marginTop: '30%',
    },
});
