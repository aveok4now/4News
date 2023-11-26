import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { width, height } from '../../../utils/getDimensions';

export default function MovieCard({ item, handleCardPress }) {

    return (
        <TouchableWithoutFeedback onPress={handleCardPress}>
            <Image
                source={require('../../../screens/assets/images/backgr.jpg')}
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
