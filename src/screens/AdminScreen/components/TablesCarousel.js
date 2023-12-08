import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { width, height } from '../../../utils/getDimensions';
import { theme } from '../../MovieNewsScreen/theme';
import UserTable from './UserTable';

export default function TablesCarousel({ data, setActiveSlide, navigation, usersData }) {
    const [showTable, setShowTable] = useState(false);
    return (
        <>
            <Carousel
                //autoplay={true}
                // autoplayDelay={2000}
                //autoplayInterval={3000}
                data={data}
                renderItem={({ item, index }) => (

                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: theme.bgWhite(0.1),
                            width: width * 0.55,
                            height: height * 0.25,
                            backgroundColor: theme.bgWhite(0.2),
                            borderRadius: width * 0.3,
                            marginTop: 16,
                        }}>
                        <View
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setShowTable(!showTable)}>{item.icon}</TouchableOpacity>
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
            {showTable && (
                <UserTable users={usersData} />
            )}
        </>

    );
}
