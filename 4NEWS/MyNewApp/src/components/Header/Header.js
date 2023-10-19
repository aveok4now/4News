import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Container } from './styles';

const Header = () => {
    return (
        <Animatable.View style={styles.header} animation="fadeIn" duration={1500}>
            <Text style={styles.text}>Поиск новостей</Text>
            <TouchableOpacity>
                <Icon name="search" size={24} color="#F7F6C5" />
            </TouchableOpacity>

        </Animatable.View>
    );
}

export default Header;
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 4,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#F3FAE1',
        backgroundColor: '#7371FC',
        elevation: 15
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#F7F6C5'
    }
})