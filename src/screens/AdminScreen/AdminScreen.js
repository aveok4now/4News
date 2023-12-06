import { View, Text, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import CustomDrawer from '../../components/customs/CustomDrawer';
import Carousel from 'react-native-snap-carousel';
import GroupsList from '../../components/UsersNewsComponents/GroupsList';
import { height, width } from '../../utils/getDimensions';
import { theme } from '../WeatherScreen/theme';
import { Icons } from '../../components/Icons';
import TypeWriter from 'react-native-typewriter';
import CustomButton from '../../components/customs/CustomButton';
import InfoCarousel from './components/InfoCarousel';

export default function AdminScreen({ navigation }) {
    const [activeSlide, setActiveSlide] = useState(0);

    const [canBeShowed, setCanBeShowed] = useState(false);

    const [data, setData] = useState([
        {
            id: 1,
            title: 'Пользователей',
            count: 12,
            icon: <Icons.Feather name="users" color="white" size={90} />,
        },

        {
            id: 2,
            title: 'Админов',
            count: 12,
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
    ]);

    const handleCardPress = () => { };

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
                            <CustomButton text="Скачать базу данных" type="Tertiary" onPress={getDownloadPermission} />
                        </View>
                    </View>
                </CustomDrawer>
            </Animatable.View>
        </>
    );
}
