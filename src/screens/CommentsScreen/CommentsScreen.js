import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { theme } from '../WeatherScreen/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { Icons } from '../../components/Icons';
import { handleShare } from '../../utils/Share';

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

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 3,
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
                                    style={{ paddingHorizontal: 10 }}
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
        marginHorizontal: '10%'
    },
});
