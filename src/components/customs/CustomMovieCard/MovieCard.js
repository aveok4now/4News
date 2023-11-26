import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { width, height } from '../../../utils/getDimensions';

export default function MovieCard({ item, handleCardPress }) {

    return (
        <TouchableWithoutFeedback onPress={handleCardPress}>
            <Image
                source={{ uri: 'https://avatars.mds.yandex.net/get-ott/2439731/2a0000017c2848de9b46e75b6e6d33e7be3d/375x375' }}
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
