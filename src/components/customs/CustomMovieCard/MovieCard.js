import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { width, height } from '../../../utils/getDimensions';
import { image500 } from '../../../api/moviedb';

export default function MovieCard({ item, handleCardPress }) {

    console.log("Постер", item.poster_path)

    return (
        <TouchableWithoutFeedback onPress={handleCardPress}>
            <Image
                source={{ uri: image500(item.poster_path) }}
                style=
                {{
                    width: width * 0.6,
                    height: height * 0.4,
                    borderRadius: 24

                }}
            />
            {/* <Text style={{ color: 'white', fontFamily: 'Inter-Light' }}>Фильм</Text> */}
        </TouchableWithoutFeedback>
    );
}
