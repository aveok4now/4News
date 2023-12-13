import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Icons } from '../../../../utils/global/Icons'
import * as Animatable from 'react-native-animatable'
import CustomButton from '../../../../components/customs/CustomButton'
import { theme } from '../../../WeatherScreen/theme'

export default function Input({ inputRef, identify, inputText, setInputText, handlePublishComment }) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                ref={inputRef}
                style={{ fontFamily: 'Inter-Light', fontSize: 20, width: '100%' }}
                placeholder={`Что думаете, ${identify}?`}
                selectionColor="white"
                placeholderTextColor="whitesmoke"
                multiline={true}
                numberOfLines={2}
                value={inputText}
                onChangeText={text => setInputText(text)}
            />
            {inputText.length > 0 && (
                <Animatable.View
                    animation="flipInX"
                    duration={1000}
                    style={{ position: 'absolute', top: 0, right: 5 }}>
                    <TouchableOpacity onPress={() => setInputText('')}>
                        <Icons.MaterialCommunityIcons
                            name="close-circle"
                            size={32}
                        />
                    </TouchableOpacity>
                </Animatable.View>
            )}
            {inputText.length > 5 && (
                <Animatable.View
                    style={{ width: '80%', alignSelf: 'center' }}
                    animation="fadeIn"
                    duration={500}>
                    <CustomButton
                        onPress={handlePublishComment}
                        text="Опубликовать"
                        showBorder
                    />
                </Animatable.View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        margin: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        paddingHorizontal: 32,
        borderWidth: 0.5,
        borderColor: theme.bgWhite(0.1),
        backgroundColor: theme.bgWhite(0.2),
    },
})