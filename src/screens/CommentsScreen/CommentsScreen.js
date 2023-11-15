import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import { assets } from '../../../react-native.config';

export default function CommentsScreen({ route }) {
    const { item } = route.params;

    console.log(item)
    return (
        <>
            <StatusBar backgroundColor={"transparent"} />
            <Animatable.View
                animation="fadeIn"
                style={{ flex: 1 }}>
                <Image
                    blurRadius={200}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={require('../assets/images/search-bg.jpg')} />

                <View style={{ flex: 1, paddingVertical: '15%' }}>
                    <Text style={{ color: 'white', fontFamily: 'Inter-ExtraBold', textAlign: 'center' }}>{item.title}</Text>
                    <View>
                        <Image source={item.imageUrl} />
                    </View>
                </View>

            </Animatable.View>
        </>
    )
}