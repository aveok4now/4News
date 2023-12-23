import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Controller } from 'react-hook-form';
import EyeIcon from 'react-native-vector-icons/Entypo';
import { theme } from '../../../screens/WeatherScreen/theme';

const defaultColor1 = 'white';
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  setIsTyping,
  selectionColor,
  needTrim = true,
  isPasswordVisible,
  onPasswordVisibilityChange,
  showeye = true,
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const [isEyeFocused, setIsEyeFocused] = useState(false);
  const [placeholderTextColor, setPlaceHolderTextColor] =
    useState('rgb(249 250 251)');
  const [isFirstPress, setIsFirstPress] = useState(true);

  const handleButtonPress = () => {
    onPasswordVisibilityChange();
    setIsEyeFocused(true);
  };

  const getSelectionColor = (error, isFocused, isFirstPress, value) => {
    if (error && isFocused) {
      if (isFirstPress || value?.length === 0) {
        return 'rgb(239 68 68)';
      }
      if (value?.length >= 1) {
        return defaultColor1;
      }
    }
    return '#7af5d1';
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
                  !error && isFocused
                    ? '#7af5d1'
                    : error
                      ? 'rgb(127 29 29)'
                      : '#E8E8E8',
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

                if (setIsTyping) {
                  setIsTyping(true);
                }

                if (isFirstPress) {
                  setIsFirstPress(false);
                }
              }}
              onBlur={() => {
                onBlur();
                if (setIsTyping) {
                  setIsTyping(false);
                }
                setIsFocused(false);
                setPlaceHolderTextColor('rgb(249 250 251)');
              }}
              onFocus={() => {
                setIsFocused(true);
                setPlaceHolderTextColor('rgb(229 231 235)');
              }}
              selectionColor={getSelectionColor(
                error,
                isFocused,
                isFirstPress,
                value,
              )}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              style={styles.input}
              secureTextEntry={isPasswordVisible}
            />
            {secureTextEntry && !isFocused && value && value.length > 0 && (
              <TouchableOpacity
                onPress={handleButtonPress}
                style={styles.eyeIcon}>
                {showeye && (
                  <EyeIcon
                    name={isPasswordVisible ? 'eye' : 'eye-with-line'}
                    size={24}
                  />
                )}
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
    //backgroundColor: '#CEEAF770',
    //backgroundColor: '#73A4BD70',
    backgroundColor: theme.bgWhite(0.1),
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
    color: 'white',
  },
  inputFocused: {
    backgroundColor: '#73A4BD70',
  },

  errorText: {
    fontFamily: 'Inter-Bold',
    color: 'rgb(127 29 29)',
    alignSelf: 'stretch',
  },

  eyeIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
  },
});

export default CustomInput;
