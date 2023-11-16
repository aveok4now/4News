import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { theme } from '../WeatherScreen/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { Icons } from '../../components/Icons';
import { handleShare } from '../../utils/Share';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import userAvatar from '../../../assets/images/user.jpg';

export default function CommentsScreen({ route }) {
    const {
        item,
        defaultImage,
        includesG,
        formattedDate,
        navigation,
        imageLoaded,
    } = route?.params;

    const handleImagePressed = () => {
        try {
            if (includesG) return;
            navigation.navigate('NewsViewer', { url: item.url });
        } catch (err) {
            console.log(err);
            return;
        }
    };

    let identify = useUserCredentials();

    const dataArray = [
        {
            userAvatar: userAvatar,
            identify: identify,
            postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            postImage: defaultImage,
        },
        {
            userAvatar: userAvatar,
            identify: identify,
            postText: 'Praesent eget convallis velit, ac molestie lectus.',
        },
        {
            userAvatar: userAvatar,
            identify: identify,
            postText: 'Praesent eget convallis velit, ac molestie lectus.',
            postImage: defaultImage,
        },
        {
            userAvatar: userAvatar,
            identify: identify,
            postText: 'Praesent eget convallis velit, ac molestie lectus.',
        },
        {
            userAvatar: userAvatar,
            identify: identify,
            postText: 'Praesent eget convallis velit, ac molestie lectus.',
            postImage: defaultImage,
        },
    ];

    return (
        <>
            <StatusBar backgroundColor="#5fa3c5" />

            <SafeAreaView style={{ height: '100%' }}>
                <Animatable.View
                    animation="fadeIn"
                    duration={1500}
                    style={{
                        flex: 1,
                    }}>
                    <Image
                        blurRadius={200}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        source={require('../assets/images/newsoverview.jpg')}
                    />
                    <View
                        style={{
                            backgroundColor: theme.bgWhite(0.3),
                            borderRadius: 10,
                            marginTop: '15%',
                            paddingVertical: 10,
                            paddingHorizontal: 25,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: '2%',
                        }}>
                        <Pressable onPress={handleImagePressed}>
                            <View
                                style={{
                                    width: 65,
                                    height: 65,
                                }}>
                                <Animatable.View
                                    animation="slideInLeft"
                                    duration={1000}
                                    style={styles.imageContainer}>
                                    <Image
                                        source={{
                                            uri: imageLoaded
                                                ? item.urlToImage || defaultImage
                                                : defaultImage,
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'cover',
                                        }}
                                    />
                                </Animatable.View>
                            </View>
                        </Pressable>
                        <Animatable.View animation="slideInRight" duration={1000}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontFamily: 'Inter-ExtraBold',
                                    textAlign: 'justify',
                                    paddingHorizontal: 15,
                                    fontSize: 18,
                                    letterSpacing: -1,
                                }}>
                                {item.title}
                            </Text>
                            {/* <View style={styles.seperator} /> */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    //marginHorizontal: 5
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        opacity: 0.8,
                                        fontFamily: 'Inter-Light',
                                        textAlign: 'justify',
                                        paddingHorizontal: 15,
                                        fontSize: 14,
                                    }}>
                                    {formattedDate}
                                </Text>
                                <TouchableOpacity
                                    style={{ marginRight: 15 }}
                                    onPress={() =>
                                        handleShare({
                                            url: item.url,
                                            newsTitle: item.title,
                                        })
                                    }>
                                    <Icons.FontAwesome name={'send-o'} size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                    </View>
                    <View
                        style={{
                            marginTop: 15,
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            paddingHorizontal: 20,
                            flex: 1,
                            backgroundColor: theme.bgWhite(0.4),
                        }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ marginVertical: 20 }}
                            scrollEventThrottle={16}
                            bounces={false}>
                            {dataArray.map((item, index) => (
                                <View key={index} style={styles.feedItem}>
                                    <Image source={item.userAvatar} style={styles.avatar} />
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                            <View>
                                                <Text style={styles.name}>{item.identify}</Text>
                                                <Text style={styles.timestamp}>12:15</Text>
                                            </View>
                                            <Icons.MaterialIcons
                                                name="more-horiz"
                                                size={24}
                                                color="#73788B"
                                            />
                                        </View>
                                        <Text style={styles.post}>{item.postText}</Text>
                                        {item.postImage && (
                                            <Image
                                                src={item.postImage}
                                                style={styles.postImage}
                                                resizeMode="cover"
                                            />
                                        )}
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                style={{ marginRight: 16 }}
                                                onPress={() => alert('pressed')}>
                                                <Icons.FontAwesome
                                                    name={'heart-o'}
                                                    size={24}
                                                    color="#73788b"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => alert('pressed')}
                                                style={{}}>
                                                <Icons.Fontisto
                                                    name={'comment'}
                                                    size={22}
                                                    color="#73788B"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </Animatable.View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 155,
        borderWidth: 1.5,
        borderColor: 'transparent',
        overflow: 'hidden',
        shadowColor: 'rgba(245, 40, 145, 1)',
        elevation: 1,
        marginHorizontal: '10%',
    },
    seperator: {
        height: 1,
        width: '70%',
        backgroundColor: '#ddd',
        marginVertical: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
    },
    feed: {
        marginHorizontal: 16,
    },
    feedItem: {
        backgroundColor: theme.bgWhite(0.7),
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
    },
    name: {
        fontSize: 16,
        fontFamily: 'Inter-Light',
        color: '#454D65',
    },
    timestamp: {
        fontSize: 11,
        color: '#A4AAC0',
        marginTop: 4,
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899',
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16,
    },
});
