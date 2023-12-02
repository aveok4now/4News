import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { width, height } from '../../../utils/getDimensions';
import * as Animatable from 'react-native-animatable';
import AnimatedText from '../AnimatedText';

export default function GroupsList({ item, navigation, activeSlide, title }) {
    const handleCardPress = () => {
        navigation.navigate('NewsViewer', {
            url: item.link,
        });
    };

    return (
        <View>
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

            {activeSlide === item.id - 1 && (
                <AnimatedText activeSlide={activeSlide} title={title} />
            )}
        </View>
    );
}
