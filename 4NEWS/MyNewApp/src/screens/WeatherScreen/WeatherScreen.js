import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomDrawer from '../../components/customs/CustomDrawer'




export default function WeatherScreen({ navigation }) {
    return (
        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            style={{ width: '100%', flex: 1, }}
        >
            <CustomDrawer type="Прогноз погоды" backgroundColor="#5b86e5" fgColor="#458fe6" elevation={35} navigation={navigation}>
                <View style={styles.root}>
                    <Text>Прогноз погоды</Text>
                </View>
            </CustomDrawer>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})