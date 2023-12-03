import {
    StatusBar,
    FlatList,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    Text,
    Animated,
    ScrollView,
    RefreshControl,
} from 'react-native';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import userImage from '../../../assets/images/user.jpg';
import guestImage from '../../../assets/images/guest.jpg';
import adminImage from '../../../assets/images/admin.jpg';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import defaultImage from '../assets/images/newsoverview.jpg';
import CustomPostCard from '../../components/customs/CustomPostCard';
import CustomDrawer from '../../components/customs/CustomDrawer';
import CustomInput from '../../components/customs/CustomInput';
import { theme } from '../WeatherScreen/theme';
import { Icons } from '../../components/Icons/Icons';
import { debounce } from 'lodash';
import ModalPopup from '../../components/customs/CustomModal/CustomModal';
import TypeWriter from 'react-native-typewriter';
import CustomButton from '../../components/customs/CustomButton';
import { formatPostTime } from '../../utils/formatPostTime';
import NoNewsInfo from '../../components/NoNewsInfo';
import SQLite from 'react-native-sqlite-storage';
import { height, width } from '../../utils/getDimensions';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import NewsFooter from '../../components/UsersNewsComponents/NewsFooter';

SQLite.enablePromise(true);

export default function UsersNewsScreen({ navigation }) {
    useEffect(() => {
        getPosts();
    }, []);

    let identify = useUserCredentials();
    const [isLoading, SetIsLoading] = useState(true);

    condition =
        identify === 'Гость'
            ? guestImage
            : identify.includes('admin')
                ? adminImage
                : userImage;

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [postText, setPostText] = useState(null);
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

    const [showGuestModal, setShowGuestModal] = useState(false);
    const [isTextValid, setIsTextValid] = useState(false);

    const Posts = [];

    const [UsersPosts, setUsersPosts] = useState(Posts);
    const [isPostSent, setIsPostSent] = useState(false);

    const [localTime, setLocalTime] = useState(new Date());

    const [isLongText, setIsLongText] = useState(false);
    const [textLength, setTextLength] = useState(0);

    let inputRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isScrolledToTop, setIsScrolledToTop] = useState(true);

    //TODO
    const getPosts = async () => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            // let inQuery = `ALTER TABLE Likes ADD COLUMN isLiked INTEGER DEFAULT 0`;
            // await db.executeSql(inQuery)

            let query = `SELECT * FROM News WHERE categoryType = ? ORDER BY publishDate DESC`;
            let queryArgs = ['UsersNews'];

            const [result] = await db.executeSql(query, queryArgs);

            if (result.rows.length > 0) {
                const fetchedPosts = [];

                for (let i = 0; i < result.rows.length; i++) {
                    const post = result.rows.item(i);
                    let getLikesQuery = `
                    SELECT likesCount FROM Likes WHERE postId = ?
                `;
                    let getLikesQueryArgs = [post.newsId];
                    const [likesResult] = await db.executeSql(
                        getLikesQuery,
                        getLikesQueryArgs,
                    );
                    const likesCount = likesResult.rows.item(0)?.likesCount || 0;
                    console.log('likesCount ' + likesCount);

                    let getIsLikedQuery = `
                        SELECT isLiked FROM Likes WHERE postId = ?
                    `;

                    let getIsLikedQueryArgs = [post.newsId];
                    const [isLikedResult] = await db.executeSql(
                        getIsLikedQuery,
                        getIsLikedQueryArgs,
                    );
                    const isLiked = isLikedResult.rows.item(0)?.isLiked || false;

                    fetchedPosts.push({
                        id: post.newsId.toString(),
                        userName: post.AuthorName || 'Автор',
                        postTime: new Date(post.publishDate),
                        post: post.newsTitle,
                        postImage: 'none',
                        liked: isLiked,
                        likes: likesCount,
                        comments: 0,
                        userImage: getUserImage(post.AuthorName, identify),
                        deleted: false,
                    });
                }

                setUsersPosts(fetchedPosts);
                SetIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsRefreshing(false);
        }
    };

    const getUserImage = (authorName, identify) => {
        console.log(authorName, identify);
        if (authorName.includes('admin')) {
            return adminImage;
        }
        return userImage;
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        getPosts();
    };

    const handleSendPost = useCallback(async () => {
        if (postText && postText.length > 3) {
            setIsPostSent(true);
            setIsLongText(false);
            const newPost = {
                newsId: new Date().getTime(),
                id: String(UsersPosts.length + 1),
                userName: identify,
                postTime: new Date(),
                post: postText,
                postImage: 'none',
                liked: false,
                likes: 0,
                comments: 0,
                userImage: condition,
                deleted: false,
            };

            setIsTextValid(false);
            checkIsTextValid(postText);
            setPostText(null);
            inputRef.current.blur();

            try {
                await insertPost(newPost);

                if (
                    !(
                        newPost.postTime instanceof Date &&
                        !isNaN(newPost.postTime.getTime())
                    )
                ) {
                    console.log('Invalid date in handleSendPost');
                    return;
                }

                const updatedPosts = [newPost, ...UsersPosts];
                setUsersPosts(updatedPosts);
            } catch (err) {
                console.log('Error handling post:', err);
            }
        }
    }, [UsersPosts, postText, identify, userImage]);

    const insertPost = async data => {
        try {
            console.log(data);
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            let query = `INSERT INTO News (newsId, AuthorName, newsTitle, publishDate, AuthorAdminId, AuthorUserId, categoryType)
                        VALUES (?, ?, ?, ?, COALESCE(?, 0), COALESCE(?, 0), ?)`;

            let queryArgs = [
                data.newsId,
                data.userName,
                data.post,
                data.postTime.toISOString(),
                !identify.includes('admin') ? null : data.id,
                !identify.includes('admin') ? data.id : null,
                'UsersNews',
            ];

            const [result] = await db.executeSql(query, queryArgs);

            if (result.rowsAffected > 0) {
                console.log('Post has been inserted into the database');
            } else {
                console.log('Post has not been inserted into the database');
            }

            await insertLikesCount(data, db);
        } catch (err) {
            console.log(err);
        }
    };

    const insertLikesCount = async (data, db) => {
        try {
            // let createLikesTableQuery = `
            // ALTER TABLE Likes (
            //     id INTEGER PRIMARY KEY AUTOINCREMENT,
            //     postId INTEGER,
            //     userId INTEGER,
            //     FOREIGN KEY (postId) REFERENCES News (newsId) ON DELETE CASCADE,
            //     FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE
            //   ) `;

            // await db.executeSql(createLikesTableQuery);

            let insertLikesCountQuery = `INSERT INTO Likes (postId, likesCount) VALUES (?, ?)`;
            let insertLikesCountQueryArgs = [data.newsId, 0];

            const [result] = await db.executeSql(
                insertLikesCountQuery,
                insertLikesCountQueryArgs,
            );

            if (result.rowsAffected > 0) {
                console.log('Post likes has been inserted into the database');
            } else {
                console.log('Post like has not been inserted into the database');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deletePost = async postId => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            let query = 'DELETE FROM News WHERE newsId = ?';
            let queryArgs = [postId];

            const [result] = await db.executeSql(query, queryArgs);

            if (result.rowsAffected > 0) {
                console.log(
                    `Post with ID ${postId} has been deleted from the database`,
                );
            } else {
                console.log(`Post with ID ${postId} not found in the database`);
            }
        } catch (err) {
            console.log('Error deleting post:', err);
        }
    };

    const toggleLike = async (postId, liked) => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            if (liked) {
                let incrementLikesQuery = `
                UPDATE Likes SET likesCount = likesCount + 1 WHERE postId = ?
            `;
                let incrementLikesQueryArgs = [postId];
                console.log('updated');
                await db.executeSql(incrementLikesQuery, incrementLikesQueryArgs);
            } else {
                let decrementLikesQuery = `
                UPDATE Likes SET likesCount = likesCount - 1 WHERE postId = ?
            `;
                let decrementLikesQueryArgs = [postId];
                console.log('deupdated');
                await db.executeSql(decrementLikesQuery, decrementLikesQueryArgs);
            }

            let updateIsLikedQuery = `
            UPDATE Likes SET isLiked = ? WHERE postId = ?
        `;
            let updateIsLikedQueryArgs = [liked ? 1 : 0, postId];
            await db.executeSql(updateIsLikedQuery, updateIsLikedQueryArgs);
        } catch (err) {
            console.log(err);
        }
    };

    const handleTextChange = useCallback(text => {
        setPostText(text);
        setTextLength(text.length);
        setIsTextValid(text.length > 3);
        checkIsTextValid(text);
    }, []);

    const checkIsTextValid = text => {
        const enterCount = text.match(/\n/g)?.length || 0;
        if (text.length > 150 || enterCount > 2) {
            //marginTop.setValue(50);
            setIsLongText(true);
        } else {
            //marginTop.setValue(25);
            setIsLongText(false);
        }
    };

    const handleDeletePost = async postId => {
        try {
            await deletePost(postId);

            setUsersPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId ? { ...post, deleted: true } : post,
                ),
            );
        } catch (err) {
            console.log('Error handling delete post:', err);
        }
    };

    const checkPerson = () => {
        if (identify === 'Гость') {
            setShowGuestModal(!showGuestModal);
            inputRef.current.blur();
        }
    };

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 150);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -150],
    });

    const inputContainerOpacity = diffClamp.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const marginTop = new Animated.Value(150);

    //marginTop.setValue(150);
    //marginTop.setValue(textLength > 150 ? 130 : 125);

    const marginStyle = {
        marginTop: marginTop.interpolate({
            inputRange: [0, textLength + 50],
            outputRange: [isPostSent ? 80 : 150, 80],
            extrapolate: 'clamp',
        }),
    };

    return (
        <>
            <StatusBar backgroundColor="transparent" />
            <View style={{ flex: 1 }}>
                <Image
                    blurRadius={250}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={require('../assets/images/newsoverview.jpg')}
                />
                {isLoading ? (
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            blurRadius={100}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                            source={require('../assets/images/newsoverview.jpg')}
                        />
                        <Progress.CircleSnail thickness={10} size={140} color="white" />
                    </View>
                ) : (
                    <CustomDrawer
                        navigation={navigation}
                        showBorder={true}
                        type="Сообщество"
                        fontFamily="Inter-ExtraBold"
                        letterSpacing={1}>
                        {showGuestModal && (
                            <ModalPopup visible={showGuestModal}>
                                <View style={{ alignItems: 'center' }}>
                                    <TypeWriter
                                        style={{ fontFamily: 'Inter-ExtraBold', fontSize: 20 }}
                                        minDelay={2}
                                        typing={1}>
                                        Упс...
                                    </TypeWriter>
                                    <Text
                                        style={{
                                            fontFamily: 'Inter-SemiBold',
                                            marginTop: 5,
                                            color: 'white',
                                            opacity: 0.85,
                                        }}>
                                        Чтобы делиться своими новостями, зарегестрируйтесь или
                                        войдите в аккаунт!
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        width: '50%',
                                        padding: 5,
                                        justifyContent: 'space-between',
                                        gap: 10,
                                    }}>
                                    <CustomButton
                                        text="Назад"
                                        type="Tertiary"
                                        onPress={() => setShowGuestModal(!showGuestModal)}
                                    />
                                    <CustomButton
                                        text="Войти"
                                        onPress={() => navigation.navigate('Регистрация')}
                                    />
                                </View>
                            </ModalPopup>
                        )}

                        <Animated.View
                            style={{
                                transform: [{ translateY: translateY }],
                                //zIndex: 2,
                                elevation: 4,
                                zIndex: 100,
                            }}>
                            <Animated.View
                                style={[
                                    styles.inputContainer,
                                    {
                                        backgroundColor:
                                            isScrolledToTop && !isLongText
                                                ? theme.bgWhite(0.1)
                                                : 'rgb(30 64 175)',
                                        borderColor: isScrolledToTop
                                            ? 'rgb(186 230 253)'
                                            : 'rgb(94 234 212)',
                                        opacity: inputContainerOpacity,
                                        transform: [{ translateY }],
                                    },
                                ]}>
                                <Image source={condition} style={styles.avatar} />
                                <TextInput
                                    ref={inputRef}
                                    autoFocus={false}
                                    selectionColor="white"
                                    multiline={true}
                                    numberOfLines={3}
                                    maxLength={500}
                                    style={{
                                        flex: 1,
                                        fontFamily: 'Inter-Light',
                                        maxHeight: height * 0.4,
                                        borderLeftWidth: 1,
                                        borderLeftColor: theme.bgWhite(0.2),
                                        paddingLeft: 10,
                                    }}
                                    placeholder="Что у Вас нового?"
                                    placeholderStyle={{ textAlign: 'center' }}
                                    value={postText}
                                    onFocus={checkPerson}
                                    onChangeText={text => {
                                        handleTextChange(text);
                                    }}
                                />

                                {isTextValid && (
                                    <Animatable.View animation="flipInY" duration={1000}>
                                        <TouchableOpacity onPress={handleSendPost}>
                                            <Icons.Ionicons
                                                name="send"
                                                size={32}
                                                //opacity={isTextValid ? 1 : 0}
                                                color={'rgb(125 211 252)'}
                                            />
                                        </TouchableOpacity>
                                    </Animatable.View>
                                )}
                            </Animated.View>
                        </Animated.View>

                        <View style={[styles.cardContainer]}>
                            {UsersPosts.some(post => !post.deleted) ? (
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            colors={['white']}
                                            refreshing={isRefreshing}
                                            progressBackgroundColor={'#0ea5e9'}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                    removeClippedSubviews={true}
                                    showsVerticalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    bounces={false}
                                    onScroll={e => {
                                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                                        const currentScrollPosition = e.nativeEvent.contentOffset.y;
                                        setIsScrolling(true);
                                        inputRef.current.blur();
                                        setIsScrolledToTop(prevState => {
                                            const scrolledToTop = currentScrollPosition === 0;
                                            return scrolledToTop;
                                        });
                                    }}
                                    data={UsersPosts.filter(post => !post.deleted)}
                                    renderItem={({ item }) => (
                                        <CustomPostCard
                                            navigation={navigation}
                                            key={item.id}
                                            localTime={localTime}
                                            item={{
                                                ...item,
                                                postTime: formatPostTime(item.postTime, new Date()),
                                            }}
                                            onDeletePost={handleDeletePost}
                                            toggleLike={toggleLike}
                                        />
                                    )}
                                    keyExtractor={item => item.id}
                                    ListHeaderComponent={() => (
                                        <>
                                            <Animated.View style={marginStyle}></Animated.View>
                                        </>
                                    )}
                                    ListFooterComponent={() => (
                                        <NewsFooter navigation={navigation} />
                                    )}
                                />
                            ) : (
                                <NoNewsInfo
                                    primaryText="Постов пока нет 🥲"
                                    secondaryText="Пускай Ваш будет первым!"
                                />
                            )}
                        </View>
                    </CustomDrawer>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    inputContainer: {
        //height: 75,
        margin: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        paddingHorizontal: 16,
        borderWidth: 0.5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
});
