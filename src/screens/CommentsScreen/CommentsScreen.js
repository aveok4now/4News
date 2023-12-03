import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { theme } from '../WeatherScreen/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { Icons } from '../../components/Icons';
import { handleShare } from '../../utils/Share';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import userImage from '../../../assets/images/user.jpg';
import guestImage from '../../../assets/images/guest.jpg';
import adminImage from '../../../assets/images/admin.jpg';
import { useNavigation } from '@react-navigation/native';
import NoNewsInfo from '../../components/NoNewsInfo';
import CustomButton from '../../components/customs/CustomButton';
import { formatPostTime } from '../../utils/formatPostTime';
import ModalPopup from '../../components/customs/CustomModal/CustomModal';
import CustomDropDown from '../../components/customs/CustomDropDown';
import Toast from 'react-native-toast-message';
import useUserImage from '../../utils/hooks/useUserImage';
import SQLite from 'react-native-sqlite-storage';

import { condition, getUserImage } from '../../utils/getUserImage';

export default function CommentsScreen({ route }) {
    const {
        item,
        defaultImage,
        includesG,
        formattedDate,
        imageLoaded,
        isImageUrl = true,
    } = route?.params;

    const dataArray = [];



    let postText = item.title || item.post;
    let postAuhor = item.userName || item.source.name;

    const [comments, setComments] = useState(dataArray);

    const inputRef = useRef(null);
    const [inputText, setInputText] = useState('');

    let identify = useUserCredentials();



    const userImage = useUserImage();
    const navigation = useNavigation();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

                const postId = item.id || new Date(item.publishedAt).toString();

                let query =
                    'SELECT * FROM Comments WHERE postId = ? ORDER BY timestamp DESC';
                let queryArgs = [postId];

                const [result] = await db.executeSql(query, queryArgs);

                if (result.rows.length > 0) {
                    const fetchedComments = [];

                    for (let i = 0; i < result.rows.length; i++) {
                        const comment = result.rows.item(i);

                        console.log('id', comment.id.toString());
                        console.log('postId', comment.postId);
                        console.log('authorName', comment.authorName);
                        console.log('commentText', comment.commentText);
                        console.log('timeStamp', new Date(comment.timestamp));

                        fetchedComments.push({
                            id: comment.id.toString(),
                            postId: comment.postId,
                            authorName: comment.authorName,
                            postText: comment.commentText,
                            timestamp: new Date(comment.timestamp),
                            userAvatar: getUserImage(comment.authorName, identify),
                        });
                    }


                    setComments(fetchedComments);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchComments();
    }, [item.id, item.publishedAt]);

    const handleImagePressed = () => {
        try {
            if (includesG) return;
            navigation.navigate('NewsViewer', { url: item.url });
        } catch (err) {
            console.log(err);
            return;
        }
    };

    const showToastMessage = text => {
        Toast.show({
            text1: text,
            position: 'bottom',
            visibilityTime: 4000,
            autoHide: true,
        });
    };

    const handleToastShow = value => {
        setShowToast(value);
        showToastMessage('Спасибо за помощь в улучшении сообщества!');
    };

    const handlePublishComment = async () => {
        const postId = item.id || new Date(item.publishedAt).toString();
        console.log(new Date(item.publishedAt));

        const newComment = {
            postId: postId,
            userAvatar: condition,
            authorName: identify,
            identify: identify,
            commentText: inputText,
            timestamp: new Date().toISOString(),
        };

        console.log(postText);

        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            let query = `
              INSERT INTO Comments (postId, authorName, commentText, timestamp)
              VALUES (?, ?, ?, ?)
            `;
            let queryArgs = [
                newComment.postId,
                newComment.authorName,
                newComment.commentText,
                newComment.timestamp,
            ];

            const [result] = await db.executeSql(query, queryArgs);

            if (result.rowsAffected > 0) {
                console.log('Comment has been inserted into the database');
            } else {
                console.log('Comment has not been inserted into the database');
            }
            const updatedComments = [newComment, ...comments];
            setComments(updatedComments);

            setInputText('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteComment = async () => {
        if (selectedCommentIndex !== null) {
            const comment = comments[selectedCommentIndex];

            try {
                const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

                let query = 'DELETE FROM Comments WHERE id = ?';
                let queryArgs = [comment.id];

                const [result] = await db.executeSql(query, queryArgs);

                if (result.rowsAffected > 0) {
                    console.log('Comment has been deleted from the database');
                } else {
                    console.log('Comment not found in the database');
                }

                const updatedComments = [...comments];
                updatedComments.splice(selectedCommentIndex, 1);
                setComments(updatedComments);

                setSelectedCommentIndex(null);
                setShowConfirmDeleteModal(false);
            } catch (err) {
                console.log('Error deleting comment:', err);
            }
        }
    };

    // const createCommentsTable = async () => {
    //     const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
    //     let query = `
    //       CREATE TABLE IF NOT EXISTS Comments (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         postId INTEGER,
    //         authorName TEXT,
    //         commentText TEXT,
    //         timestamp TEXT,
    //         FOREIGN KEY (postId) REFERENCES News (newsId) ON DELETE CASCADE
    //       )
    //     `;
    //     await db.executeSql(query);
    // };

    return (
        <>
            <StatusBar backgroundColor="#5fa3c5" />

            <SafeAreaView style={{ height: '100%' }}>
                <Animatable.View
                    animation="fadeIn"
                    duration={1500}
                    style={{
                        flex: 1,
                    }}>
                    <Image
                        blurRadius={100}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        source={require('../assets/images/newsoverview.jpg')}
                    />
                    {showConfirmDeleteModal && (
                        <ModalPopup
                            visible={showConfirmDeleteModal}
                            backgroundColor="rgb(59 130 246)">
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
                                    onPress={() =>
                                        setShowConfirmDeleteModal(!showConfirmDeleteModal)
                                    }
                                />
                                <CustomButton
                                    text="Да"
                                    type="Tertiary"
                                    onPress={handleDeleteComment}
                                />
                            </View>
                        </ModalPopup>
                    )}
                    <CustomDropDown
                        visible={showDeleteModal}
                        identify={identify}
                        onClose={() => setShowDeleteModal(false)}
                        items={comments}
                        selectedCommentIndex={selectedCommentIndex}
                        backgroundColor="rgb(59 130 246)"
                        onToastShow={handleToastShow}
                        onConfirmDelete={() => setShowConfirmDeleteModal(true)}
                        authorName={comments[selectedCommentIndex]?.authorName}
                    />

                    {showToast && <Toast />}
                    <View
                        style={{
                            backgroundColor: theme.bgWhite(0.3),
                            borderRadius: 10,
                            marginTop: '15%',
                            paddingVertical: 10,
                            paddingHorizontal: 25,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: '2%',
                        }}>
                        <Pressable onPress={handleImagePressed}>
                            <View
                                style={{
                                    width: 65,
                                    height: 65,
                                }}>
                                <Animatable.View
                                    animation="slideInLeft"
                                    duration={1000}
                                    style={styles.imageContainer}>
                                    {isImageUrl ? (
                                        <TouchableWithoutFeedback
                                            onPress={() =>
                                                !includesG &&
                                                navigation.navigate('NewsViewer', { url: item.url })
                                            }>
                                            <Image
                                                source={{
                                                    uri: imageLoaded
                                                        ? item.urlToImage || defaultImage
                                                        : defaultImage,
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    resizeMode: 'cover',
                                                }}
                                            />
                                        </TouchableWithoutFeedback>
                                    ) : (
                                        <TouchableWithoutFeedback>
                                            <Image
                                                source={item.userImage}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    resizeMode: 'cover',
                                                }}
                                            />
                                        </TouchableWithoutFeedback>
                                    )}
                                </Animatable.View>
                            </View>
                        </Pressable>
                        <Animatable.View animation="slideInRight" duration={1000}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontFamily: 'Inter-ExtraBold',
                                    textAlign: 'auto',
                                    paddingHorizontal: 15,
                                    fontSize: 18,
                                    letterSpacing: -1,
                                }}>
                                {postAuhor && postText && postText.length > 150
                                    ? postText.slice(0, 150) + ' ...'
                                    : postText}
                            </Text>
                            {/* <View style={styles.seperator} /> */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    //marginHorizontal: 5
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        opacity: 0.8,
                                        fontFamily: 'Inter-Light',
                                        textAlign: 'justify',
                                        paddingHorizontal: 15,
                                        fontSize: 14,
                                    }}>
                                    {postAuhor}
                                    {', '}
                                    {formattedDate}
                                </Text>
                                <TouchableOpacity
                                    style={{ marginRight: 15 }}
                                    onPress={() =>
                                        handleShare({
                                            url: item.url,
                                            newsTitle: item.title || item.post,
                                        })
                                    }>
                                    <Icons.FontAwesome name={'send-o'} size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                    </View>

                    {identify !== 'Гость' && (
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={inputRef}
                                style={{ fontFamily: 'Inter-Light', fontSize: 20, width: '100%' }}
                                placeholder="Что думаете?"
                                selectionColor="white"
                                placeholderTextColor="white"
                                multiline={true}
                                numberOfLines={2}
                                value={inputText}
                                onChangeText={text => setInputText(text)}
                            />
                            {inputText.length > 0 && (
                                <Animatable.View
                                    animation="flipInX"
                                    duration={1000}
                                    style={{ position: 'absolute', top: 0, right: 5 }}>
                                    <TouchableOpacity onPress={() => setInputText('')}>
                                        <Icons.MaterialCommunityIcons
                                            name="close-circle"
                                            size={32}
                                        />
                                    </TouchableOpacity>
                                </Animatable.View>
                            )}
                            {inputText.length > 5 && (
                                <Animatable.View
                                    style={{ width: '80%', alignSelf: 'center' }}
                                    animation="fadeIn"
                                    duration={500}>
                                    <CustomButton
                                        onPress={handlePublishComment}
                                        text="Опубликовать"
                                    />
                                </Animatable.View>
                            )}
                        </View>
                    )}

                    {comments.length > 0 ? (
                        <View
                            style={{
                                marginTop: 15,
                                borderTopLeftRadius: 40,
                                borderTopRightRadius: 40,
                                paddingHorizontal: 20,
                                flex: 1,
                                backgroundColor: theme.bgWhite(0.4),
                            }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ marginVertical: 20 }}
                                scrollEventThrottle={16}
                                bounces={false}>
                                {comments.map((item, index) => (
                                    <View key={index} style={styles.feedItem}>
                                        <Image source={item.userAvatar || userImage} style={styles.avatar} />
                                        <View style={{ flex: 1 }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}>
                                                <View>
                                                    <Text style={styles.name}>{item.authorName}</Text>
                                                    <Text style={styles.timestamp}>
                                                        {formatPostTime(item.timestamp, new Date())}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: theme.bgWhite(0.3),
                                                        borderRadius: 25,
                                                        padding: 4,
                                                    }}
                                                    onPress={() => {
                                                        setSelectedCommentIndex(index);
                                                        setShowDeleteModal(!showDeleteModal);
                                                    }}>
                                                    <Icons.MaterialIcons
                                                        name="more-horiz"
                                                        size={28}
                                                        color="rgb(96 165 250)"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.post}>
                                                {item.postText || item.commentText}
                                            </Text>
                                            {item.postImage && (
                                                <Image
                                                    src={item.postImage}
                                                    style={styles.postImage}
                                                    resizeMode="cover"
                                                />
                                            )}
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    style={{ marginRight: 16 }}
                                                    onPress={() => alert('pressed')}>
                                                    <Icons.FontAwesome
                                                        name={'heart-o'}
                                                        size={24}
                                                        color="#73788b"
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => alert('pressed')}
                                                    style={{}}>
                                                    <Icons.Fontisto
                                                        name={'comment'}
                                                        size={22}
                                                        color="#73788B"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            {inputText.length <= 40 && (
                                <NoNewsInfo
                                    primaryText="Комментариев пока нет"
                                    secondaryText={
                                        identify !== 'Гость'
                                            ? 'Пусть Ваш будет первым!'
                                            : 'Войдите в аккаунт или зарегестрируйтесь, чтобы добавлять комментарии!'
                                    }
                                    marginVertical={identify !== 'Гость' ? 0 : 10}
                                />
                            )}
                        </View>
                    )}
                </Animatable.View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 155,
        borderWidth: 1.5,
        borderColor: 'transparent',
        overflow: 'hidden',
        shadowColor: 'rgba(245, 40, 145, 1)',
        elevation: 1,
        marginHorizontal: '10%',
    },
    seperator: {
        height: 1,
        width: '70%',
        backgroundColor: '#ddd',
        marginVertical: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
    },
    feed: {
        marginHorizontal: 16,
    },
    feedItem: {
        backgroundColor: theme.bgWhite(0.7),
        borderRadius: 15,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
    },
    name: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: 'rgb(96 165 250)',
        textShadowColor: 'rgba(8, 51, 68, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    timestamp: {
        fontSize: 12,
        fontFamily: 'Inter-Light',
        color: 'rgb(163 163 163)',
        marginTop: 2,
        textShadowColor: 'rgba(226, 232, 240, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    post: {
        marginTop: 16,
        fontSize: 16,
        fontFamily: 'Inter-Light',
        color: 'rgb(22 78 99)',
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16,
    },
    inputContainer: {
        margin: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        paddingHorizontal: 32,
        borderWidth: 0.5,
        borderColor: theme.bgWhite(0.1),
        backgroundColor: theme.bgWhite(0.2),
    },
    inputAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
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
