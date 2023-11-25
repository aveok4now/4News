import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Controller } from 'react-hook-form';
// import { Container } from './styles';
import { assets } from '../../../react-native.config';
import EyeIcon from 'react-native-vector-icons/Entypo';

const defaultColor1 = 'white';
const CustomInput = ({
    control,
    name,
    rules = {},
    placeholder,
    secureTextEntry,
    setIsTyping,
    selectionColor,
    isUserExist,
    needTrim = true
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
    const [iseyeFocused, setIseyeFocused] = useState(false);

    const handleButtonPress = () => {
        setIsPasswordVisible(!isPasswordVisible);
        //setIsFocused(true);
        setIseyeFocused(true);
    };

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                field: { value, onChange, onBlur, onFocus },
                fieldState: { error },
            }) => (
                <>
                    <View
                        style={[
                            styles.container,
                            {
                                borderColor: error ? 'red' : '#E8E8E8',
                            },
                            isFocused && styles.inputFocused,
                            {
                                borderColor:
                                    !error && isFocused ? '#7af5d1' : error ? 'red' : '#E8E8E8',
                            },
                        ]}>
                        <TextInput
                            value={value}
                            onChangeText={text => {
                                if (text.includes(' ') && needTrim) {
                                    onChange(text.trim());
                                } else {
                                    onChange(text);
                                }

                                if (setIsTyping) setIsTyping(true);
                            }}
                            onBlur={() => {
                                onBlur();
                                if (setIsTyping) setIsTyping(false);
                                setIsFocused(false);
                            }}
                            onFocus={() => setIsFocused(true)}
                            selectionColor={error ? 'rgb(239 68 68)' : selectionColor || defaultColor1}
                            placeholder={placeholder}
                            style={styles.input}
                            secureTextEntry={isPasswordVisible}
                        />
                        {secureTextEntry && !isFocused && value && value.length > 0 && (
                            <TouchableOpacity
                                onPress={handleButtonPress}
                                style={styles.eyeIcon}>
                                <EyeIcon
                                    name={isPasswordVisible ? 'eye' : 'eye-with-line'}
                                    size={24}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    {error && (
                        <Text style={styles.errorText}>{error.message || 'Ошибка'}</Text>
                    )}
                    {rules.isUserExist ==
                        'Пользователь с таким именем уже существует' && (
                            <Text style={styles.errorText}>
                                {'Пользователь с таким именем уже существует'}
                            </Text>
                        )}
                </>
            )}
        />
    );
};

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
        fontFamily: 'Inter-Light',
    },
    inputFocused: {
        backgroundColor: '#73A4BD70',
    },

    errorText: {
        fontFamily: 'Inter-Regular',
        color: 'red',
        alignSelf: 'stretch',
    },

    eyeIcon: {
        position: 'absolute',
        top: 12,
        right: 10,
    },
});

export default CustomInput;
