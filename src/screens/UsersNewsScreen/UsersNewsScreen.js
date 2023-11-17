import { StatusBar, FlatList, StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import userImage from '../../../assets/images/user.jpg';
import useUserCredentials from '../../utils/hooks/useUserCredentials';
import defaultImage from '../assets/images/newsoverview.jpg';
import CustomPostCard from '../../components/customs/CustomPostCard';
import CustomDrawer from '../../components/customs/CustomDrawer';

export default function UsersNewsScreen() {
    let identify = useUserCredentials();
    const [isRefreshing, setIsRefreshing] = useState(false)

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
            userImage: userImage
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
            userImage: userImage
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
            userImage: userImage
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
            userImage: userImage
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
            userImage: userImage
        },
    ]

    //TODO
    const getPosts = async () => {
        setIsRefreshing(false)
    }

    const onRefresh = () => {
        setIsRefreshing(true);
        getPosts();
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
                <CustomDrawer>
                    <View style={styles.cardContainer}>
                        <FlatList
                            onRefresh={onRefresh}
                            refreshing={isRefreshing}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            bounces={false}
                            data={Posts}
                            renderItem={({ item }) => <CustomPostCard item={item} />}
                            keyExtractor={item => item.id}
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
})