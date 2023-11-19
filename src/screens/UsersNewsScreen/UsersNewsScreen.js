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
} from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import userImage from '../../../assets/images/user.jpg';
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

export default function UsersNewsScreen({ navigation }) {
    let identify = useUserCredentials();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [postText, setPostText] = useState(null);
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

    const [showGuestModal, setShowGuestModal] = useState(false);

    const Posts = [
        {
            id: '1',
            userName: 'Иван Иванов',
            postTime: '5 минут назад',
            post: 'Sint nulla commodo cupidatat aliqua et dolor id minim non fugiat.',
            postImage: 'none',
            liked: true,
            likes: 6,
            comments: 5,
            userImage: userImage,
            deleted: false,
        },
        {
            id: '2',
            userName: 'Роберт Сидоров',
            postTime: '2 часа назад',
            post: 'Lorem est nostrud dolore deserunt. Ullamco velit elit ullamco consequat voluptate.',
            postImage: defaultImage,
            liked: false,
            likes: 4,
            comments: 0,
            userImage: userImage,
            deleted: false,
        },
        {
            id: '3',
            userName: 'Пётр Азимов',
            postTime: '4 минуты назад',
            post: 'Cillum nisi do tempor tempor voluptate duis dolore velit id sit. Aute mollit sunt excepteur non.',
            postImage: 'none',
            liked: false,
            likes: 7,
            comments: '1',
            userImage: userImage,
            deleted: false,
        },
        {
            id: '4',
            userName: 'Варвара Иванова',
            postTime: '26 минут назад',
            post: 'Sint nulla commodo cupidatat aliqua et dolor id minim non fugiat.',
            postImage: 'none',
            liked: true,
            likes: 16,
            comments: '7',
            userImage: userImage,
            deleted: false,
        },
        {
            id: '5',
            userName: 'Стас Иванов',
            postTime: '15 минут назад',
            post: 'Voluptate consequat duis tempor excepteur ea ad reprehenderit.',
            postImage: defaultImage,
            liked: false,
            likes: 6,
            comments: '3',
            userImage: userImage,
            deleted: false,
        },
    ];

    const [UsersPosts, setUsersPosts] = useState(Posts);

    //TODO
    const getPosts = async () => {
        setIsRefreshing(false);
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        getPosts();
    };

    const handleSendPost = useCallback(() => {
        if (postText && postText.length > 3) {
            const newPost = {
                id: String(UsersPosts.length + 1),
                userName: identify,
                postTime: 'Только что',
                post: postText,
                postImage: 'none',
                liked: false,
                likes: 0,
                comments: 0,
                userImage: userImage,
                deleted: false,
            };

            const updatedPosts = [newPost, ...UsersPosts];
            setPostText(null);
            setUsersPosts(updatedPosts);
        }
    }, [UsersPosts, postText, identify, userImage]);

    const handleTextChange = useCallback(
        debounce(text => setPostText(text), 1200),
        [postText],
    );

    const handleDeletePost = postId => {
        setUsersPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId ? { ...post, deleted: true } : post,
            ),
        );
    };

    const checkPerson = () => {
        if (identify === 'Гость') setShowGuestModal(!showGuestModal);
    };

    return (
        <>
            <StatusBar backgroundColor="transparent" />
            <View style={{ flex: 1 }}>
                <Image
                    blurRadius={200}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={require('../assets/images/newsoverview.jpg')}
                />
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
                                    ввойдите в аккаунт!
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
                                <CustomButton text="Войти" onPress={() => navigation.navigate('Регистрация')} />
                            </View>
                        </ModalPopup>
                    )}
                    <View style={styles.cardContainer}>
                        <FlatList
                            onRefresh={onRefresh}
                            refreshing={isRefreshing}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            bounces={false}
                            data={UsersPosts}
                            renderItem={({ item }) => (
                                <CustomPostCard item={item} onDeletePost={handleDeletePost} />
                            )}
                            keyExtractor={item => item.id}
                            ListHeaderComponent={() => (
                                <>
                                    <View style={styles.inputContainer}>
                                        <Image source={userImage} style={styles.avatar} />
                                        <TextInput
                                            autoFocus={false}
                                            selectionColor="white"
                                            multiline={true}
                                            numberOfLines={3}
                                            style={{ flex: 1 }}
                                            placeholder="Что у Вас нового?"
                                            value={postText}
                                            onChangeText={handleTextChange}
                                            onFocus={checkPerson}
                                        />
                                        <TouchableOpacity style={styles.photo}>
                                            <Icons.FontAwesome6
                                                name="image"
                                                size={24}
                                                color="#d8d9d8"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.photo, { marginHorizontal: 0 }]}
                                            onPress={handleSendPost}
                                            disabled={!postText || postText.length <= 3}>
                                            <Icons.Ionicons name="send" size={24} color="#d8d9d8" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        />
                    </View>
                </CustomDrawer>
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
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.bgWhite(0.1),
        borderRadius: 15,
        paddingHorizontal: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 16,
    },
});
