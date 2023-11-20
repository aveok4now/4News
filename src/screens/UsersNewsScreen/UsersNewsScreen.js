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

export default function UsersNewsScreen({ navigation }) {
    let identify = useUserCredentials();

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



    const Posts = [
        {
            id: '1',
            userName: 'Иван Иванов',
            postTime: new Date(),
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
            postTime: new Date(),
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
            postTime: new Date(),
            post: 'Cillum nisi do tempor tempor voluptate duis dolore velit id sit. Aute mollit sunt excepteur non.',
            postImage: 'none',
            liked: false,
            likes: 7,
            comments: 1,
            userImage: userImage,
            deleted: false,
        },
        {
            id: '4',
            userName: 'Варвара Иванова',
            postTime: new Date(),
            post: 'Sint nulla commodo cupidatat aliqua et dolor id minim non fugiat.',
            postImage: 'none',
            liked: true,
            likes: 16,
            comments: 7,
            userImage: userImage,
            deleted: false,
        },
        {
            id: '5',
            userName: 'Стас Иванов',
            postTime: new Date(),
            post: 'Voluptate consequat duis tempor excepteur ea ad reprehenderit.',
            postImage: defaultImage,
            liked: false,
            likes: 6,
            comments: 3,
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

    const [localTime, setLocalTime] = useState(new Date());

    const handleSendPost = useCallback(() => {
        if (postText && postText.length > 3) {
            const newPost = {
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
            setPostText(null);
            if (!(newPost.postTime instanceof Date && !isNaN(newPost.postTime.getTime()))) {
                console.log('Invalid date in handleSendPost');
                return;
            }

            const updatedPosts = [newPost, ...UsersPosts];

            setUsersPosts(updatedPosts);
        }
    }, [UsersPosts, postText, identify, userImage]);

    const handleTextChange = useCallback((text) => {
        setPostText(text);
        setIsTextValid(text.length > 3);
    }, []);




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
                                    Чтобы делиться своими новостями, зарегестрируйтесь или войдите
                                    в аккаунт!
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
                    <View style={{

                    }}>
                        <View style={styles.inputContainer}>
                            <Image source={condition} style={styles.avatar} />
                            <TextInput
                                autoFocus={false}
                                selectionColor="white"
                                multiline={true}
                                numberOfLines={3}
                                style={{ flex: 1 }}
                                placeholder="Что у Вас нового?"
                                value={postText}
                                onChangeText={(text) => {
                                    handleTextChange(text);
                                    checkPerson();
                                }}
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
                                disabled={!isTextValid}>
                                <Icons.Ionicons name="send" size={24} color={!isTextValid ? 'lightgray' : "rgb(56 189 248)"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <FlatList
                            onRefresh={onRefresh}
                            refreshing={isRefreshing}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            bounces={false}
                            data={UsersPosts}
                            renderItem={({ item }) => (
                                <CustomPostCard
                                    key={item.id}
                                    localTime={localTime}
                                    item={{
                                        ...item,
                                        postTime: formatPostTime(item.postTime, new Date()),
                                    }}
                                    onDeletePost={handleDeletePost}
                                />

                            )}
                            keyExtractor={item => item.id}
                        // ListHeaderComponent={() => (

                        // )}
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
        margin: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.bgWhite(0.1),
        borderRadius: 15,
        paddingHorizontal: 16,
        borderWidth: 0.5,
        borderColor: 'rgb(226 232 240)'
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
