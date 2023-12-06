import { View, Text } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { width, height } from '../../../utils/getDimensions'
import { theme } from '../../MovieNewsScreen/theme'

export default function InfoCarousel({ data, setActiveSlide }) {
    return (
        <Carousel
            autoplay={true}
            autoplayDelay={2000}
            autoplayInterval={3000}
            data={data}
            renderItem={({ item, index }) => (
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: theme.bgWhite(0.1),
                        width: width * 0.6,
                        height: height * 0.3,
                        backgroundColor: theme.bgWhite(0.2),
                        borderRadius: 16,
                        marginTop: 16
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Inter-ExtraBold',
                            marginLeft: 8,
                            fontSize: 24,
                        }}>
                        {item.title}
                    </Text>
                    <View
                        style={{
                            alignItems: 'center',
                            position: 'absolute',
                            top: '25%',
                            right: 0,
                            left: 0,
                        }}>
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 60 }}>
                            {item.count}
                        </Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, right: 5 }}>
                        {item.icon}
                    </View>
                </View>
            )}
            firstItem={0}
            inactiveSlideOpacity={0.5}
            sliderWidth={width}
            sliderHeight={width}
            itemWidth={width * 0.62}
            slideStyle={{ display: 'flex', alignItems: 'center' }}
            onSnapToItem={index => setActiveSlide(index)}
        />
    )
}