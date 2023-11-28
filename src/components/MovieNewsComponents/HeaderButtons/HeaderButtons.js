import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../../../screens/MovieNewsScreen/theme';
import { Icons } from '../../Icons';
import { ios } from '../../../utils/getDimensions';
import { theme } from '../../../screens/MovieNewsScreen/theme';
import { getItem, setItem } from '../../../utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeaderButtons({ navigation, movie }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const topMargin = ios ? '' : 12;

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadLikes();
    }, [movie.id]);

    const handleLike = async movieId => {
        try {
            // if (identify == 'Гость') {
            //     setShowModal(!showModal);
            //     setIsLiked(false);
            //     return;
            // }

            const likedMovies = await AsyncStorage.getItem('likedMovies');
            const parsedLikedMovies = JSON.parse(likedMovies) || [];

            const isAlreadySaved = parsedLikedMovies.some(
                savedItem => savedItem.id === movieId,
            );

            if (!isAlreadySaved) {
                parsedLikedMovies.push(movie);
                await AsyncStorage.setItem(
                    'likedMovies',
                    JSON.stringify(parsedLikedMovies),
                );
                setIsFavorite(true);
                console.log('saved');
            } else {
                const updatedSavedMovies = parsedLikedMovies.filter(
                    savedItem => savedItem.id !== movieId,
                );
                await AsyncStorage.setItem(
                    'likedMovies',
                    JSON.stringify(updatedSavedMovies),
                );
                setIsFavorite(false);
                console.log('removed');
            }
        } catch (error) {
            console.log('Ошибка сохранения лайка: ', error);
        }
    };

    const loadLikes = async () => {
        try {
            const likedMovies = await AsyncStorage.getItem('likedMovies');
            const parsedLikedMovies = JSON.parse(likedMovies) || [];
            setFavorites(parsedLikedMovies);

            const isLiked = parsedLikedMovies.some(
                savedItem => savedItem.id === movie.id,
            );
            setIsFavorite(isLiked);
        } catch (error) {
            console.log('Ошибка загрузки сохраненных лайков: ', error);
        }
    };

    return (
        <SafeAreaView
            style={{
                position: 'absolute',
                zIndex: 20,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
            }}>
            <TouchableOpacity
                style={[
                    styles.background,
                    { borderRadius: 12, padding: 4, marginTop: topMargin },
                ]}
                onPress={() => navigation.goBack()}>
                <Icons.Feather
                    name="chevron-left"
                    size={32}
                    color="white"
                    style={{ alignSelf: 'center' }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[{ borderRadius: 12, padding: 4, marginTop: topMargin }]}
                onPress={() => handleLike(movie.id)}>
                <Icons.FontAwesome
                    name="heart"
                    size={32}
                    color={isFavorite ? theme.background : 'white'}
                    style={{ alignSelf: 'center' }}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
