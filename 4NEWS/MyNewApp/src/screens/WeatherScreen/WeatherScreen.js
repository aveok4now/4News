import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'


export default function WeatherScreen() {
    return (
        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            style={{ width: '100%', flex: 1 }}
        >

            <View style={styles.root}>
                <Text>Прогноз погоды</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})