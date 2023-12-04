import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable'

export default function FloatingButton({ onPress }) {
    return (
        <Animatable.View
            animation="fadeIn"
            duration={100}
            style={styles.container}
        >
            <TouchableOpacity style={styles.floatButton} onPress={onPress}>
                <Icon name="arrowup" color="white" size={32} />
            </TouchableOpacity>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    floatButton: {
        backgroundColor: 'rgb(15, 23, 42)',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});