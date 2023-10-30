import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text, Image, FlatList } from 'react-native';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable'
import useUserCredentials from '../../../utils/useUserCredentials';
import useUserEmail from '../../../utils/useUserEmail';
import { assets } from '../../../../react-native.config';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

    const [selectedMenuItem, setSelectedMenuItem] = useState(1)


    const toggleMenu = () => {
        Animated.parallel([
            Animated.timing(scale, {
                toValue: showMenu ? 1 : 0.7,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(moveToRight, {
                toValue: showMenu ? 0 : 250,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
        setShowMenu(!showMenu);

        //setSelectedMenuItem(selectedMenuItem)
    };

    const menu = [
        { icon: 'home', title: 'Домашняя страница' },
        { icon: 'newspaper', title: 'Новости' },
        { icon: 'star', title: 'Избранное' },
        { icon: 'cloud-sun-rain', title: 'Погода' },
        { icon: 'university', title: 'Университет' },
        { icon: 'email', title: 'Связь с нами' },
        { icon: 'logout', title: 'Выход' },

    ];

    const iconMap = {
        Новости: { icon: <Icon3 size={24} />, color: 'white' },
        Выход: { icon: <Icon2 size={24} />, color: 'white' },
        'Связь с нами': { icon: <Icon4 size={24} />, color: 'white' },
        default: { icon: <Icon size={24} />, color: 'white' },
    };


    const getIconInfo = (title, item) => {
        const iconInfo = iconMap[title] || iconMap.default;
        return {
            icon: React.cloneElement(iconInfo.icon, { name: item.icon }),
            color: iconInfo.color,
        };
    };



    const handleMenuItemPress = async (index) => {

        //setSelectedMenuItem(index);
        //toggleMenu();

        switch (index) {
            case 0:
                // Обработка нажатия на "Домашняя страница"
                break;
            case 1:
                //setShowMenu(!showMenu)
                //toggleMenu(index)
                //toggleMenu()
                toggleMenu();
                setSelectedMenuItem(index)
                navigation.navigate("Домашняя страница")
                toggleMenu()
                setSelectedMenuItem(index)
                //setSelectedMenuItem(1)

                break;
            case 2:
                //toggleMenu(index)
                //setSelectedMenuItem(index)
                toggleMenu()
                setSelectedMenuItem(index)
                navigation.navigate("FavoritesScreen")
                toggleMenu()
                setSelectedMenuItem(index)

                break;
            case 3:
                //toggleMenu()
                toggleMenu();
                setSelectedMenuItem(index)
                navigation.navigate("Weather Screen")

                toggleMenu()
                setSelectedMenuItem(index)

                break;
            case 6:
                // Обработка нажатия на "Выход"
                const savedUsername = await AsyncStorage.getItem('username');
                const savedPassword = await AsyncStorage.getItem('password');

                if (savedUsername) {
                    await AsyncStorage.removeItem(savedUsername);
                }

                if (savedPassword) {
                    await AsyncStorage.removeItem(savedPassword);
                }

                const isGuestUser = savedUsername === 'guest';

                if (isGuestUser) {
                    await AsyncStorage.removeItem('guestID');
                }

                await AsyncStorage.setItem('loggedOut', 'true');
                navigation.navigate('Добро пожаловать !', { status: "logout" });
                break;
            default:
                break;
        }

        //
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
                        <Image source={
                            identify === 'Гость'
                                ? require('../../../../assets/images/guest.jpg')
                                : require('../../../../assets/images/user.jpg')
                        }
                            style={{ width: 70, height: 70, borderRadius: 35, marginLeft: 20 }} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 22, fontFamily: "Inter-Bold" }}>
                                {identify} {identify === "Гость" ? '👾' : '💫'}
                            </Text>
                            {(userEmail != '' && userEmail != null) ? (
                                <Text style={{ fontSize: 14, fontFamily: "Inter-Light" }}>
                                    {userEmail}
                                </Text>
                            ) : (
                                null
                            )}

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <FlatList data={menu} renderItem={({ item, index }) => {
                            const { icon, color } = getIconInfo(item.title, item);
                            const isSelected = selectedMenuItem === index;
                            return (
                                <TouchableOpacity
                                    style={{
                                        width: 200,
                                        height: 50,
                                        marginLeft: 20,
                                        marginTop: 20,
                                        flexDirection: 'row',
                                        backgroundColor: index === selectedMenuItem ? 'white' : 'transparent',
                                        borderRadius: 10,
                                        alignItems: 'center'
                                    }}
                                    onPress={() => {
                                        setSelectedMenuItem(index)
                                        handleMenuItemPress(index)
                                    }}
                                >
                                    {icon && (
                                        <View style={{ marginLeft: 15 }}>
                                            {React.cloneElement(icon, { size: 24, color: isSelected ? 'black' : color })}
                                        </View>
                                    )}

                                    <Text style={{
                                        marginLeft: 20,
                                        fontFamily: 'Inter-Light',
                                        color: isSelected ? "black" : "white",
                                        fontSize: 18
                                    }}>
                                        {item.title}</Text>
                                </TouchableOpacity>
                            )
                        }} />
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