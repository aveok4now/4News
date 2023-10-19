import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';


const HomeScreen = () => {
    return (
        <View>
            <Header />
            <Text style={{ fontSize: 24, alignItems: 'center', color: 'white' }}>
                Новости будут здесь ...
            </Text>
        </View>
    );
}

export default HomeScreen;