import { View, Text } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { width, height } from '../../../utils/getDimensions';
import { theme } from '../../MovieNewsScreen/theme';
import LinearGradient from 'react-native-linear-gradient';
import GradientBackground from '../../../components/GradientBackground';
import AnimatedText from '../../../components/UsersNewsComponents/AnimatedText';

export default function AppInfoCarousel({ activeSlide, data, setActiveSlide }) {


    return (
        <Carousel
            //autoplay={true}
            //autoplayDelay={2000}
            //autoplayInterval={6000}
            data={data}
            renderItem={({ item, index }) => (
                <>
                    <GradientBackground
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        //colors={[theme.bgWhite(0.1), '#FFDD0094']}
                        colors={[item.color1, item.color2]}
                        style={{
                            borderWidth: 1,
                            borderColor: theme.bgWhite(0.1),
                            width: width * 0.8,
                            height: height * 0.15,
                            backgroundColor: theme.bgWhite(0.2),
                            borderRadius: 16,
                            //marginTop: 16
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Inter-ExtraBold',
                                marginLeft: 8,
                                fontSize: 24,
                                textAlign: 'left',
                                position: 'absolute',
                                top: 10,
                            }}>
                            {item.title}
                        </Text>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                            }}>
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 60, left: 5 }}>
                                {item.count}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                            {item.icon}
                        </View>

                    </GradientBackground>
                    {activeSlide === item.id - 1 && (
                        <AnimatedText activeSlide={activeSlide} title={item.description} />
                    )}
                </>
            )}
            firstItem={0}
            inactiveSlideOpacity={0.6}
            sliderWidth={width}
            sliderHeight={width}
            itemWidth={width * 0.62}
            slideStyle={{ display: 'flex', alignItems: 'center' }}
            onSnapToItem={index => setActiveSlide(index)}
            layout={'stack'}
            layoutCardOffset={`18`}
        />
    );
}
