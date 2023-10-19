import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';

const HomeScreen = ({ navigation }) => {

    const [Data, setData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const getData = async () => {
        const ruResponse = await fetch(
            'https://newsapi.org/v2/top-headlines?country=ru&apiKey=ef0cca7fb1924225a4c6c42e0f32924b');

        const ruData = await ruResponse.json();

        const usResponse = await fetch(
            'https://newsapi.org/v2/top-headlines?country=us&apiKey=ef0cca7fb1924225a4c6c42e0f32924b');

        const usData = await usResponse.json();

        const combinedData = [...ruData.articles, ...usData.articles];

        combinedData.sort(() => Math.random() - 0.5);

        setData(combinedData);
        setIsRefreshing(false)
    }
    useEffect(() => {
        getData();
    }, []);


    onRefresh = () => {
        setIsRefreshing(true);
        getData();
    }

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <View >
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    data={Data}
                    renderItem={({ item, index }) => {
                        return <Card item={item} />;
                    }}
                />
            </View>
        </View>
    );
}

export default HomeScreen;
