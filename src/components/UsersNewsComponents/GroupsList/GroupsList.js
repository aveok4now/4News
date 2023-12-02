import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { width, height } from '../../../utils/getDimensions';
import { image500 } from '../../../api/moviedb';

export default function GroupsList({ item, navigation }) {
    const handleCardPress = () => {
        navigation.navigate('NewsViewer', {
            url: item.link,
        });
    };

    return (
        <TouchableWithoutFeedback onPress={handleCardPress}>
            <Image
                source={{ uri: item.image }}
                style={{
                    width: width * 0.6,
                    height: height * 0.3,
                    borderRadius: 24,
                }}
            />
        </TouchableWithoutFeedback>
    );
}
