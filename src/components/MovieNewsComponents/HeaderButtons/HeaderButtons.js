import { SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../../../screens/MovieNewsScreen/theme';
import { Icons } from '../../../constants/Icons';
import { ios } from '../../../utils/global/getDimensions';
import { theme } from '../../../screens/MovieNewsScreen/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import useUserCredentials from '../../../utils/hooks/useUserCredentials';

export default function HeaderButtons({
  navigation,
  movie,
  showModal,
  setShowModal,
}) {
  let identify = useUserCredentials();

  const [isFavorite, setIsFavorite] = useState(false);
  const topMargin = ios ? '' : 12;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadLikes(movie.id);
  }, [movie.id]);

  const handleLike = async movieId => {
    try {
      const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

      await db.executeSql(`
                    CREATE TABLE IF NOT EXISTS likedMovies (
                    id INTEGER PRIMARY KEY,
                    title TEXT
        );
    `);

      if (identify == 'Гость') {
        setShowModal(true);
        setIsLiked(false);
        throw 'Guest tried to save movie';
      }

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

        await db.executeSql(
          'INSERT INTO likedMovies (id, title) VALUES (?, ?)',
          [movie.id, movie.title],
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
        await db.executeSql('DELETE FROM likedMovies WHERE id = ?', [movieId]);

        setIsFavorite(false);
        console.log('removed');
      }
    } catch (error) {
      console.log('Ошибка сохранения лайка: ', error);
    }
  };

  const loadLikes = async movieId => {
    try {
      const likedMovies = await AsyncStorage.getItem('likedMovies');
      const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

      const parsedLikedMovies = JSON.parse(likedMovies) || [];
      setFavorites(parsedLikedMovies);

      const isLiked = parsedLikedMovies.some(
        savedItem => savedItem.id === movie.id,
      );
      setIsFavorite(isLiked);

      const result = await db.executeSql(
        'SELECT * FROM likedMovies WHERE id = ?',
        [movieId],
      );

      if (result[0].rows.length > 0) {
        const movieDataFromDB = result[0].rows.item(0);
        const updatedMovie = { ...movieDataFromDB, title: movie.title };
        await db.executeSql('UPDATE likedMovies SET title = ? WHERE id = ?', [
          updatedMovie.title,
          movieId,
        ]);

        console.log('Данные из базы данных:', updatedMovie);
      } else {
        console.log('Фильм не найден в базе данных');
      }
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
