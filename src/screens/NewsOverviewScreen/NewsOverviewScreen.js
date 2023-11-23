import { View, Text, Image, StatusBar, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import Card from '../../components/Card';
//import { ruCaptions } from '../../constants/Images';

const NewsOverviewScreen = ({ route, navigation }) => {
    const { apiKeyList, apiKeyIndex, caption, ruCaption } = route.params;
    console.log(apiKeyList);
    console.log(apiKeyIndex);

    let newApiKeyList = [...apiKeyList];
    let newApiKeyIndex = apiKeyIndex;

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [Data, setData] = useState([]);

    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);

    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var day = ('0' + currentDate.getDate()).slice(-2);

    var formattedDate = year + '-' + month + '-' + day;

    const apiConfig = {
        baseUrl: 'https://newsapi.org/v2/everything',
        apiKeyList: [...apiKeyList],
        apiKeyIndex: apiKeyIndex
    };

    const newsWebsites = {
        'Газета.Ru': 'gazeta.ru',
        'Lenta.ru': 'lenta.ru',
        'ТАСС': 'tass.ru',
        'Известия': 'iz.ru',
        'Хабр': 'habr.com',
        'IXBT': 'ixbt.com',
        'Мэйл.ру': 'mail.ru',
        'Onliner': 'onliner.by',
        'YouTube': 'youtube.com',
        'КиноПоиск': 'kinopoisk.ru',
        'Пикабу': 'pikabu.ru',
        'Игромания': 'igromania.ru',
        'Ведомости': 'vedomosti.ru',
        'Биллборд': 'billboard.com',
        'Коммерсантъ': 'kommersant.ru',
        'Канобу': 'kanobu.ru',
        'Apple': 'apple.com'
    };


    const getDataByQ = async () => {
        setIsLoading(true);
        try {

            let apiEndpoint;

            if (newsWebsites.hasOwnProperty(ruCaption)) {
                apiEndpoint = `domains=${newsWebsites[ruCaption]}&apiKey=${newApiKeyList[newApiKeyIndex]}`;
            } else {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=${caption.toLowerCase()}&from=${formattedDate}&to=${currentDate}&sortBy=publishedAt&apiKey=${newApiKeyList[newApiKeyIndex]}`,
                );
                const ruResponse = await fetch(
                    `https://newsapi.org/v2/everything?q=${ruCaption.toLowerCase()}&from=${formattedDate}&to=${currentDate}&sortBy=publishedAt&apiKey=${newApiKeyList[newApiKeyIndex]}`,
                );

                if (response.status === 429 || ruResponse.status === 429) {
                    await handleApiError();
                    return;
                }

                const fetchedData = await response.json();
                const rusFetchedData = await ruResponse.json();
                const Data = [...rusFetchedData.articles, ...fetchedData.articles];

                setData(Data);
                setIsRefreshing(false);
                setIsLoading(false);
                return;
            }
            const response = await fetch(
                `https://newsapi.org/v2/everything?${apiEndpoint}`,
            );

            if (response.status === 429) {
                await handleApiError();
                return;
            }

            const fetchedData = await response.json();
            setData(fetchedData.articles);
            setIsLoading(false);
            setIsRefreshing(false);
        } catch (error) {
            console.error('Error in getDataByQ:', error);
        }
    };

    const handleApiError = async () => {
        newApiKeyIndex = (newApiKeyIndex + 1) % newApiKeyList.length;
        await getDataByQ();
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        getDataByQ();
    };

    useEffect(() => {
        console.log(ruCaption.toLowerCase());
        console.log(caption);
        setIsLoading(true);
        getDataByQ();
    }, []);

    return (
        <>
            <StatusBar backgroundColor={'transparent'} />
            <View style={{ flex: 1 }}>
                <Image
                    blurRadius={200}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={require('../assets/images/newsoverview.jpg')}
                />
                {isLoading ? (
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Progress.CircleSnail thickness={10} size={140} color="white" />
                    </View>
                ) : (
                    <View>
                        <FlatList
                            onRefresh={onRefresh}
                            refreshing={isRefreshing}
                            showsVerticalScrollIndicator={false}
                            data={Data}
                            renderItem={({ item, index }) => {
                                return <Card item={item} navigation={navigation} data={Data} />;
                            }}
                        />
                    </View>
                )}
            </View>
        </>
    );
};

export default NewsOverviewScreen;
