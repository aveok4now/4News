import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable'

export default function FloatingButton({ onPress }) {
    return (
        <Animatable.View
            animation="fadeIn"
            duration={500}
        >
            <TouchableOpacity style={styles.floatButton} onPress={onPress}>
                <Icon name="arrowup" color="white" size={32} />
            </TouchableOpacity>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    floatButton: {
        backgroundColor: 'rgb(15 23 42)',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 20,
        right: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
