import { View, Text } from 'react-native'
import React from 'react'
import { width, height } from '../../../utils/getDimensions'
import * as Progress from 'react-native-progress'
import { theme } from '../../../screens/MovieNewsScreen/theme'

export default function Loader() {
    return (
        <View style={{ height: height * 0.9, width, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
            <Progress.CircleSnail thickness={8} size={160} color={theme.background} />
        </View>
    )
}