import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import defaultImage from '../../screens/assets/images/news-default.jpg';




const Card = ({ item }) => {
    console.log(item);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageUrl = item.urlToImage || defaultImage;

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (

        <Animatable.View style={styles.card} animation="fadeIn" duration={1500}>
            {!imageLoaded && <ActivityIndicator style={styles.loader} />}
            <Text>{item.title}</Text>
            <Animatable.Image
                source={{ uri: imageUrl }}
                style={[
                    styles.image,
                    {
                        opacity: imageLoaded ? 1 : 0
                    }
                ]}
                onLoad={handleImageLoad}
            />
        </Animatable.View>

    );
};

export default Card;

const styles = StyleSheet.create({
    root: {
        flex: 2,
    },
    card: {
        flex: 1,
        height: 200,
        width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginVertical: 4,
        marginBottom: 15,
        marginTop: 15,
        elevation: 15,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 15,
        maxHeight: '100%',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -12.5 }, { translateY: -12.5 }]
    }
});
