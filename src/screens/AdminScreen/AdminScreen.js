import { View, Text, Image, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import CustomDrawer from '../../components/customs/CustomDrawer';
import { Icons } from '../../components/Icons';
import TypeWriter from 'react-native-typewriter';
import CustomButton from '../../components/customs/CustomButton';
import InfoCarousel from './components/InfoCarousel';
import RNFS from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';

export default function AdminScreen({ navigation }) {


    useEffect(() => {
        getData();
    }, [])

    const [activeSlide, setActiveSlide] = useState(0);

    const [canBeShowed, setCanBeShowed] = useState(false);

    const [usersCount, setUsersCount] = useState(0);

    const [data, setData] = useState([]);

    const handleCardPress = () => { };


    const fetchData = async (query) => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
            const result = await db.executeSql(query);
            return result[0].rows.item(0);
        } catch (err) {
            console.log(err);
            return null;
        }
    };


    const getData = async () => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            const usersQuery = 'SELECT COUNT(*) as usersCount from Users where userLogin NOT LIKE "admin%"';
            //const adminsQuery = 'SELECT COUNT(*) as adminsCount from Users where userLogin LIKE "admin%" ';
            const adminsQuery = 'SELECT COUNT(*) as adminsCount from Administrators';

            const [usersResult, adminsResult, postsResult] = await Promise.all([
                fetchData(usersQuery),
                fetchData(adminsQuery),
                //fetchData(postsQuery),
            ]);

            const usersCount = usersResult ? usersResult.usersCount : 0;
            const adminsCount = adminsResult ? adminsResult.adminsCount : 0;

            const newData = [
                {
                    id: 1,
                    title: 'Пользователей',
                    count: usersCount,
                    icon: <Icons.Feather name="users" color="white" size={90} />,
                },
                {
                    id: 2,
                    title: 'Админов',
                    count: adminsCount,
                    icon: <Icons.FontAwesome5 name="users-cog" color="white" size={90} />,
                },
                {
                    id: 3,
                    title: 'Постов',
                    count: 12,
                    icon: <Icons.FontAwesome6 name="newspaper" color="white" size={90} />,
                },
                {
                    id: 4,
                    title: 'Лайков',
                    count: 12,
                    icon: <Icons.FontAwesome name="heart-o" color="white" size={90} />,
                },
                {
                    id: 5,
                    title: 'Сохранённых новостей',
                    count: 12,
                    icon: <Icons.FontAwesome name="star-o" color="white" size={90} />,
                },
            ];

            setData(newData)

        } catch (err) {
            console.log(err);
        }
    };


    const downloadFile = () => {
        const url = 'https://drive.google.com/file/d/1BI5ZG27azsyxB6q7X3-ONQC2_tR10GKq/view?usp=sharing';
        const filePath = RNFS.DocumentDirectoryPath + '/news.db';

        RNFS.downloadFile({
            fromUrl: url,
            toFile: filePath,
            //background: true,
            //discretionary: true,
            progress: (res) => {
                const progress = (res.bytesWritten / res.contentLength) * 100;
                console.log(`Progress: ${progress.toFixed(2)}%`);
                console.log('bites written', res.bytesWritten)
            },
        })
            .promise.then((response) => {
                console.log('File downloaded!', response);
                console.log('file saved at: ', filePath)
            })
            .catch((err) => {
                console.log('Download error:', err);
            });
    };

    return (
        <>
            <StatusBar backgroundColor="#092439" />

            <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
                <Image
                    blurRadius={50}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={require('../assets/images/search-bg.jpg')}
                />
                <CustomDrawer
                    navigation={navigation}
                    backgroundColor="transparent"
                    showBorder
                    type="Подсистема">
                    <View style={{ paddingVertical: 8 }}>
                        <TypeWriter
                            style={{
                                fontFamily: 'Inter-ExtraBold',
                                fontSize: 32,
                                textAlign: 'center',
                            }}
                            minDelay={0.2}
                            typing={1}
                            onTypingStart={() => setCanBeShowed(false)}
                            onTypingEnd={() => setCanBeShowed(true)}>
                            Добро пожаловать!
                        </TypeWriter>

                        <InfoCarousel data={data} setActiveSlide={setActiveSlide} />

                        <View style={{}}>
                            <CustomButton text="Скачать базу данных" type="Tertiary" onPress={downloadFile} />
                        </View>
                    </View>
                </CustomDrawer>
            </Animatable.View>
        </>
    );
}
