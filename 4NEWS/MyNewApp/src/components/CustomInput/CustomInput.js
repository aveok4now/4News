import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
// import { Container } from './styles';

const CustomInput = ({
    control,
    name,
    rules = {},
    placeholder,
    secureTextEntry,
    setIsTyping,
}) => {
    return (

        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <View style={[styles.container, { borderColor: error ? 'red' : '#E8E8E8' }]}>
                        <TextInput
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                setIsTyping(true);
                            }}
                            onBlur={() => {
                                onBlur();
                                setIsTyping(false);
                            }}
                            placeholder={placeholder}
                            style={styles.input}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Ошибка'}</Text>)}
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
    input: {},
})

export default CustomInput;  