import React, { useState, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Text,
    Image,
    FlatList,
    PanResponder,
    Linking,
    KeyboardAvoidingView,
    ScrollView,
    Easing
} from 'react-native';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import Icon6 from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import useUserCredentials from '../../../utils/useUserCredentials';
import useUserEmail from '../../../utils/useUserEmail';
import { assets } from '../../../../react-native.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import ModalPopup from '../../customs/CustomModal';
import CustomButton from '../../customs/CustomButton';
import CustomInput from '../../customs/CustomInput';
import RateUs from '../../RateUs';

export default function CustomDrawer({
    children,
    backgroundColor,
    fgColor,
    type,
    showSearch,
    navigation,
    elevation = 0,
}) {
    let identify = useUserCredentials();
    let userEmail = useUserEmail();

    const [showMenu, setShowMenu] = useState(false);
    const moveToRight = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    const [showExitModal, setShowExitModal] = useState(false);

    const [showRateUSModal, setShowRateUSModal] = useState(false);

    const [isOnYesPressed, setIsOnYesPressed] = useState(false);

    const [rating, setRating] = useState(1)
    const animatedValue = useRef(new Animated.Value(1)).current;

    const rate = (star) => {
        setRating(star);
    }





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

        { icon: 'university', title: 'Университет' },
        { icon: 'github', title: 'Коммит' },
        { icon: 'email', title: 'Оставить отзыв' },
        { icon: 'star-half-o', title: 'Оценить нас' },
        identify === "Гость" ? { icon: 'user-circle', title: 'Регистрация' } : { icon: 'logout', title: 'Выход' },
        { icon: 'home', title: 'Домой' },
    ];

    const iconMap = {
        Университет: { icon: <Icon size={24} />, color: 'white' },
        Выход: { icon: <Icon6 size={24} />, color: 'white' },
        'Оставить отзыв': { icon: <Icon4 size={24} />, color: 'white' },
        Коммит: { icon: <Icon size={24} />, color: 'white' },
        'Оценить нас': { icon: <Icon5 size={24} />, color: 'white' },
        default: { icon: <Icon size={24} />, color: 'white' },
    };

    const getIconInfo = (title, item) => {
        const iconInfo = iconMap[title] || iconMap.default;
        return {
            icon: React.cloneElement(iconInfo.icon, { name: item.icon }),
            color: iconInfo.color,
        };
    };

    const webPages = [
        'https://www.sevsu.ru/',
        'https://www.github.com/dtb4life/4News/tree/master/4NEWS/MyNewApp',
    ];

    const openLinkInBrowserHandler = index => {
        Linking.canOpenURL(webPages[index]).then(supported => {
            if (supported) {
                Linking.openURL(webPages[index]).catch(err => {
                    console.error('Ошибка при открытии URL: ' + err);
                });
            } else {
                console.error('Ссылка не поддерживается');
            }
        });
    };

    const handleMenuItemPress = async (index, title) => {
        if (title === "Домой") {
            navigation.navigate('Добро пожаловать !', { status: 'logout' });

        }
        switch (index) {
            case 0:
                openLinkInBrowserHandler(index);
                break;
            case 1:
                openLinkInBrowserHandler(index);
                break;
            case 2:
                navigation.navigate('FeedBack Screen');
                break;
            case 3:
                setShowRateUSModal(true)
                break;
            case 4:
                if (title === "Выход") {
                    setShowExitModal(!showExitModal);
                } else {
                    navigation.navigate("Регистрация")
                }
                break;

            default:
                break;
        }
    };

    state = {
        panResponder: PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return showMenu;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return showMenu;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (showMenu && gestureState.dx < -50) {
                    toggleMenu();
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (
                    showMenu &&
                    Math.abs(gestureState.dx) < 5 &&
                    Math.abs(gestureState.dy) < 5
                ) {
                    toggleMenu();
                }
            },
        }),
    };

    const handleOnExitYesPressed = async () => {
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

        navigation.navigate('Добро пожаловать !', { status: 'logout' });
        navigation.reset({
            index: 0,
            routes: [{ name: 'Добро пожаловать !' }],
            status: 'logout',
        });
        setShowExitModal(false);
    };

    return (
        <View style={{ flex: 1, borderRadius: showMenu ? 15 : 0 }}>
            {showMenu && (
                <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 40,
                        }}>
                        <LinearGradient
                            colors={['#dd2dcf', '#f356b0']}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 45,
                                marginLeft: 20,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 45,
                                    borderWidth: 1.5,
                                    borderColor: 'transparent',
                                    alignSelf: 'center',
                                    overflow: 'hidden',
                                    shadowColor: 'rgba(245, 40, 145, 1)',
                                    elevation: 1,
                                }}>
                                <Image
                                    source={
                                        identify === 'Гость'
                                            ? require('../../../../assets/images/guest.jpg')
                                            : require('../../../../assets/images/user.jpg')
                                    }
                                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                />
                            </View>
                        </LinearGradient>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 22, fontFamily: 'Inter-Bold' }}>
                                {identify} {identify === 'Гость' ? '👾' : '💫'}
                            </Text>
                            {userEmail && (
                                <Text style={{ fontSize: 14, fontFamily: 'Inter-Light' }}>
                                    {userEmail}
                                </Text>
                            )}
                        </View>
                        {showRateUSModal && (
                            <ModalPopup
                                navigation={navigation}
                                visible={showRateUSModal}
                                backgroundColor="#7692FF">
                                <View style={[styles.container, { flexDirection: 'row' }]}>
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <Animated.View key={index}>
                                            <RateUs
                                                key={index}
                                                index={index}
                                                filled={index <= rating ? true : false}
                                                animatedValue={animatedValue}
                                                rating={rating}
                                                onPress={() => {
                                                    rate(index)
                                                }}
                                            />
                                        </Animated.View>
                                    ))}

                                </View>

                            </ModalPopup>
                        )}

                        {showExitModal && (
                            <>
                                <ModalPopup
                                    navigation={navigation}
                                    visible={showExitModal}
                                    backgroundColor="#7692FF">
                                    <View>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: 'Inter-ExtraBold',
                                            }}>
                                            Вы уверены, что хотите выйти из аккаунта?
                                        </Text>

                                        <Animatable.View
                                            animation="fadeIn"
                                            duration={1500}
                                            style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                marginTop: 15,
                                            }}>
                                            <CustomButton
                                                bgColor="#3a86ff"
                                                type="Tertiary"
                                                text="Да, выйти из аккаунта"
                                                onPress={() => {
                                                    setIsOnYesPressed(true);
                                                    handleOnExitYesPressed();
                                                }}
                                            />

                                            {/* <Text style={{ fontFamily: "Inter-ExtraBold" }}>ОК</Text> */}
                                        </Animatable.View>
                                    </View>
                                    <Animatable.View
                                        animation="fadeIn"
                                        style={{ justifyContent: 'center' }}>
                                        <CustomButton
                                            type="Primary"
                                            text="Отмена"
                                            bgColor="transparent"
                                            onPress={() => {
                                                setShowExitModal(!showExitModal);
                                                //navigation.navigate("Домашняя страница")
                                                //setStatusBarColor('#36d1dc')
                                            }}
                                        />
                                    </Animatable.View>
                                </ModalPopup>
                            </>
                        )}
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 30 }}>
                        <FlatList
                            data={menu}
                            renderItem={({ item, index }) => {
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
                                            backgroundColor:
                                                index === selectedMenuItem ? '#9fb4f0' : 'transparent',
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            elevation: isSelected ? 5 : 0,
                                            justifyContent: 'flex-start',
                                        }}
                                        onPress={() => {
                                            setSelectedMenuItem(index);
                                            handleMenuItemPress(index, item.title);
                                        }}>
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
                                );
                            }}
                        />
                    </View>
                </Animatable.View>
            )}
            <Animated.View
                {...this.state.panResponder.panHandlers}
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
                    elevation: elevation,
                }}>
                <View
                    style={[
                        styles.header,
                        {
                            backgroundColor: backgroundColor,
                            borderTopLeftRadius: showMenu ? 15 : 0,
                        },
                    ]}>
                    <TouchableOpacity onPress={toggleMenu}>
                        {showMenu ? (
                            <Icon4
                                name={'close'}
                                size={32}
                                color="#21FA90"
                                style={{ transform: showMenu ? [{ rotate: '90deg' }] : [] }}
                            />
                        ) : (
                            <Icon2
                                name={'menu'}
                                size={24}
                                color="white"
                                style={{ transform: showMenu ? [{ rotate: '90deg' }] : [] }}
                            />
                        )}
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.text}>{type}</Text>
                    </View>
                    {showSearch == 'true' && (
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
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
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
