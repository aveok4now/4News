import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Card from '../../components/Card';
import NetInfo from '@react-native-community/netinfo';
import CustomDrawer from '../../components/customs/CustomDrawer';
import FloatingButton from '../../components/customs/FloatingButton';
import CustomCarousel from '../../components/customs/CustomCarousel';
import { apiKeyList } from '../../utils/apiKeys/newsApiKeys';
import newsBackgroundImage from '../../../assets/images/newsoverview.jpg';
import ConnectionStatus from './components/ConnectionStatus/ConnectionStatus';
import HomeLoader from './components/HomeLoader/HomeLoader';
import CategoryList from './components/CategoryList/CategoryList';

const HomeScreen = ({ navigation }) => {
  const [isFetchingError, setIsFetchingError] = useState(false);
  const [Loading, setIsLoading] = useState(false);
  const [Data, setData] = useState([]);

  const [Select, setSelect] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const [showConnectionStatus, setShowConnectionStatus] = useState(false);
  const [wasProblem, setWasProblem] = useState(false);

  const flatListRef = useRef(null);

  const [Category, SetCategory] = useState([
    {
      id: 1,
      name: 'Top Headlines',
      nameRU: 'Главное',
      category: 'general',
    },
    {
      id: 5,
      name: 'Sports',
      nameRU: 'Спорт',
      category: 'sports',
    },
    {
      id: 2,
      name: 'Business',
      nameRU: 'Бизнес',
      category: 'business',
    },
    {
      id: 3,
      name: 'Entertainment',
      nameRU: 'Развлечения',
      category: 'entertainment',
    },
    {
      id: 4,
      name: 'Health',
      nameRU: 'Здоровье',
      category: 'health',
    },
    {
      id: 6,
      name: 'Science',
      nameRU: 'Наука',
      category: 'science',
    },
    {
      id: 7,
      name: 'Technology',
      nameRU: 'Технологии',
      category: 'technology',
    },
  ]);

  let apiKeyIndex = 0;

  const fetchDataByCountry = async (country, category) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKeyList[apiKeyIndex]}&category=${category}`,
    );
    if (response.status === 429) {
      apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
      return fetchDataByCountry(country, category);
    }
    return response.json();
  };

  const getData = async () => {
    try {
      setIsLoading(true);

      const ruData = await fetchDataByCountry('ru', Category[Select].category);
      const usData = await fetchDataByCountry('us', Category[Select].category);

      const combinedData = [...ruData.articles, ...usData.articles];

      combinedData.sort(() => Math.random() - 0.5);
      setData(combinedData);
      setIsRefreshing(false);
      setIsLoading(false);
    } catch (error) {
      console.log('Error in getData:', error);
      setIsFetchingError(true);
      setIsRefreshing(false);
    }
  };

  const getData2 = async category => {
    try {
      //setIsLoading(true)
      const ruData = await fetchDataByCountry('ru', category);
      const usData = await fetchDataByCountry('us', category);

      const combinedData = [...ruData.articles, ...usData.articles];

      combinedData.sort(() => Math.random() - 0.5);
      setData(combinedData);
      setIsRefreshing(false);
      setIsLoading(false);
    } catch (error) {
      console.log('Error in getData2:', error);
      setIsFetchingError(true);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected == true) {
        getData();
        setShowConnectionStatus(true);
        setTimeout(() => {
          setShowConnectionStatus(false);
        }, 2000);
      } else {
        setWasProblem(true);
      }
    });
    getData();

    return () => {
      unsubscribe();
    };
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    getData();
  };

  return (
    <>
      <StatusBar backgroundColor="#092439" />
      {!isConnected ? (
        <ConnectionStatus
          animationName="fadeInDown"
          duration={1000}
          bgColor="red"
          statusText={'Отсутствует интернет-соединение'}
        />
      ) : (
        showConnectionStatus &&
        wasProblem && (
          <ConnectionStatus
            animationName="fadeInDown"
            duration={1000}
            bgColor="green"
            statusText={'Подключение установлено!'}
          />
        )
      )}

      {Loading ? (
        <HomeLoader />
      ) : (
        <View style={{ flex: 1 }}>
          <Image
            blurRadius={200}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            source={newsBackgroundImage}
          />
          <CustomDrawer
            type="Новости"
            showSearch="true"
            showBorder={true}
            fontFamily="Inter-ExtraBold"
            letterSpacing={1}
            navigation={navigation}>
            <View style={{ flex: 1 }}>
              <CategoryList
                Category={Category}
                Select={Select}
                setSelect={setSelect}
                getData2={getData2}
                flatListRef={flatListRef}
              />

              <View style={{ flex: 1 }}>
                <View style={{ height: Dimensions.get('window').height * 0.78 }}>
                  <FlatList
                    ref={flatListRef}
                    style={{ flex: 1, zIndex: 100, position: 'relative' }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    refreshControl={
                      <RefreshControl
                        colors={['white']}
                        refreshing={isRefreshing}
                        progressBackgroundColor={'rgb(2 132 199)'}
                        onRefresh={onRefresh}
                      />
                    }
                    data={Data}
                    onScroll={event => {
                      const currentScrollPosition =
                        event.nativeEvent.contentOffset.y;
                      setShowFloatingButton(
                        currentScrollPosition < prevScrollPosition ||
                        (isScrolledToBottom &&
                          currentScrollPosition > prevScrollPosition),
                      );
                      setPrevScrollPosition(currentScrollPosition);
                      setIsScrolledToTop(currentScrollPosition === 0);

                      const windowHeight = Dimensions.get('window').height;
                      const contentHeight =
                        event.nativeEvent.contentSize.height;
                      const isBottomReached =
                        currentScrollPosition + windowHeight >= contentHeight;
                      setIsScrolledToBottom(isBottomReached);
                    }}
                    onEndReached={() => setIsScrolledToBottom(true)}
                    ListHeaderComponent={React.memo(() => (
                      <View>
                        <Image
                          blurRadius={70}
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                          }}
                          source={newsBackgroundImage}
                        />

                        <CustomCarousel
                          apiKeyList={apiKeyList}
                          apiKeyIndex={apiKeyIndex}
                          navigation={navigation}
                        />
                      </View>
                    ))}
                    renderItem={({ item, index }) => {
                      return (
                        <Card
                          item={item}
                          navigation={navigation}
                          data={Data}
                          needMargin={false}
                        />
                      );
                    }}
                  />
                </View>
              </View>

              {showFloatingButton && !isScrolledToTop && Data.length > 0 && (
                <FloatingButton
                  onPress={() => {
                    flatListRef.current.scrollToOffset({
                      offset: 0,
                      animated: true,
                    });
                  }}
                />
              )}
            </View>
          </CustomDrawer>
        </View>
      )}
    </>
  );
};

export default HomeScreen;
