import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { theme } from '../../../screens/MovieNewsScreen/theme';


export default function Cast({ cast, navigation }) {
    let actorName = 'Леонардо Ди Каприо';
    let characterName = 'Тэдди Дэниэлс';
    return (
        <View style={{ marginVertical: 24 }}>
            <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                    lineHeight: 28,
                    fontFamily: 'Inter-Black',
                    marginHorizontal: 16,
                    marginBottom: 20,
                    textShadowColor: 'rgba(226, 232, 240, 0.25)',
                    textShadowOffset: { width: 0, height: 3 },
                    textShadowRadius: 4,
                }}>
                В главных ролях
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {cast &&
                    cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MoviePersonScreen', person)}
                                key={index}
                                style={{ marginRight: 16, alignItems: 'center' }}>
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        borderRadius: 999,
                                        height: 80,
                                        width: 80,
                                        alignItems: 'center',
                                        borderWidth: 0.75,
                                        borderColor: theme.background,
                                    }}>
                                    <Image
                                        style={{ borderRadius: 16, width: 80, height: 96 }}
                                        source={{
                                            uri: 'https://static.kinoafisha.info/k/persons/1080x1920/upload/persons/195010465372.jpg',
                                        }}
                                    />
                                </View>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 12,
                                        lineHeight: 16,
                                        fontFamily: 'Inter-Light',
                                        marginTop: 4,
                                    }}>
                                    {/* {characterName.length > 10
                                        ? characterName.slice(0, 10) + '...'
                                        : characterName} */}
                                    {characterName}
                                </Text>
                                <Text
                                    style={{
                                        color: 'rgb(163 163 163)',
                                        fontSize: 12,
                                        lineHeight: 16,
                                        fontFamily: 'Inter-Light',
                                        marginTop: 4,
                                    }}>
                                    {actorName.length > 10
                                        ? actorName.slice(0, 10) + '...'
                                        : actorName}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
            </ScrollView>
        </View>
    );
}
