import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Carousel, Pagination } from 'react-native-snap-carousel';
import GroupsList from '../GroupsList';
import {
    groupsData,
    setGroupsData,
} from '../../../screens/UsersNewsScreen/groupsData';
import { width } from '../../../utils/getDimensions';

export default function NewsFooter({ navigation }) {
    const [activeSlide, setActiveSlide] = useState(2);

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                paddingBottom: 8,
                justifyContent: 'center',
            }}>
            <Text
                style={{
                    color: 'white',
                    fontFamily: 'Inter-Black',
                    fontSize: 20,
                    lineHeight: 28,
                    textShadowColor: 'rgba(226, 232, 240, 0.25)',
                    textShadowOffset: { width: 0, height: 3 },
                    textShadowRadius: 4,
                    marginBottom: 8,
                }}>
                Вам также может понравится:
            </Text>
            <Carousel
                autoplay={true}
                autoplayDelay={2000}
                autoplayInterval={3000}
                data={groupsData}
                renderItem={({ item, index }) => (
                    <GroupsList
                        item={item}
                        navigation={navigation}
                        activeSlide={activeSlide}
                        title={item.title}
                    />
                )}
                firstItem={2}
                inactiveSlideOpacity={0.5}
                sliderWidth={width}
                sliderHeight={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
                layout={'stack'}
                layoutCardOffset={`24`}
                onSnapToItem={index => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={groupsData.length}
                activeDotIndex={activeSlide}
                containerStyle={{ alignSelf: 'center' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                }}
                inactiveDotStyle={{
                    backgroundColor: 'blue',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
            <Text
                style={{
                    position: 'absolute',
                    bottom: 0,
                    opacity: 0.5,
                    fontFamily: 'Inter-Light',
                    textAlign: 'center',
                    alignSelf: 'center',
                }}>
                dtb4life, 2023
            </Text>
        </View>
    );
}
