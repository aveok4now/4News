import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';

const HomeScreen = ({ navigation }) => {

    const [Data, setData] = useState([]);
    const getData = async () => {
        const response = await fetch(
            'https://newsapi.org/v2/top-headlines?country=us&apiKey=ef0cca7fb1924225a4c6c42e0f32924b');

        const data = await response.json()
        console.log(data)
        setData(data.articles)
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <View>
            <Header navigation={navigation} />
            {/* <Text style={{ fontSize: 24, alignItems: 'center', color: 'white' }}>
                Новости будут здесь ...
            </Text> */}
            <View>
                <FlatList
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