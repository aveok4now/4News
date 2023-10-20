import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import RadialGradient from 'react-native-radial-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../components/Card';

const Search = ({ navigation }) => {
    const [SearchText, setSearchText] = useState('')
    const [Data, setData] = useState([])


    const apiKeyList = ["ef0cca7fb1924225a4c6c42e0f32924b", "abc3f76eb9ec4195b35c7c5b3771a40b", "5bb375e99be54883b8b9aee7001fc660", "2c7f28792cc64ca699bfd3bbf2768105"];
    let apiKeyIndex = 0;
    const searchNews = async (text) => {
        try {
            setSearchText(text)
            if (text.length >= 2) {
                console.warn("Первый" + apiKeyList[apiKeyIndex])
                const ruResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`);

                if (ruResponse == undefined) {
                    apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                    console.warn("Второй" + apiKeyList[apiKeyIndex])
                    searchNews()
                    //throw new Error(`RuResponse Error: ${ruResponse.status}`);
                }

                const ruData = await ruResponse.json();

                const usResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`);

                if (usResponse == undefined) {

                    apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                    searchNews()
                    //throw new Error(`UsResponse Error: ${usResponse.status}`);
                }

                const usData = await usResponse.json();

                const combinedData = [...ruData.articles, ...usData.articles];

                combinedData.sort(() => Math.random() - 0.5);

                setData(combinedData);
            }

        } catch (error) {
            console.error("Error in SearchNews:", error);
        }
    }

    return (
        <Animatable.View style={styles.searchRoot} animation="fadeIn" duration={1500}>
            <RadialGradient
                style={{ flex: 1 }}
                colors={['#36d1dc', '#5b86e5']}
                stops={[0.1, 0.9]}
                center={[100, 360]}
                radius={500}
            >
                <View style={styles.search}>
                    <Icon
                        style={styles.arrow}
                        name="arrow-left"
                        size={24}
                        color="#F7F6C5"
                    />
                    <TextInput
                        style={{ fontSize: 16, width: '100%' }}
                        placeholder='Что будем искать?'
                        placeholderTextColor={'white'}
                        onChangeText={(text) => {
                            searchNews(text)
                        }}
                        selectionColor={'#F7F6C5'}
                        value={SearchText}
                    />
                </View>
                <View>
                    <FlatList
                        data={Data}
                        renderItem={({ item, index }) => {
                            return <Card item={item} navigation={navigation} />;
                        }}
                    />
                </View>

                {/* TODO: Lottie */}
                {Data == null ? (
                    <View>
                        <Text>НИЧЕГО</Text>
                    </View>
                ) : null}
            </RadialGradient>
        </Animatable.View>
    );
}

export default Search;

const styles = StyleSheet.create({
    searchRoot: {
        flex: 1,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8EBCF3',
        borderWidth: 0.25,
        borderColor: "white",
        elevation: 1,
        paddingHorizontal: 10
    },
    arrow: {
        // marginLeft: '2%',
        marginRight: '5%'
    }
})