import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Icons } from '../../../../constants/Icons'
import { theme } from '../../theme'

export default function AdditionalInfo({ combinedInfo }) {
    return (
        <View style={{ marginBottom: 80 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginLeft: 12,
                }}>
                <Icons.Ionicons name="information-circle-outline" size={28} color="white" />
                <Text style={{ fontFamily: 'Inter-Light', color: 'white' }}>
                    {'  '}
                    Дополнительная информация на{' '}
                    <Text style={{ fontFamily: 'Inter-ExtraBold' }}>Сегодня</Text>
                </Text>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}>
                {combinedInfo.map(({ key, value }) => (
                    <View
                        key={key}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 106,
                            borderRadius: 24,
                            paddingVertical: 12,
                            marginTop: 8,
                            marginRight: 16,
                            backgroundColor: theme.bgWhite(0.15),
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: key.length < 30 ? 12 : 10,
                                fontFamily: 'Inter-Light',
                                textAlign: 'center',
                            }}>
                            {key}
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontFamily: 'Inter-ExtraBold',
                            }}>
                            {value}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}