import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';


export default function FavoritesScreen({ navigation }) {
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        try {
            const savedNewsItems = await AsyncStorage.getItem('savedNewsItems');
            const parsedSavedNewsItems = JSON.parse(savedNewsItems) || [];
            setFavorites(parsedSavedNewsItems);
        } catch (error) {
            console.error('Error loading saved news items:', error);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);
    return (
        <View>
            <Text>Favorites</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.url}
                renderItem={({ item }) => {
                    return <Card item={item} navigation={navigation} />;
                }}
            />
        </View>
    );
}

