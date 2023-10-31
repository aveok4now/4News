import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, } from 'react-native';
import { Controller } from 'react-hook-form';
// import { Container } from './styles';
import { assets } from '../../../react-native.config';

const defaultColor1 = '#6274F8'
const CustomInput = ({
    control,
    name,
    rules = {},
    placeholder,
    secureTextEntry,
    setIsTyping,
    selectionColor,
    isUserExist
}) => {

    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur, onFocus }, fieldState: { error } }) => (
                <>
                    <View style={[
                        styles.container,
                        {
                            borderColor: error ? 'red' : '#E8E8E8',
                        },
                        isFocused && styles.inputFocused,
                        { borderColor: !error && isFocused ? '#7af5d1' : error ? 'red' : '#E8E8E8' }
                    ]}>
                        <TextInput
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                if (setIsTyping) setIsTyping(true);
                            }}
                            onBlur={() => {
                                onBlur();
                                if (setIsTyping) setIsTyping(false);
                                setIsFocused(false);
                            }}
                            onFocus={() => setIsFocused(true)}
                            selectionColor={selectionColor || defaultColor1}
                            placeholder={placeholder}
                            style={styles.input}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style={styles.errorText}>
                            {error.message || 'Ошибка'}
                        </Text>
                    )}
                    {rules.isUserExist == "Пользователь с таким именем уже существует" && (
                        <Text style={styles.errorText}>
                            {'Пользователь с таким именем уже существует'}
                        </Text>
                    )}
                </>
            )}
        />

    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#CEEAF7',
        backgroundColor: '#CEEAF770',
        width: '100%',
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        fontFamily: "Inter-Light",

    },
    inputFocused: {
        backgroundColor: '#73A4BD70',

    },


    errorText: {
        fontFamily: "Inter-Regular",
        color: 'red',
        alignSelf: 'stretch',

    },
},)

export default CustomInput;  