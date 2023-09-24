import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// import { Container } from './styles';

const CustomButton = ({ onPress, text, type = "Primary", bgColor, fgColor }) => {
    return (
        <Pressable onPress={onPress}
            style={[
                styles.container,
                styles[`container_${type}`],
                bgColor ? { backgroundColor: bgColor } : {},
            ]}>
            <Text
                style={[styles.text,
                styles[`text_${type}`],
                fgColor ? { color: fgColor } : {},
                ]}>
                {text}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    container: {

        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },

    container_Primary: {
        backgroundColor: '#648DE5',
    },

    container_Tertiary: {

    },

    container_Secondary: {
        borderColor: '#648DE5',
        borderWidth: 1.25,
    },

    text: {
        fontWeight: 'bold',
        color: 'white'
    },

    text_Tertiary: {
        color: '#FCF7F8',
    },

    text_Secondary: {
        color: '#3B71F3',
    },


});

export default CustomButton;