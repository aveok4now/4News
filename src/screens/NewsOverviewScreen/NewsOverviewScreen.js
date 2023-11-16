import { View, Text, Image, StatusBar, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import Card from '../../components/Card';

const NewsOverviewScreen = ({ route, navigation }) => {
    const { apiKeyList, apiKeyIndex, caption } = route.params;
    console.log(apiKeyList);
    console.log(apiKeyIndex);

    let newApiKeyList = [...apiKeyList];
    let newApiKeyIndex = apiKeyIndex;

    const [isLoading, setIsLoading] = useState(false);

    const [Data, setData] = useState([]);

    const getDataByQ = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${caption}&from=2023-11-15&to=2023-11-15&sortBy=popularity&apiKey=${newApiKeyList[newApiKeyIndex]}`,
            );

            if (response.status === 429) {
                newApiKeyIndex = (newApiKeyIndex + 1) % newApiKeyList.length;
                getDataByQ();
                return;
            }

            const fetchedData = await response.json();
            const Data = [...fetchedData.articles];

            setData(Data);
            //setIsRefreshing(false);
            console.log(Data);
            //apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.lrength;
            setIsLoading(false);
        } catch (error) {
            console.error('Error in getDataByQ:', error);
            //setIsFetchingError(true);
            //setIsRefreshing(false);
        }
    };

    useEffect(() => {
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
