import { View, Text } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import GroupsList from '../GroupsList'
import { groupsData, setGroupsData } from '../../../screens/UsersNewsScreen/groupsData'
import { width } from '../../../utils/getDimensions'

export default function NewsFooter({ item, navigation }) {
    return (
        <View
            style={{
                width: width,
                paddingBottom: 8,
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
                }}>
                Вам также может понравится:
            </Text>
            <Carousel
                data={groupsData}
                renderItem={({ item }) => (
                    <GroupsList item={item} navigation={navigation} />
                )}
                firstItem={1}
                inactiveSlideOpacity={0.5}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
                layout={'stack'}
                layoutCardOffset={`18`}
            />
        </View>
    )
}