import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

export default function MenuItems({ item, index, icon, color, selectedMenuItem, onItemPress, isSelected }) {
    return (
        <TouchableOpacity
            style={{
                width: 200,
                height: 50,
                marginLeft: 20,
                marginTop: 20,
                flexDirection: 'row',
                backgroundColor:
                    index === selectedMenuItem ? '#9fb4f0' : 'transparent',
                borderRadius: 10,
                alignItems: 'center',
                elevation: isSelected ? 5 : 0,
                justifyContent: 'flex-start',
            }}
            onPress={onItemPress}
        >
            {icon && (
                <Animatable.View
                    style={{ marginLeft: 10 }}
                    animation="fadeIn">
                    {React.cloneElement(icon, {
                        color: isSelected ? 'black' : color,
                        width: 24,
                        height: 24,
                    })}
                </Animatable.View>
            )}

            <Text
                style={{
                    marginLeft: 20,
                    fontFamily: 'Inter-Light',
                    color: isSelected ? 'black' : 'white',
                    fontSize: 18,
                }}>
                {item.title}
            </Text>
        </TouchableOpacity>
    )
}