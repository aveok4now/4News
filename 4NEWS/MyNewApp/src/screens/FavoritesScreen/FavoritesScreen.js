import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';
import * as Animatable from 'react-native-animatable'
import { assets } from '../../../react-native.config';
import TypeWriter from 'react-native-typewriter'
import CustomButton from '../../components/customs/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import useUserCredentials from '../../utils/useUserCredentials';
import CustomDrawer from '../../components/customs/CustomDrawer';

const { width, height } = Dimensions.get('window');
export default function FavoritesScreen({ navigation }) {
    const [favorites, setFavorites] = useState([]);

    //const [state] = useState("📰 Ваши сохранённые новости, ")
    const [isRefreshing, setIsRefreshing] = useState(false);

    let identify = useUserCredentials();

    const loadFavorites = async () => {
        try {
            const savedNewsItems = await AsyncStorage.getItem('savedNewsItems');
            const parsedSavedNewsItems = JSON.parse(savedNewsItems) || [];
            setFavorites(parsedSavedNewsItems.reverse());
            setIsRefreshing(false)
        } catch (error) {
            console.error('Error loading saved news items:', error);
        }
    };

    useEffect(() => {
        loadFavorites();
        const refreshInterval = setInterval(loadFavorites, 5000);

        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    const onRefresh = () => {
        setIsRefreshing(true);
        loadFavorites()
    }

    const handleDelete = (url) => {
        const updatedFavorites = favorites.filter(item => item.url !== url);
        AsyncStorage.setItem('savedNewsItems', JSON.stringify(updatedFavorites))
            .then(() => {
                setFavorites(updatedFavorites);
            })
            .catch(error => {
                console.error('Error saving updated favorites:', error);
            });
    }


    return (
        identify !== "Гость" ? (
            <CustomDrawer type="Избранные новости" backgroundColor="#5b86e5" fgColor="#5b86e5">
                <Animatable.View
                    animation="fadeIn"
                    duration={1000}
                >

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: '27%' }}
                        onRefresh={onRefresh}
                        refreshing={isRefreshing}
                        data={favorites}
                        keyExtractor={(item) => item.url}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <Card item={item} navigation={navigation} /><View>
                                        <CustomButton
                                            text='Удалить'
                                            onPress={() => handleDelete(item.url)}
                                        >
                                        </CustomButton>
                                    </View>
                                </>
                            );
                        }}
                    />
                    {favorites.length === 0 && (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: "Inter-Light", fontSize: 20 }}>Здесь будут появляться избранные новости, нажимайте на кнопку {" "}
                                <Icon name={"heart-o"} size={20} color="white" /> , чтобы сохранить их!
                            </Text>
                            <View>
                                <LottieView style={styles.lottie} source={require("../assets/animations/interests.json")} autoPlay loop />
                            </View>
                        </View>
                    )}

                </Animatable.View>
            </CustomDrawer>
        ) : (
            <>

                <View style={{ justifyContent: "center", alignItems: "center", flex: 2, zIndex: 100 }}>
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
    lottie: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
        height: width
    },
    heading: {
        fontFamily: "Inter-Bold",
        fontSize: 20,
        paddingHorizontal: 20
    },
    header: {
        // width: '100%',
        // height: Dimensions.get("screen").height * 0.1
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#8EBBF3',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    headerText: {
        fontFamily: "Inter-ExtraBold",
        textAlign: 'center',
        justifyContent: 'center',
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
