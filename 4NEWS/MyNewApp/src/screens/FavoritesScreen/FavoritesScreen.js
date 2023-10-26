import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';
import * as Animatable from 'react-native-animatable'
import { assets } from '../../../react-native.config';
import TypeWriter from 'react-native-typewriter'
import CustomButton from '../../components/CustomButton';


export default function FavoritesScreen({ navigation }) {
    const [favorites, setFavorites] = useState([]);
    const [identify, setIdenify] = useState('')
    const [state] = useState("📰 Ваши сохранённые новости, ")


    useEffect(() => {
        const checkUserCredentials = async () => {
            const savedUsername = await AsyncStorage.getItem('username');
            const savedPassword = await AsyncStorage.getItem('password');
            const guestID = await AsyncStorage.getItem('guestID');

            if (savedUsername && savedPassword) {
                //onSignInPressed({ username: savedUsername, password: savedPassword });
                setIdenify(savedUsername)
            } else if (savedUsername === 'guest') {
                if (guestID) {
                    setIdenify("Гость")
                }
            }
        }

        checkUserCredentials();
    }, []);


    const loadFavorites = async () => {
        try {
            const savedNewsItems = await AsyncStorage.getItem('savedNewsItems');
            const parsedSavedNewsItems = JSON.parse(savedNewsItems) || [];
            setFavorites(parsedSavedNewsItems);
        } catch (error) {
            console.error('Error loading saved news items:', error);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);
    return (
        identify !== "Гость" ? (
            <Animatable.View
                animation="fadeIn"
                duration={1000}
            >

                <View style={styles.header}>

                    <TypeWriter
                        style={styles.headerText}
                        minDelay={5}
                        typing={1}
                    >
                        {state}{identify}
                    </TypeWriter>


                    {/* <Text style={styles.headerText}>Ваши сохраннённые новости, {identify} </Text> */}
                </View>

                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.url}
                    renderItem={({ item }) => {
                        return <Card item={item} navigation={navigation} />;
                    }}
                />
            </Animatable.View>
        ) : (
            <>
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <Text style={styles.guestInfo}>Упс...</Text>
                    <Text style={styles.guestSubInfo}>Чтобы просматривать сохранённые новости, необходимо войти в аккаунт</Text>

                    <View style={{ width: '60%', marginVertical: 15 }}>
                        <CustomButton
                            text="Войти"
                            onPress={() => navigation.navigate("Добро пожаловать !", { status: "logout" })}
                        />
                    </View>

                </View>
            </>
        )

    );
}
const styles = StyleSheet.create({
    heading: {
        fontFamily: "Inter-Bold",
        fontSize: 20,
        paddingHorizontal: 20
    },
    header: {
        // width: '100%',
        // height: Dimensions.get("screen").height * 0.1
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#8EBBF3',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    headerText: {
        fontFamily: "Inter-ExtraBold",
        textAlign: 'justify',
        fontSize: 20
        //justifyContent: 'center'
    },
    guestInfo: {
        textAlign: 'center',
        fontFamily: 'Inter-ExtraBold',
        fontSize: 24
    },
    guestSubInfo: {
        textAlign: 'center',
        fontFamily: 'Inter-Light',
    }
})
