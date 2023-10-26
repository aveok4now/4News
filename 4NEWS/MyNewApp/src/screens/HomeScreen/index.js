import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';


const HomeScreen = ({ navigation }) => {

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
    ])

    const apiKeyList = ["ef0cca7fb1924225a4c6c42e0f32924b", "abc3f76eb9ec4195b35c7c5b3771a40b", "5bb375e99be54883b8b9aee7001fc660", "2c7f28792cc64ca699bfd3bbf2768105"];
    let apiKeyIndex = 0;

    const getData = async () => {
        try {
            setIsLoading(true)
            const ruResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&category=${Category[Select].category}`);


            if (ruResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData()
                return
                //throw new Error(`RuResponse Error: ${ruResponse.status}`);
            }

            const ruData = await ruResponse.json();

            const usResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&category=${Category[Select].category}`);

            if (usResponse.status === 429) {

                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData()
                return
                //throw new Error(`UsResponse Error: ${usResponse.status}`);
            }

            const usData = await usResponse.json();

            const combinedData = [...ruData.articles, ...usData.articles];

            combinedData.sort(() => Math.random() - 0.5);

            setData(combinedData);
            setIsRefreshing(false);
            //console.log(combinedData)
            //apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.lrength;
            setIsLoading(false)
        } catch (error) {
            console.error("Error in getData:", error);
            setIsFetchingError(true)
            setIsRefreshing(false);
        }
    };


    const getData2 = async (category) => {
        try {
            const ruResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&category=${category}`);


            if (ruResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData2()
                return
                //throw new Error(`RuResponse Error: ${ruResponse.status}`);
            }

            const ruData = await ruResponse.json();

            const usResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&category=${category}`);

            if (usResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData2()
                return
                //throw new Error(`UsResponse Error: ${usResponse.status}`);
            }

            const usData = await usResponse.json();
            const combinedData = [...ruData.articles, ...usData.articles];

            combinedData.sort(() => Math.random() - 0.5);

            setData(combinedData);
            setIsRefreshing(false);
            apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
            setIsLoading(false)
        } catch (error) {
            console.error("Error in getData2:", error);
            setIsFetchingError(true)
            setIsRefreshing(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const onRefresh = () => {
        setIsRefreshing(true);
        getData();
    }



    return (
        <>
            {/* TODO: Lottie */}
            {Loading ? (

                <View style={styles.load}>

                    <ActivityIndicator
                        color={'#754da6'}
                        size={36}>
                    </ActivityIndicator>
                </View>) : (
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
                                            getData2(Category[index].category)
                                            //onRefresh()
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

                    <View style={{ flex: 1 }}>
                        <View style={{ height: Dimensions.get("window").height * 0.85 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                onRefresh={onRefresh}
                                refreshing={isRefreshing}
                                data={Data}
                                renderItem={({ item, index }) => {
                                    return <Card item={item} navigation={navigation} />;
                                }}
                            />
                        </View>
                    </View>

                </View>

            )}

            {/* <Tab.Navigator screenOptions={screenOptions} initialRouteName='Домашняя страница'>
                <Tab.Screen name="Домашняя страница" component={HomeScreen} />
                <Tab.Screen name="Добро пожаловать !" component={SignInScreen} />
            </Tab.Navigator> */}
        </>

    );


}

export default HomeScreen;

const styles = StyleSheet.create({
    load: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

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
        //fontWeight: '500',
        color: '#383738',
        fontFamily: "Inter-Bold",

    },

    selListText: {
        //fontWeight: 'bold',
        fontFamily: "Inter-Bold"
    }

})