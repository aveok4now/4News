import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';


const HomeScreen = ({ navigation }) => {

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
    ])
    const getData = async () => {
        const ruResponse = await fetch(
            `https://newsapi.org/v2/top-headlines?country=ru&apiKey=ef0cca7fb1924225a4c6c42e0f32924b&category=${Category[Select].category}`);

        const ruData = await ruResponse.json();

        const usResponse = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=ef0cca7fb1924225a4c6c42e0f32924b&category=${Category[Select].category}`);

        const usData = await usResponse.json();

        const combinedData = [...ruData.articles, ...usData.articles];

        combinedData.sort(() => Math.random() - 0.5);

        setData(combinedData);
        setIsRefreshing(false)
    }
    useEffect(() => {
        getData();
    }, []);


    const onRefresh = () => {
        setIsRefreshing(true);
        getData();
    }

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <View style={styles.horList}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={Category}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={index == Select ?
                                    styles.selListItem : styles.horListItem}
                                onPress={() => {
                                    setSelect(index)
                                    getData()
                                    onRefresh()
                                }}
                            >


                                <Text
                                    style={index == Select ?
                                        styles.selListText : styles.horListText}>{item.nameRU}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View>
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

const styles = StyleSheet.create({
    horList: {
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    horListItem: {
        backgroundColor: '#8EBBF3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 12,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 0.5,
    },

    selListItem: {
        backgroundColor: '#754da6',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 12,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 0.5,
    },

    horListText: {
        fontWeight: '500',
        color: '#383738'
    },

    selListText: {
        fontWeight: 'bold',
    }

})