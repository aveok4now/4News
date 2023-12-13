import { Image, TextInput } from 'react-native';
import React from 'react';
import { theme } from '../../../WeatherScreen/theme';
import { height } from '../../../../utils/global/getDimensions';

export default function PostInput({
    condition,
    inputRef,
    postText,
    checkPerson,
    handleTextChange,
}) {
    return (
        <>
            <Image source={condition} style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                marginRight: 16,
            }} />
            <TextInput
                ref={inputRef}
                autoFocus={false}
                selectionColor="white"
                multiline={true}
                numberOfLines={3}
                maxLength={500}
                style={{
                    flex: 1,
                    fontFamily: 'Inter-Light',
                    maxHeight: height * 0.4,
                    borderLeftWidth: 1,
                    borderLeftColor: theme.bgWhite(0.2),
                    paddingLeft: 10,
                }}
                placeholder="Что у Вас нового?"
                placeholderStyle={{ textAlign: 'center' }}
                value={postText}
                onFocus={checkPerson}
                onChangeText={text => {
                    handleTextChange(text);
                }}
            />
        </>
    );
}

