import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    FlatList,
    Animated,
} from 'react-native';
import React, { Component, useRef } from 'react';
import { Images } from '../../../constants/Images';

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.6;
const SPACING = 5;

export default function CustomCarousel() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const NewsImages = [{ key: 'left-spacer' }, ...Images, { key: 'right-spacer' }];

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
                            <View style={styles.newsInner}>
                                <Image source={{ uri: item }} style={styles.newsImage} />
                            </View>
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
    },
    spacerContainer: {
        height: 200,
        width: width - ITEM_SIZE / 2,
    },
});
