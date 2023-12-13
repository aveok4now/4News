import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
  Image,
  FlatList,
  PanResponder,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import useUserCredentials from '../../../utils/hooks/useUserCredentials';
import useUserEmail from '../../../utils/hooks/useUserEmail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import ModalPopup from '../../customs/CustomModal';
import CustomButton from '../../customs/CustomButton';
import SQLite from 'react-native-sqlite-storage';
import { Icons } from '../../../utils/global/Icons';
import { openLinkInBrowserHandler } from './utils/openLink';
import RateUSModal from './components/RateUSModal/RateUSModal';
import LogOutModal from './components/LogOutModal/LogOutModal';

export default function CustomDrawer({
  children,
  backgroundColor,
  fgColor,
  type,
  showSearch,
  navigation,
  elevation = 0,
  showBorder = false,
  fontFamily = 'Inter-Light',
  letterSpacing = 1,
  destination = 'Search',
  titleColor = 'white',
}) {
  let identify = useUserCredentials();
  let userEmail = useUserEmail();
  const isGuest = identify === 'Гость';
  const isAdmin = identify.includes('admin');

  const [showMenu, setShowMenu] = useState(false);
  const moveToRight = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const [showRateUSModal, setShowRateUSModal] = useState(false);
  const [rating, setRating] = useState(1);

  const [isOnYesPressed, setIsOnYesPressed] = useState(false);

  const animatedValue = useRef(new Animated.Value(1)).current;

  const rate = async star => {
    try {
      const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
      let userId = null;

      if (identify !== 'Гость') {
        const query = 'SELECT userId FROM users WHERE userLogin = ?';
        const queryArgs = [identify];
        const [result] = await db.executeSql(query, queryArgs);

        if (result.rows.length > 0) {
          userId = result.rows.item(0).userId;
        }
      } else {
        setRating(star);
      }

      if (userId) {
        const queryRating =
          'SELECT COUNT(*) AS count FROM Rates WHERE userID = ?';
        const queryArgsRating = [userId];
        const [resultRating] = await db.executeSql(
          queryRating,
          queryArgsRating,
        );

        if (resultRating.rows.length > 0) {
          const count = resultRating.rows.item(0).count;
          if (count > 0) {
            db.transaction(tx => {
              tx.executeSql(
                `
                                UPDATE Rates
                                SET rating = ?
                                WHERE userID = ?
                                `,
                [star, userId],
                () => {
                  // Обработка успешного обновления рейтинга
                },
                error => {
                  // Обработка ошибки выполнения транзакции
                  console.error(error);
                },
              );
            });
          } else {
            // Если запись не существует, вставьте новую запись
            db.transaction(tx => {
              tx.executeSql(
                `
                                INSERT INTO Rates (userID, rating)
                                VALUES (?, ?)
                                `,
                [userId, star],
                () => {
                  // Обработка успешной вставки рейтинга
                },
                error => {
                  // Обработка ошибки выполнения транзакции
                  console.error(error);
                },
              );
            });
          }
        }
        setRating(star);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkAndSetRating = async () => {
    try {
      let userRating = null;
      let userId = null;
      const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

      if (identify !== 'Гость') {
        const query = 'SELECT userID FROM users WHERE userLogin = ?';
        const queryArgs = [identify];
        const [result] = await db.executeSql(query, queryArgs);

        if (result.rows.length > 0) {
          userId = result.rows.item(0).userId;
          const query2 = 'SELECT rating FROM Rates WHERE userID = (?)';
          const queryArgs2 = [userId];
          const [result2] = await db.executeSql(query2, queryArgs2);

          if (result2.rows.length > 0) {
            userRating = result2.rows.item(0).rating;
            setRating(userRating);
          } else {
            console.log('No user rating found');
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showRateUSModal) {
      checkAndSetRating();
    }
  }, [showRateUSModal, rating]);

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
  };

  const menu = [
    { icon: 'university', title: 'Университет' },
    { icon: 'github', title: 'Коммит' },
    { icon: 'email', title: 'Оставить отзыв' },
    { icon: 'star-half-o', title: 'Оценить нас' },

    ...(isAdmin ? [{ icon: 'admin-panel-settings', title: 'Подсистема' }] : []),
    ...(isGuest
      ? [
        { icon: 'user-circle', title: 'Регистрация' },
        { icon: 'home', title: 'Домой' },
      ]
      : [{ icon: 'logout', title: 'Выход' }]),
  ];

  const iconMap = {
    Университет: { icon: <Icons.FontAwesome5 size={24} />, color: 'white' },
    Выход: { icon: <Icons.MaterialIcons size={24} />, color: 'white' },
    'Оставить отзыв': {
      icon: <Icons.MaterialCommunityIcons size={24} />,
      color: 'white',
    },
    Коммит: { icon: <Icons.FontAwesome5 size={24} />, color: 'white' },
    'Оценить нас': { icon: <Icons.FontAwesome size={24} />, color: 'white' },
    Подсистема: { icon: <Icons.MaterialIcons size={24} />, color: 'white' },
    default: { icon: <Icons.FontAwesome5 size={24} />, color: 'white' },
  };

  const getIconInfo = (title, item) => {
    const iconInfo = iconMap[title] || iconMap.default;
    return {
      icon: React.cloneElement(iconInfo.icon, { name: item.icon }),
      color: iconInfo.color,
    };
  };

  const handleMenuItemPress = async (index, title) => {
    switch (title) {
      case 'Домой':
        navigation.navigate('Добро пожаловать !', { status: 'logout' });
        break;
      case 'Коммит':
      case 'Университет':
        openLinkInBrowserHandler(index);
        break;
      case 'Оставить отзыв':
        navigation.navigate('FeedBack Screen');
        break;
      case 'Оценить нас':
        setShowRateUSModal(true);
        break;
      case 'Подсистема':
        navigation.navigate('AdminScreen');
        break;

      default:
        if (title === 'Выход') {
          setShowLogOutModal(!showLogOutModal);
        } else {
          navigation.navigate('Регистрация');
        }
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
          setShowRateUSModal(false);
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
    setShowLogOutModal(false);
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
                      : identify.includes('admin')
                        ? require('../../../../assets/images/admin.jpg')
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
              <RateUSModal
                navigation={navigation}
                showRateUSModal={showRateUSModal}
                setShowRateUSModal={setShowRateUSModal}
                animatedValue={animatedValue}
                rate={rate}
                rating={rating}
              />
            )}

            {showLogOutModal && (
              <LogOutModal
                navigation={navigation}
                showLogOutModal={showLogOutModal}
                setShowLogOutModal={setShowLogOutModal}
                onYesPress={() => {
                  setIsOnYesPressed(true);
                  handleOnExitYesPressed();
                }}
              />
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
          elevation: showMenu ? elevation : 0,
          borderWidth: showBorder && showMenu ? 0.25 : 0,
          borderColor: showBorder && showMenu ? 'black' : 'null',
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
              <Icons.MaterialCommunityIcons
                name={'close'}
                size={32}
                color="#21FA90"
                style={{ transform: showMenu ? [{ rotate: '90deg' }] : [] }}
              />
            ) : (
              <Icons.SimpleLineIcons
                name={'menu'}
                size={24}
                color="white"
                style={{ transform: showMenu ? [{ rotate: '90deg' }] : [] }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text
              style={[
                styles.text,
                {
                  fontFamily: fontFamily,
                  letterSpacing: letterSpacing,
                  color: titleColor,
                },
              ]}>
              {type}
            </Text>
          </View>
          {showSearch == 'true' ? (
            <TouchableOpacity onPress={() => navigation.navigate(destination)}>
              <Icons.FontAwesome5 name="search" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 24, height: 24 }} />
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
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
