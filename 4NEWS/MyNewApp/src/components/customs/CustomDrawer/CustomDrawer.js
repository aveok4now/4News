import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text, Image } from 'react-native';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable'
import useUserCredentials from '../../../utils/useUserCredentials';
import useUserEmail from '../../../utils/useUserEmail';
import { assets } from '../../../../react-native.config';

export default function CustomDrawer({
    children,
    backgroundColor,
    fgColor,
    type,
    showSearch,
    navigation,
    elevation = 0
}) {

    let identify = useUserCredentials()
    let userEmail = useUserEmail()

    const [showMenu, setShowMenu] = useState(false);
    const moveToRight = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const toggleMenu = () => {
        Animated.parallel([
            Animated.timing(scale, {
                toValue: showMenu ? 1 : 0.75,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(moveToRight, {
                toValue: showMenu ? 0 : 200,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
        setShowMenu(!showMenu);
    };

    return (
        <View style={{ flex: 1, borderRadius: showMenu ? 15 : 0 }}>
            {showMenu && (
                <Animatable.View animation="fadeIn"
                    style={{ flex: 1 }}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 40
                    }}>
                        <Image source={require('../../../../assets/images/user.jpg')}
                            style={{ width: 70, height: 70, borderRadius: 35, marginLeft: 20 }} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 22, fontFamily: "Inter-Bold" }}>
                                {identify}
                            </Text>
                            <Text style={{ fontSize: 22, fontFamily: "Inter-Bold" }}>
                                {userEmail}
                            </Text>
                        </View>
                    </View>

                </Animatable.View>
            )}
            <Animated.View
                style={{
                    flex: 1,
                    backgroundColor: fgColor,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    transform: [{ scale: scale }, { translateX: moveToRight }],
                    borderRadius: showMenu ? 15 : 0,
                    // elevation: showMenu ? 35 : 0,
                    // shadowOpacity: showMenu ? 1 : 0,
                    elevation: elevation
                }}
            >
                <View
                    style={[
                        styles.header,
                        { backgroundColor: backgroundColor, borderTopLeftRadius: showMenu ? 15 : 0, },
                    ]}
                >
                    <TouchableOpacity onPress={toggleMenu}>
                        <Icon2 name="menu" size={24} color="white" style={{ transform: showMenu ? [{ rotate: '90deg' }] : [], }} />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.text}>{type}</Text>
                    </View>
                    {showSearch == "true" && (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <Icon name="search" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
                {children}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // borderWidth: 0.25,
        // borderColor: '#F3FAE1',
        alignItems: 'center',
    },
    headerTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter-Light',
        textAlign: 'center',
    },
});