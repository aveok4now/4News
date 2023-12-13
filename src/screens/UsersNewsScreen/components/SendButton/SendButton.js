import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Icons } from '../../../../constants/Icons'
import * as Animatable from 'react-native-animatable'

export default function SendButton({ onPress }) {
    return (
        <Animatable.View animation="flipInY" duration={1000}>
            <TouchableOpacity onPress={onPress}>
                <Icons.Ionicons
                    name="send"
                    size={32}
                    //opacity={isTextValid ? 1 : 0}
                    color={'rgb(125 211 252)'}
                />
            </TouchableOpacity>
        </Animatable.View>
    )
}