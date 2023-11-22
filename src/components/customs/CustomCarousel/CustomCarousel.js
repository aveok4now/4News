import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    FlatList,
    Animated,
    TouchableOpacity,
} from 'react-native';
import React, { Component, useRef } from 'react';
import { Images, Captions, ruCaptions } from '../../../constants/Images';

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.5;
const SPACING = 5;

export default function CustomCarousel({ navigation, apiKeyList, apiKeyIndex }) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const NewsImages = [{ key: 'left-spacer' }, ...Images, { key: 'right-spacer' }];

    const handleCategoryPressed = (ruCaption, curCaption) => {
        switch (ruCaption, curCaption) {
            // case 'weather':
            //     navigation.navigate('Weather Screen');
            //     break;
            default:
                newsByCategoryNavigation(ruCaption, curCaption);
                break;
        }
    };

    const newsByCategoryNavigation = (ruCaption, curCaption) => {
        try {
            navigation.navigate('Новости по категориям', {
                apiKeyList: apiKeyList,
                apiKeyIndex: apiKeyIndex,
                caption: curCaption,
                ruCaption: ruCaption
            });
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                horizontal
                data={NewsImages}
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_SIZE}
                bounces={false}
                scrollEventThrottle={16}
                contentContainerStyle={{ alignItems: 'center' }}
                keyExtractor={(item, index) => `${index}`}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true },
                )}
                renderItem={({ item, index }) => {
                    if (item.key === 'left-spacer' || item.key === 'right-spacer') {
                        return <View style={{ width: (width - ITEM_SIZE) / 2 }} />;
                    }

                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                    ];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [70, -30, 70],
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.newsContainer,
                                {
                                    transform: [{ translateY }],
                                    opacity,
                                },
                            ]}>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                onPress={() => handleCategoryPressed(ruCaptions[index - 1], Captions[index - 1])}>
                                <View style={styles.newsInner}>
                                    <Image source={{ uri: item }} style={styles.newsImage} />

                                    <Text style={styles.caption}>{ruCaptions[index - 1]}</Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    newsContainer: {
        width: ITEM_SIZE,
    },
    newsInner: {
        alignItems: 'center',
        marginHorizontal: SPACING,
        padding: SPACING * 2,
        borderRadius: 34,
    },
    newsImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
        marginTop: '15%',
    },
    spacerContainer: {
        height: 200,
        width: width - ITEM_SIZE / 2,
    },
    caption: {
        color: 'white',
        fontFamily: 'Inter-Light',
        fontSize: 20,
        textShadowColor: 'rgba(226, 232, 240, 0.25)',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 4,
    },
});
