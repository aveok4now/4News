import { View, Text, Image, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import CustomDrawer from '../../components/customs/CustomDrawer';
import { Icons } from '../../constants/Icons';
import CustomButton from '../../components/customs/CustomButton';
import InfoCarousel from './components/Carousels/InfoCarousel/InfoCarousel';
import SQLite from 'react-native-sqlite-storage';
import {
  fetchData,
  downloadFile,
  insertCategories,
  createTableLikedMovies,
  addIsLikedColumnIfNeeded,
  createTableUsersFeedbacks,
} from './db/databaseUtils';
import AppInfoCarousel from './components/Carousels/AppInfoCarousel/appInfoCarousel';
import Loader from '../../components/MovieNewsComponents/Loader';
import AboutApp from './components/AboutAppSection/AboutApp';
import TablesCarousel from './components/Carousels/TablesCarousel/TablesCarousel';
import Title from './components/Title';
import { MemoizedTypeWriter } from './components/MemoizedComponents/MemoizedTypeWriter';
import { MemoizedScrollView } from './components/MemoizedComponents/MemoizedScrollView';
import { MemoizedClocks } from './components/MemoizedComponents/MemoizedClocks';
import searchBg from '../../../assets/images/search-bg.jpg';
import * as queries from './db/queries'
import * as fallBacks from './utils/fallBacks'

export default function AdminScreen({ navigation }) {
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [InfoCarouselActiveSlide, SetInfoCarouselActiveSlide] = useState(0);
  const [AppInfoCarouselActiveSlide, SetAppInfoCarouselActiveSlide] =
    useState(2);
  const [TablesCarouselActiveSlide, SetTablesCarouselActiveSlide] = useState(0);

  const [canBeShowed, setCanBeShowed] = useState(false);

  const [data, setData] = useState([]);
  const [appData, setAppData] = useState([]);


  const [tablesData, setTablesData] = useState([
    {
      id: 1,
      icon: <Icons.FontAwesome5 name="users" size={90} />,
      name: 'Users',
    },
    {
      id: 2,
      icon: <Icons.Entypo name="mask" size={90} />,
      name: 'Guests',
    },
    {
      id: 3,
      icon: <Icons.FontAwesome6 name="users-gear" size={90} />,
      name: 'Administrators',
    },
    {
      id: 4,
      icon: (
        <Icons.MaterialCommunityIcons
          name="newspaper-variant-multiple"
          size={90}
        />
      ),
      name: 'News',
    },
    {
      id: 5,
      icon: <Icons.MaterialIcons name="category" size={90} />,
      name: 'Categories',
    },
    {
      id: 6,
      icon: <Icons.FontAwesome name="heartbeat" size={90} />,
      name: 'Likes',
    },
    {
      id: 7,
      icon: <Icons.FontAwesome name="comments-o" size={90} />,
      name: 'Comments',
    },
    {
      id: 8,
      icon: <Icons.FontAwesome name="star" size={90} />,
      name: 'Rates',
    },
    {
      id: 9,
      icon: <Icons.Fontisto name="favorite" size={90} />,
      name: 'UserFavorites',
    },
    {
      id: 10,
      icon: <Icons.MaterialCommunityIcons name="movie" size={90} />,
      name: 'likedMovies',
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());


  const getData = async () => {

    try {
      const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

      await createTableLikedMovies();
      await addIsLikedColumnIfNeeded();
      await createTableUsersFeedbacks();
      await insertCategories();

      const [
        usersResult,
        adminsResult,
        postsResult,
        likesResult,
        favoritesResult,
        guestsResult,
        ratesResult,
        commentsResult,
        categoriesResult,
      ] = await Promise.all([
        fetchData(queries.usersQuery),
        fetchData(queries.adminsQuery),
        fetchData(queries.postsQuery),
        fetchData(queries.likesQuery),
        fetchData(queries.favoritesQuery),
        fetchData(queries.guestsQuery),
        fetchData(queries.ratesQuery),
        fetchData(queries.commentsQuery),
        fetchData(queries.categoriesQuery),
      ]);

      const getCount = (result, key) =>
        result && result[key] ? result[key] : 0;

      const ratesCount = getCount(ratesResult, 'ratesCount');
      const formattedRatesCount = ratesCount
        ? parseFloat(ratesCount).toFixed(2)
        : 'N/A';



      const newData = [
        {
          id: 1,
          title: 'Пользователей',
          count: getCount(usersResult, 'usersCount'),
          icon: <Icons.Feather name="users" color="white" size={90} />,
        },
        {
          id: 2,
          title: 'Админов',
          count: getCount(adminsResult, 'adminsCount'),
          icon: <Icons.FontAwesome5 name="users-cog" color="white" size={90} />,
        },
        {
          id: 3,
          title: 'Постов',
          count: getCount(postsResult, 'postsCount'),
          icon: <Icons.FontAwesome6 name="newspaper" color="white" size={90} />,
        },
        {
          id: 4,
          title: 'Лайков',
          count: getCount(likesResult, 'likesCount'),
          icon: <Icons.FontAwesome name="heart-o" color="white" size={90} />,
        },
        {
          id: 5,
          title: 'Сохранённых новостей',
          count: getCount(favoritesResult, 'favoritesCount'),
          icon: <Icons.FontAwesome name="star-o" color="white" size={90} />,
        },
        {
          id: 6,
          title: 'Гостей',
          count: getCount(guestsResult, 'guestsCount'),
          icon: (
            <Icons.FontAwesome5 name="user-secret" color="white" size={90} />
          ),
        },
        {
          id: 7,
          title: 'Комментариев',
          count: getCount(commentsResult, 'commentsCount'),
          icon: <Icons.FontAwesome5 name="comments" color="white" size={90} />,
        },
        {
          id: 8,
          title: 'Категорий',
          count: getCount(categoriesResult, 'categoriesCount'),
          icon: (
            <Icons.MaterialIcons name="category" color="white" size={100} />
          ),
        },
      ];

      setData(newData);
      getAppData();
    } catch (err) {
      console.log(err);
    }
  };

  const getAppData = async () => {

    try {
      const ratesQuery = 'SELECT AVG(rating) as averageRating FROM Rates';
      const mostPopularCityQuery = `SELECT userCity, COUNT(userCity) as cityCount
            FROM Users
            GROUP BY userCity
            ORDER BY cityCount DESC, userCity DESC;
            `;
      const feedBacksQuery =
        'SELECT COUNT(*) as feedBacksCount FROM UsersFeedbacks';
      const likedMoviesQuery =
        'SELECT COUNT(*) as likedMoviesCount FROM likedMovies';
      const lastRegisteredUserQuery =
        'SELECT userLogin FROM Users ORDER BY userId DESC LIMIT 1';
      const lastSavedMovieQuery =
        'SELECT title FROM likedMovies WHERE rowid = last_insert_rowid()';

      const ratesResult = await fetchData(ratesQuery);
      const cityResult = await fetchData(mostPopularCityQuery);
      const feedBacksResult = await fetchData(feedBacksQuery);
      const likedMoviesResult = await fetchData(likedMoviesQuery);
      const lastRegisteredUserResult = await fetchData(lastRegisteredUserQuery);
      const lastSavedMovieResult = await fetchData(lastSavedMovieQuery);

      const averageRating =
        ratesResult && ratesResult.averageRating
          ? parseFloat(ratesResult.averageRating).toFixed(2)
          : fallBacks.fallBackRating;

      const mostPopularCity = cityResult.userCity || fallBacks.fallBackCity;
      const feedBacksCount = feedBacksResult.feedBacksCount;
      const likedMoviesCount = likedMoviesResult.likedMoviesCount;
      const lastRegisteredUser = lastRegisteredUserResult.userLogin;

      const lastSavedMovie =
        lastSavedMovieResult && lastSavedMovieResult.title
          ? lastSavedMovieResult.title
          : fallBacks.fallBackMovie;


      const newAppData = [
        {
          id: 1,
          title: 'Cредний рейтинг',
          count: averageRating,
          icon: <Icons.FontAwesome name="star" color="white" size={75} />,
          color1: '#40c9ff',
          color2: '#e81cff',
          description:
            'Средний рейтинг приложения на основе оценок пользователей в секции «Оцените нас» ',
        },
        {
          id: 2,
          title: <Text style={{ fontSize: 24 }}>Популярный{'\n'}город</Text>,
          count: <Text style={{ fontSize: 35 }}>{mostPopularCity}</Text>,
          icon: <Icons.FontAwesome name="building" color="white" size={75} />,
          color1: '#ff1b6b',
          color2: '#45caff',
          description:
            'Самый популярный город на основе выбора в секции прогноза погоды.',
        },
        {
          id: 3,
          title: 'Всего отзывов',
          count: feedBacksCount,
          icon: (
            <Icons.MaterialCommunityIcons
              name="message-reply-text"
              color="white"
              size={75}
            />
          ),
          color1: '#696eff',
          color2: '#f8acff',
          description:
            'Количество отзывов, отправленных пользователями в секции «Оставить отзыв»',
        },
        {
          id: 4,
          title: <Text style={{ fontSize: 22 }}>Избранных фильмов</Text>,
          count: likedMoviesCount,
          icon: (
            <Icons.MaterialCommunityIcons
              name="movie"
              color="white"
              size={75}
            />
          ),
          color1: '#7ef29d',
          color2: '#0f68a9',
          description: 'Число фильмов, добавленных пользователями в избранное',
        },
        {
          id: 5,
          title: (
            <Text style={{ fontSize: 18 }}>
              Последний{'\n'}зарегестрировавшийся{'\n'}пользователь
            </Text>
          ),
          count: (
            <Text style={{ fontSize: 32, fontFamily: 'Inter-ExtraBold' }}>
              {lastRegisteredUser}
            </Text>
          ),
          icon: <Icons.FontAwesome5 name="user-plus" color="white" size={70} />,
          color1: '#30c5d2',
          color2: '#471069',
          description:
            'Последний пользователь, зарегестрировавшийся в приложении.',
        },
        {
          id: 6,
          title: (
            <Text style={{ fontSize: 22 }}>Последний{'\n'}лайкнутый фильм</Text>
          ),
          count: (
            <Text style={{ fontSize: 24, fontFamily: 'Inter-ExtraBold' }}>
              {lastSavedMovie}
            </Text>
          ),
          icon: (
            <Icons.MaterialCommunityIcons
              name="movie-open-star-outline"
              color="white"
              size={70}
            />
          ),
          color1: '#b429f9',
          color2: '#26c5f3',
          description:
            'Последний понравившийся пользователям фильм в секции «Новости кино»',
        },
      ];

      setAppData(newAppData);
      setIsRefreshing(false);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    setIsLoading(true);
    await getData();
  };

  return (
    <>
      <StatusBar backgroundColor="#092439" />

      {isLoading ? (
        <>
          <Image
            blurRadius={30}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            source={searchBg}
          />
          <Loader />
        </>
      ) : (
        <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
          <Image
            blurRadius={50}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            source={searchBg}
          />
          <CustomDrawer
            navigation={navigation}
            backgroundColor="transparent"
            showBorder
            type="Подсистема">
            {/* Main pure component */}
            <MemoizedScrollView
              onRefresh={onRefresh}
              isRefreshing={isRefreshing}
              style={{ paddingVertical: 8 }}
              showsVerticalScrollIndicator={false}>
              {/* Title */}
              <MemoizedTypeWriter setCanBeShowed={setCanBeShowed} />

              {/* Date with clocks */}
              <MemoizedClocks currentTime={currentTime} />

              {/* Carousel with database info */}
              <InfoCarousel
                data={data}
                setActiveSlide={SetInfoCarouselActiveSlide}
              />

              {/* Download database button */}
              <View style={{}}>
                <CustomButton
                  text="Скачать базу данных"
                  type="Tertiary"
                  onPress={downloadFile}
                />
              </View>

              <Title title={'Статистика'} />

              {/* Carousel with app's info */}
              <AppInfoCarousel
                activeSlide={AppInfoCarouselActiveSlide}
                data={appData}
                setActiveSlide={SetAppInfoCarouselActiveSlide}
              />

              <Title title="Таблицы" />

              {/* Database tables carousel */}
              <TablesCarousel
                navigation={navigation}
                data={tablesData}
                setActiveSlide={SetTablesCarouselActiveSlide}
              />

              <Title title="О приложении" />

              {/* About app section */}
              <AboutApp />
            </MemoizedScrollView>
          </CustomDrawer>
        </Animatable.View>
      )}
    </>
  );
}
