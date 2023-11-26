import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../screens/MovieNewsScreen/theme'
import { Icons } from '../../Icons'
import { ios } from '../../../utils/getDimensions'
import { theme } from '../../../screens/MovieNewsScreen/theme'


export default function HeaderButtons({ navigation }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const topMargin = ios ? '' : 12;
    return (
        <SafeAreaView
            style={{
                position: 'absolute',
                zIndex: 20,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
            }}>
            <TouchableOpacity
                style={[
                    styles.background,
                    { borderRadius: 12, padding: 4, marginTop: topMargin },
                ]}
                onPress={() => navigation.goBack()}>
                <Icons.Feather
                    name="chevron-left"
                    size={32}
                    color="white"
                    style={{ alignSelf: 'center' }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[{ borderRadius: 12, padding: 4, marginTop: topMargin }]}
                onPress={() => setIsFavorite(!isFavorite)}>
                <Icons.FontAwesome
                    name="heart"
                    size={32}
                    color={isFavorite ? theme.background : 'white'}
                    style={{ alignSelf: 'center' }}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}