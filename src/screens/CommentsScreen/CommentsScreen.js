import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { theme } from '../WeatherScreen/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import { useNavigation } from '@react-navigation/native';
import NoNewsInfo from '../../components/NoNewsInfo';
import { formatPostTime } from '../../utils/global/formatPostTime';
import CustomDropDown from '../../components/customs/CustomDropDown';
import Toast from 'react-native-toast-message';
import useUserImage from '../../utils/hooks/useUserImage';
import SQLite from 'react-native-sqlite-storage';
import newsBackgroundImage from '../../../assets/images/newsoverview.jpg';
import { condition, getUserImage } from '../../utils/global/getUserImage';
import ConfirmDeleteModal from './components/ConfirmDeleteModal/ConfirmDeleteModal';
import NewsImage from './components/NewsImage/NewsImage';
import NewsTitle from './components/NewsTitle/NewsTitle';
import Input from './components/Input/Input';
import Comment from './components/Comment/Comment';
import { createCommentsTable } from './db/commentFunctions';

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
  let postAuthor = item.userName || item.source?.name;

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

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [item.id, item.publishedAt]);

  const fetchComments = async () => {
    try {
      setIsRefreshing(true);
      await createCommentsTable();
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
        setIsRefreshing(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleImagePressed = () => {
    try {
      if (includesG) {
        return;
      }
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
    const postId = item.newsId || item.id || new Date(item.publishedAt).toString();

    const newComment = {
      postId: postId,
      userAvatar: condition,
      authorName: identify,
      identify: identify,
      commentText: inputText,
      timestamp: new Date().toISOString(),
    };

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

        if (identify.includes('admin')) {
          let updateQuery = `UPDATE Administrators SET adminComments = adminComments + 1 WHERE adminLogin = ?`;
          let updateQueryArgs = [newComment.authorName];
          await db.executeSql(updateQuery, updateQueryArgs);
          console.log('adminComments has been updated');
        }

      } else {
        console.log('Comment has not been inserted into the database');
      }

      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      await fetchComments();
      setInputText('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async () => {
    if (selectedCommentIndex !== null) {
      const comment = comments[selectedCommentIndex];
      console.log(comment)

      try {
        const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

        let query = 'DELETE FROM Comments WHERE id = ?';
        let queryArgs = [comment.id];

        const [result] = await db.executeSql(query, queryArgs);

        if (result.rowsAffected > 0) {
          console.log('Comment has been deleted from the database');

          if (comment.authorName && comment.authorName.includes('admin')) {
            let updateQuery = 'UPDATE Administrators SET adminComments = adminComments - 1 WHERE adminLogin = ?';
            let updateQueryArgs = [comment.authorName];
            await db.executeSql(updateQuery, updateQueryArgs);
            console.log('adminComments has been updated (decremented)');
          }
        } else {
          console.log('Comment not found in the database');
        }

        const updatedComments = [...comments];
        updatedComments.splice(selectedCommentIndex, 1);
        setComments(updatedComments);
        await fetchComments();
        setSelectedCommentIndex(null);
        setShowConfirmDeleteModal(false);
      } catch (err) {
        console.log('Error deleting comment:', err);
      }
    }
  };


  const onRefresh = async () => {
    await fetchComments();
  };

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
            source={newsBackgroundImage}
          />

          {showConfirmDeleteModal && (
            <ConfirmDeleteModal
              showConfirmDeleteModal={showConfirmDeleteModal}
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              handleDeleteComment={handleDeleteComment}
              title='Вы действительно хотите удалить этот комментарий?'
            />
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
            <NewsImage
              navigation={navigation}
              item={item}
              handleImagePressed={handleImagePressed}
              isImageUrl={isImageUrl}
              defaultImage={defaultImage}
              includesG={includesG}
              imageLoaded={imageLoaded}
            />

            <NewsTitle
              item={item}
              postAuthor={postAuthor}
              postText={postText}
              formattedDate={formattedDate}
            />
          </View>

          {identify !== 'Гость' && (
            <Input
              inputRef={inputRef}
              identify={identify}
              inputText={inputText}
              setInputText={setInputText}
              handlePublishComment={handlePublishComment}
            />
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
                bounces={false}
                refreshControl={
                  <RefreshControl
                    colors={['white']}
                    refreshing={isRefreshing}
                    progressBackgroundColor={'rgb(2 132 199)'}
                    onRefresh={onRefresh}
                  />
                }>
                {comments.map((item, index) => (
                  <Comment
                    identify={identify}
                    inputRef={inputRef}
                    setInputText={setInputText}
                    key={index}
                    userImage={userImage}
                    index={index}
                    item={item}
                    formatPostTime={formatPostTime}
                    onMorePress={() => {
                      setSelectedCommentIndex(index);
                      setShowDeleteModal(!showDeleteModal);
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {inputText.length <= 40 && (
                <NoNewsInfo
                  inputRef={inputRef}
                  primaryText="Комментариев пока нет"
                  secondaryText={
                    identify !== 'Гость'
                      ? 'Пусть Ваш будет первым!'
                      : 'Войдите в аккаунт или зарегестрируйтесь, чтобы добавлять комментарии!'
                  }
                  marginVertical={identify !== 'Гость' ? 0 : 12}
                />
              )}
            </View>
          )}
          {showToast && <Toast />}
        </Animatable.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
