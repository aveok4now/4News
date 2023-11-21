import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icons } from '../../Icons/Icons';
import { theme } from '../../../screens/WeatherScreen/theme';
import * as Animatable from 'react-native-animatable';
import CustomDropDown from '../CustomDropDown';
import CustomToast from '../CustomToast';
import useUserCredentials from '../../../utils/hooks/useUserCredentials';
import { handleUsersNewsShare } from '../../../utils/Share';
import CustomModal from '../CustomModal';
import ModalPopup from '../CustomModal/CustomModal';
import CustomButton from '../CustomButton';
import { formatPostTime } from '../../../utils/formatPostTime';

export default function CustomPostCard({ item, onDeletePost }) {
    let identify = useUserCredentials();
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(item.likes);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const [likeIcon, setLikeIcon] = useState(
        item.liked ? 'heart' : 'heart-outline',
    );
    const [likeIconColor, setLikeIconColor] = useState(
        item.liked ? 'blue' : '#2E64E5',
    );

    const [toastMessage, setToastMessage] = useState('');

    const [isShowToast, setShowToast] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [localTime, setLocalTime] = useState(new Date());
    const [formattedPostTime, setFormattedPostTime] = useState(
        formatPostTime(item.postTime, localTime),
    );

    const [postTime, setPostTime] = useState(item.postTime);

    const showToast = message => {
        setToastMessage(message);
        setShowToast(true);
    };

    const onShowToastClose = () => {
        console.log('onClose function called');
        setToastMessage('');
        setShowToast(false);
    };

    const startInterval = () => {
        const intervalId = setInterval(() => {
            const newTime = new Date();
            setLocalTime(newTime);
            setFormattedPostTime(formatPostTime(item.postTime, newTime));
            setPostTime(item.postTime);
        }, 1000);
        return intervalId;
    };

    useEffect(() => {
        const intervalId = startInterval();

        return () => {
            clearInterval(intervalId);
        };
    }, [item.id, startInterval, postTime, item.postTime]);

    const deletePost = postId => {
        onDeletePost(postId);
        item.deleted = true;
    };

    const sharePost = () => {
        handleUsersNewsShare({
            //url: item.url,
            author: item.userName,
            newsTitle: item.post,
            postTime: item.postTime,
        });
    };

    const handleDropdownClose = () => {
        setIsDropdownVisible(false);
    };

    const handleOptionSelect = (option, postId, postText) => {
        console.log('Выбрана опция:', option, postText);

        switch (option) {
            case 'delete':
                //deletePost(postId);
                setShowDeleteModal(true);
                break;
            case 'share':
                sharePost(postText);
                break;
            case 'alert-circle-outline':
                showToast('Спасибо, что помогаете в улучшении сообщества!');
                break;

            default:
                break;
        }

        setIsDropdownVisible(false);
    };

    return (
        <>
            {!item.deleted && (
                <Animatable.View animation="fadeIn" duration={1000} style={styles.card}>
                    {isShowToast && (
                        <CustomToast message={toastMessage} onClose={onShowToastClose} />
                    )}
                    {showDeleteModal && (
                        <ModalPopup visible={showDeleteModal}>
                            <View style={{ padding: 5 }}>
                                <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 18 }}>
                                    Подтверждение
                                </Text>
                            </View>
                            <View style={{ width: '100%', padding: 5 }}>
                                <Text style={{ fontFamily: 'Inter-Light', fontSize: 18 }}>
                                    Вы действительно хотите удалить этот пост?
                                </Text>
                            </View>
                            <View style={styles.divider} />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '50%',
                                    padding: 5,
                                    justifyContent: 'space-between',
                                    gap: 10,
                                }}>
                                <CustomButton
                                    text="Нет"
                                    type="Tertiary"
                                    onPress={() => setShowDeleteModal(!showDeleteModal)}
                                />
                                <CustomButton
                                    text="Да"
                                    type="Tertiary"
                                    onPress={() => deletePost(item.id)}
                                />
                            </View>
                        </ModalPopup>
                    )}
                    <View style={styles.userInfo}>
                        <Image style={styles.userImage} source={item.userImage} />
                        <View style={{ position: 'absolute', top: 15, right: 15 }}>
                            <TouchableOpacity
                                onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
                                <Icons.MaterialIcons
                                    name="more-horiz"
                                    size={24}
                                    color="#73788B"
                                />
                            </TouchableOpacity>
                            <CustomDropDown
                                identify={identify}
                                authorName={item.userName}
                                visible={isDropdownVisible}
                                onClose={handleDropdownClose}
                                onOptionSelect={handleOptionSelect}
                            />
                        </View>
                        <View style={styles.userInfoText}>
                            <Text style={styles.userName}>{item.userName}</Text>
                            <Text style={styles.postTime}>
                                {formatPostTime(item.postTime, new Date())}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.postText}>{item.post}</Text>
                    {item.postImage !== 'none' ? (
                        <Image style={styles.postImage} source={item.postImage} />
                    ) : (
                        <View style={styles.divider} />
                    )}

                    <View style={styles.interactionWrapper}>
                        <Animatable.View animation="pulse">
                            <TouchableOpacity
                                onPress={() => {
                                    if (isLiked) {
                                        setLikesCount(likesCount - 1);
                                        setIsLiked(false);
                                        setLikeIcon('heart-outline');
                                        setLikeIconColor('#2E64E5');
                                    } else {
                                        setLikesCount(likesCount + 1);
                                        setIsLiked(true);
                                        setLikeIcon('heart');
                                        setLikeIconColor('blue');
                                    }
                                }}
                                style={[
                                    styles.interaction,
                                    { backgroundColor: isLiked ? '#2e64e515' : 'transparent' },
                                ]}>
                                <Icons.Ionicons
                                    name={likeIcon}
                                    size={25}
                                    style={{ color: likeIconColor }}
                                />
                                <Text
                                    style={[
                                        styles.interactionText,
                                        { color: isLiked ? '#2e64e5' : '#333' },
                                    ]}>
                                    {likesCount !== 0 && likesCount}
                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <TouchableOpacity style={styles.interaction}>
                            <Icons.FontAwesome
                                name="comments-o"
                                size={25}
                                style={{ color: 'blue' }}
                            />
                            <Text style={styles.interactionText}>
                                {item.comments !== 0 && item.comments}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        width: '100%',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#454D65',
    },
    userInfoText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    postTime: {
        fontSize: 12,
        fontFamily: 'Inter-Light',
        color: '#666',
    },
    postText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: 'black',
        paddingHorizontal: 15,
    },
    postImage: {
        width: '100%',
        height: 250,
        marginTop: 15,
    },
    interactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
    },
    interaction: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        paddingTop: 2,
        paddingRight: 5,
    },
    interactionText: {
        fontSize: 12,
        fontFamily: 'Inter-Bold',
        color: '#333',
        marginTop: 5,
        marginLeft: 5,
    },
    divider: {
        border: 1,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
    },
});
