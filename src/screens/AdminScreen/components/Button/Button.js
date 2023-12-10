import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme } from '../../../MovieNewsScreen/theme'
import { width } from '../../../../utils/getDimensions'

export default function Button({ onPress, children }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    alignSelf: 'center',
                    width: width * 0.45,
                    height: width * 0.15,
                    backgroundColor: theme.bgWhite(0.1),
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    borderRadius: 8,
                    alignItems: 'center',
                    marginVertical: 8
                }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}