import { View, Text } from 'react-native'
import React from 'react'

export default function DetailItem({ label, value, isLastItem }) {
    return (
        <View
            style={{
                borderRightWidth: isLastItem ? 0 : 2,
                borderRightColor: 'rgb(163 163 163)',
                paddingHorizontal: 8,
                alignItems: 'center',
            }}>
            <Text
                style={{
                    fontSize: 16,
                    lineHeight: 24,
                    fontFamily: 'Inter-SemiBold',
                    color: 'white',
                }}>
                {label}
            </Text>
            <Text
                style={{
                    fontSize: 14,
                    lineHeight: 20,
                    fontFamily: 'Inter-Light',
                    color: 'rgb(163 163 163)',
                }}>
                {value}
            </Text>
        </View>
    )
}