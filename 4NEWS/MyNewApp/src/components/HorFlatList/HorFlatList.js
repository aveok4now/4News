import { View, Text, Dimensions, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

const IMAGE_WIDTH = Dimensions.get("window").width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';


export default function HorFlatList({ item }) {
    const defaultImage = 'https://arbeitgeber.de/wp-content/uploads/2020/11/bda-news-header-1920x1280px-1536x1024.jpg'
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageUrl = item.urlToImage || defaultImage;

    const handleImageLoad = () => {
        setImageLoaded(true);
    };



    return (
        <Animatable.View
            style={styles.root}>
            <Animatable.View style={styles.list} animation="fadeIn" duration={1500}>
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
                //resizeMethod='resize'
                />
            </Animatable.View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#8BC6EC'
    },
    list: {
        //flex: 1,
        //position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 15,
    },
    image: {
        //flex: 1,
        height: 300,
        width: 300,
        resizeMode: 'cover',
        borderRadius: 7,

    },
    loader: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100
    },
})