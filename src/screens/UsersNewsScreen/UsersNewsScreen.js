import {
  StatusBar,
  FlatList,
  StyleSheet,
  View,
  Image,
  Animated,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import userImage from '../../../assets/images/user.jpg';
import guestImage from '../../../assets/images/guest.jpg';
import adminImage from '../../../assets/images/admin.jpg';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import CustomPostCard from '../../components/customs/CustomPostCard';
import CustomDrawer from '../../components/customs/CustomDrawer';
import { theme } from '../WeatherScreen/theme';
import { formatPostTime } from '../../utils/global/formatPostTime';
import NoNewsInfo from '../../components/NoNewsInfo';
import SQLite from 'react-native-sqlite-storage';
import * as Progress from 'react-native-progress';
import { getUserImage } from '../../utils/global/getUserImage';
import Toast from 'react-native-toast-message';
import NewsFooterContainer from '../../components/UsersNewsComponents/NewsFooter/NewsFooter';
import newsOverViewImage from '../../../assets/images/search-bg.jpg';
import UnregisteredModal from './components/UnregisteredModal/UnregisteredModal';
import SendButton from './components/SendButton/SendButton';
import PostInput from './components/PostInput/PostInput';
import {
  insertPost,
  deletePost,
  toggleLike,
  getCommentsCount,
} from './db/usersNewsDBFunctions';
import { addIsLikedColumnIfNeeded } from '../AdminScreen/db/databaseUtils';

SQLite.enablePromise(true);

export default function UsersNewsScreen({ navigation }) {
  useEffect(() => {
    getPosts();
  }, []);

  let identify = useUserCredentials();

  condition =
    identify === 'Гость'
      ? guestImage
      : identify.includes('admin')
        ? adminImage
        : userImage;

  const [isLoading, SetIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [postText, setPostText] = useState(null);
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
  const [toastMessage, setToastMessage] = useState('');
  const [isShowToast, setShowToast] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [showFooter, setShowFooter] = useState(true);

  const getPosts = async () => {
    try {
      SetIsLoading(true);
      const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

      // let inQuery = `ALTER TABLE Likes ADD COLUMN isLiked INTEGER DEFAULT 0`;
      // await db.executeSql(inQuery)

      let query =
        'SELECT * FROM News WHERE categoryType = ? ORDER BY publishDate DESC';
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

          await addIsLikedColumnIfNeeded();

          let getIsLikedQuery = `
                        SELECT isLiked FROM Likes WHERE postId = ?
                    `;

          let getIsLikedQueryArgs = [post.newsId];
          const [isLikedResult] = await db.executeSql(
            getIsLikedQuery,
            getIsLikedQueryArgs,
          );
          console.log('isLiKed', Number(isLiked));
          const isLiked = isLikedResult.rows.item(0)?.isLiked || false;

          const commentsCount = await getCommentsCount(
            post.newsId,
            setCommentsCount,
          );

          fetchedPosts.push({
            id: post.newsId.toString(),
            userName: post.AuthorName || 'Автор',
            postTime: new Date(post.publishDate),
            post: post.newsTitle,
            postImage: 'none',
            liked: isLiked,
            likes: likesCount,
            comments: commentsCount,
            userImage: getUserImage(post.AuthorName, identify),
            deleted: false,
          });
        }

        setUsersPosts(fetchedPosts);
      }
      SetIsLoading(false);
    } catch (err) {
      console.log(err);
      SetIsLoading(false);
    } finally {
      setIsRefreshing(false);
      SetIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getPosts();
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
        await insertPost(newPost, identify);
        await addIsLikedColumnIfNeeded();

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

  const handleDeletePost = async (postId, authorName, isAdmin) => {
    try {
      console.log('handledelete poost', postId, authorName, isAdmin);
      await deletePost(postId, authorName, isAdmin);

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

  const showToast = text => {
    Toast.show({
      text1: text,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const onShowToastClose = () => {
    setToastMessage('');
    setShowToast(false);
  };

  return (
    <>
      <StatusBar backgroundColor="#092439" />
      <View style={{ flex: 1 }}>
        <Image
          blurRadius={150}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          source={newsOverViewImage}
        />
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              blurRadius={50}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              source={newsOverViewImage}
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
              <UnregisteredModal
                navigation={navigation}
                showGuestModal={showGuestModal}
                onBackPress={() => setShowGuestModal(!showGuestModal)}
                onSignInPress={() => navigation.navigate('Регистрация')}
              />
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
                        : '#092439',
                    borderColor: isScrolledToTop
                      ? 'rgb(186 230 253)'
                      : '#3a86ff',
                    opacity: inputContainerOpacity,
                    transform: [{ translateY }],
                  },
                ]}>
                <PostInput
                  condition={condition}
                  inputRef={inputRef}
                  postText={postText}
                  checkPerson={checkPerson}
                  handleTextChange={handleTextChange}
                  setShowFooter={setShowFooter}
                />

                {isTextValid && <SendButton onPress={handleSendPost} />}
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
                  //removeClippedSubviews={true}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                  //bounces={false}
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
                  data={[
                    ...UsersPosts.filter(post => !post.deleted),
                    { type: 'footer' },
                  ]}
                  renderItem={({ item }) => {
                    if (item.type === 'footer') {
                      return (
                        showFooter && (
                          <NewsFooterContainer navigation={navigation} />
                        )
                      );
                    } else {
                      return (
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
                          showToast={showToast}
                          onShowToastClose={onShowToastClose}
                        />
                      );
                    }
                  }}
                  keyExtractor={item => item.id}
                  ListHeaderComponent={() => (
                    <>
                      <Animated.View style={marginStyle} />
                    </>
                  )}
                />
              ) : (
                <NoNewsInfo
                  inputRef={inputRef}
                  primaryText="Постов пока нет 🥲"
                  secondaryText="Пускай Ваш будет первым!"
                />
              )}
            </View>
            {showToast && <Toast />}
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
    //justifyContent: 'center',
    padding: 20,
    //marginTop: 20,
    // paddingHorizontal: 20
  },
  inputContainer: {
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
});
