import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { width, height } from '../../../utils/getDimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Icons } from '../../../components/Icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function MovieSeacrhScreen() {
    const [showSearch, setShowSearch] = useState(true);
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: 'rgb(49 46 129)', display: 'flex' }}>
            <View
                style={{
                    height: '7%',
                    marginLeft: 16,
                    marginRight: 16,
                    position: 'relative',
                    zIndex: 50,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderRadius: 35,
                        backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
                        marginTop: '2%',
                    }}>
                    {showSearch ? (
                        <TextInput
                            placeholder="Искать фильмы 🎥"
                            style={{
                                paddingLeft: 24,
                                height: 40,
                                flex: 1,
                                fontSize: 16,
                                lineHeight: 24,
                                fontFamily: 'Inter-Light',
                                paddingBottom: 8,
                            }}
                            selectionColor="white"
                            placeholderTextColor={'lightgray'}
                        />
                    ) : null}

                    <TouchableOpacity
                        onPress={() => setShowSearch(!showSearch)}
                        style={{
                            borderRadius: 999,
                            padding: 10,
                            margin: 2,
                            backgroundColor: theme.bgWhite(0.3),
                        }}>
                        <Icons.Ionicons name="search-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
