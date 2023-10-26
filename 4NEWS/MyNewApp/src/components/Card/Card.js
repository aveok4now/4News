import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { assets } from '../../../react-native.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalPopup from '../CustomModal/CustomModal';
import CustomButton from '../CustomButton';

const Card = ({ item, navigation }) => {
    const defaultImage = 'https://arbeitgeber.de/wp-content/uploads/2020/11/bda-news-header-1920x1280px-1536x1024.jpg'

    //console.log(item);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageUrl = item.urlToImage || defaultImage;
    const [isLiked, setIsLiked] = useState(false);
    const [identify, setIdenify] = useState('')
    const [showModal, setShowModal] = useState(false);

    let getSaved = AsyncStorage.getItem('savedNewsItems');


    let includesG = item.url.includes("https://news.google.com/")

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleLike = async () => {
        setIsLiked(!isLiked)
        try {
            if (identify == "Гость") {
                setShowModal(!showModal)
                setIsLiked(false)
                return
            }
            const savedNewsItems = await AsyncStorage.getItem('savedNewsItems');
            const parsedSavedNewsItems = JSON.parse(savedNewsItems) || [];

            const isAlreadySaved = parsedSavedNewsItems.some((savedItem) => savedItem.url === item.url);

            if (!isAlreadySaved) {
                parsedSavedNewsItems.push(item);
                await AsyncStorage.setItem('savedNewsItems', JSON.stringify(parsedSavedNewsItems));
                console.log("saved")
            }
            const likedNewsItems = await AsyncStorage.getItem('likedNewsItems');
            const parsedLikedNewsItems = JSON.parse(likedNewsItems) || [];

            if (isLiked) {
                const updatedLikedNewsItems = parsedLikedNewsItems.filter((likedItem) => likedItem.url !== item.url);
                await AsyncStorage.setItem('likedNewsItems', JSON.stringify(updatedLikedNewsItems));
            } else {
                parsedLikedNewsItems.push(item);
                await AsyncStorage.setItem('likedNewsItems', JSON.stringify(parsedLikedNewsItems));
            }


        } catch (error) {
            console.error('Error saving news item:', error);
        }
    };


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

        const checkLiked = async () => {
            const likedNewsItems = await AsyncStorage.getItem('likedNewsItems');
            const parsedLikedNewsItems = JSON.parse(likedNewsItems) || [];
            const isAlreadyLiked = parsedLikedNewsItems.some((likedItem) => likedItem.url === item.url);
            setIsLiked(isAlreadyLiked);
        };

        checkLiked();
    }, []);

    const onOk = () => {
        navigation.navigate("Добро пожаловать !", { status: "logout" })
    }


    return (
        item.title.includes('Removed') ? null : (
            <LinearGradient
                // colors={['#8BC6EC', '#9599E2']}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 1 }}
                // colors={['#D8B5FF', '#1EAE98']}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 1 }}
                // colors={['#4E65FF', '#92EFFD']}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 1 }}
                colors={['#764BA2', '#667EEA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}

            >
                <Animatable.View style={styles.card} animation="fadeIn" duration={1500}>
                    {!imageLoaded && <ActivityIndicator style={styles.loader} />}

                    <Animatable.Image
                        source={{ uri: imageUrl }}
                        style={[
                            styles.image,
                            {
                                opacity: imageLoaded ? 1 : 0
                            }
                        ]}
                        onLoad={handleImageLoad}
                        resizeMethod='resize'
                    />
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description || ''}</Text>
                        <View style={[styles.podcard, item.author && item.author.length > 20 ? { flexDirection: 'column', alignItems: 'flex-start' } : null]}>
                            <Text style={styles.description}>{item.author || ''} </Text>
                            <Text style={styles.description}>
                                {new Date(item.publishedAt).toLocaleString('ru-RU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    timeZone: 'UTC',
                                })}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 200 }}>

                            <TouchableOpacity
                                disabled={includesG}
                                style={[styles.more, { opacity: includesG ? 0 : 1 }]}
                                onPress={() => navigation.navigate("NewsViewer", {
                                    url: item.url,
                                })}>
                                <Text style={styles.moreText}>Подробнее</Text>
                                <Icon name="arrow-right" size={20} color="#F7F6C5" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>

                            <View style={
                                [
                                    styles.more,
                                    {
                                        backgroundColor: isLiked ? '#DA2C38' : '#301315',
                                        width: 'auto'
                                    }]}>
                                <TouchableOpacity
                                    //disabled={showModal}
                                    onPress={handleLike}
                                >
                                    <Icon name={isLiked ? "heart" : "heart-o"} size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>



                    </View>
                    <View style={styles.source}>
                        <Text style={styles.sourceText}>Источник: {item.source.name}</Text>

                    </View>
                    {showModal ? (
                        <View style={{ flex: 1 }}>
                            {/* {Alert.alert()} */}
                            <ModalPopup
                                navigation={navigation}
                                visible={showModal}
                                route="popup"
                            >
                                <View>
                                    <Text style={styles.popUpText}>Чтобы добавлять новости в избранное,
                                        пожалуйста, войдите или зарегестрируйтесь 🥰
                                    </Text>
                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        marginTop: 15
                                    }}>
                                        <CustomButton
                                            text="ОК"
                                            onPress={() => onOk()}
                                        />
                                        <CustomButton
                                            type="Tertiary"
                                            text="Отмена"
                                            onPress={() => setShowModal(false)}
                                        />

                                        {/* <Text style={{ fontFamily: "Inter-ExtraBold" }}>ОК</Text> */}
                                    </View>
                                </View>
                            </ModalPopup>
                        </View>
                    ) : (
                        null
                    )
                    }
                </Animatable.View>

            </LinearGradient>

        ));
};

export default Card;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    card: {
        // flex: 1,
        position: 'relative',
        // height: 200,
        // width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 14,
        marginBottom: 4,
        // marginBottom: 15,
        // marginTop: 15,
        elevation: 0,
        borderRadius: 3
    },
    image: {
        flex: 1,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 7,
    },
    loader: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
        color: 'red'

    },
    titleView: {
        paddingHorizontal: 2,
        marginVertical: 2,
    },
    title: {
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'justify',
        fontWeight: '600',
        fontFamily: "Inter-Bold",
        // letterSpacing: -0.25
    },
    description: {
        fontSize: 12,
        lineHeight: 16,
        marginVertical: 4,
        color: '#E2E2E2',
        //fontWeight: '700',
        fontFamily: "Inter-SemiBold",
    },

    source: {
        position: 'absolute',
        top: '4%',
        right: '1%',
        backgroundColor: '#8EBCF3',
        borderRadius: 5,
        padding: 5
    },

    // like: {
    //     position: 'absolute',
    //     top: '5.5%',
    //     left: '2%',
    // },

    sourceText: {
        color: '#F7F6C5',
        //fontWeight: '500',
        fontFamily: "Inter-ExtraLight"
    },
    podcard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 2,

    },
    more: {
        backgroundColor: '#8EBCF3',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '33%',
        textAlign: 'center',
        marginTop: 5,
        borderRadius: 5,
        flexDirection: 'row',
        elevation: 1,
        marginTop: 10,
        paddingTop: 6,
    },


    moreText: {
        //fontWeight: '700',
        color: '#F7F6C5',
        fontFamily: "Inter-ExtraBold",
    },

    popUpText: {
        fontFamily: 'Inter-Light',
        fontSize: 18,
        textAlign: 'center'
    }

});
