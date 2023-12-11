import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { Icons } from '../../../../../../../../components/Icons'

export default function ShowMoreButton({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 8,
            }}>
            <Icons.EvilIcons name="arrow-down" size={40} color="white" />
            <Text style={{ fontFamily: 'Inter-Light', opacity: 0.6 }}>
                Показать ещё
            </Text>
        </TouchableOpacity>
    )
}