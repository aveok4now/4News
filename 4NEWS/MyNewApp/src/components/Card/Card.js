import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';




const Card = ({ item }) => {
    const defaultImage = 'https://arbeitgeber.de/wp-content/uploads/2020/11/bda-news-header-1920x1280px-1536x1024.jpg'

    console.log(item);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageUrl = item.urlToImage || defaultImage;

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <LinearGradient // Оберните карточку в LinearGradient
            colors={['#4568dc', '#b06ab3']}

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

                    <Text style={styles.description}>{item.author || ''} </Text>
                    <Text style={[styles.description, { marginVertical: 1, color: 'white' }]}>
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
                <View style={styles.source}>
                    <Text style={styles.sourceText}>Источник: {item.source.name}</Text>
                </View>

            </Animatable.View>
        </LinearGradient>
    );
};

export default Card;

const styles = StyleSheet.create({
    root: {
        flex: 2,
    },
    card: {
        flex: 1,
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
        resizeMode: 'contain',
        borderRadius: 7,
    },
    loader: {
        position: 'absolute',
        top: '50%',
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
        fontWeight: '600'
    },
    description: {
        fontSize: 12,
        lineHeight: 16,
        marginVertical: 4,
        color: '#E2E2E2',
        fontWeight: '700',

    },

    source: {
        position: 'absolute',
        top: 14,
        right: 5,
        backgroundColor: '#55D6BE',
        borderRadius: 5,
        padding: 5
    },

    sourceText: {
        color: 'black',
        fontWeight: '500',

    }

});
