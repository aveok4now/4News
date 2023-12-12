import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Card from '../../components/Card';
import LottieView from 'lottie-react-native';
import { width } from '../global/getDimensions';
import { theme } from '../../screens/WeatherScreen/theme';
import { apiKeyList } from '../apiKeys/newsApiKeys';
import searchBgImage from '../../../assets/images/search-bg.jpg'
import newsAnimation from '../../../assets/animations/news.json'

import ShimmerCard from '../../components/ShimmerCard';

const Search = ({ navigation }) => {
  const [SearchText, setSearchText] = useState('');
  const [Data, setData] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let apiKeyIndex = 0;
  let searchTimer = null;

  const searchNews = async text => {
    try {
      setIsLoading(true);
      if (searchTimer) {
        clearTimeout(searchTimer);
      }

      searchTimer = setTimeout(async () => {
        const ruResponse = await fetch(
          `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`,
        );
        const usResponse = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`,
        );

        if (ruResponse.status === 429 || usResponse.status === 429) {
          apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
          return await searchNews(text);
          //throw new Error(`RuResponse Error: ${ruResponse.status}`);
        }

        const ruData = await ruResponse.json();
        const usData = await usResponse.json();

        const combinedData = [...ruData.articles, ...usData.articles];

        if (combinedData.length === 0) {
          setNoResultsMessage('Кажется, ничего не найдено');
        } else {
          setNoResultsMessage('');
        }
        setIsLoading(false);
        setData(combinedData);
        setWasSearched(!wasSearched);
      });
    } catch (error) {
      console.error('Error in SearchNews:', error);
    }
  };

  const handleTextChange = text => {
    setSearchText(text);
    if (text.length >= 2) {
      searchNews(text);
    } else {
      setData([]);
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <StatusBar backgroundColor="#2e408a" />
      <View style={{ flex: 1 }}>
        <ImageBackground
          blurRadius={100}
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 0,
          }}
          source={searchBgImage}
        />
        <Animatable.View style={[{ flex: 1 }]} animation="fadeIn" duration={1500}>
          <Animatable.View
            style={[
              styles.search,
              { backgroundColor: isFocused ? theme.bgWhite(0.2) : 'transparent' },
            ]}
            animation="fadeIn"
            duration={1000}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Домашняя страница');
              }}>
              <Icon
                style={styles.arrow}
                name="arrowleft"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <TextInput
              style={{ fontSize: 16, width: '100%', fontFamily: 'Inter-Bold' }}
              placeholder="Что будем искать?"
              placeholderTextColor={'white'}
              onChangeText={handleTextChange}
              selectionColor={'#F7F6C5'}
              value={SearchText}
              maxLength={20}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </Animatable.View>

          {Data.length === 0 && isLoading && SearchText.length !== 0 && (
            <ScrollView>
              <ShimmerCard />
            </ScrollView>
          )}

          {Data.length === 0 && !isLoading && (
            <View style={{ flex: 1, alignItems: 'center' }}>
              {wasSearched && SearchText.length !== 0 && (
                <Text style={{ textAlign: 'center', fontFamily: 'Inter-Light' }}>
                  {noResultsMessage}
                </Text>
              )}
              <LottieView
                style={styles.lottie}
                source={newsAnimation}
                autoPlay={true}
                loop={true}
              />
            </View>
          )}
          {SearchText.length !== 0 && (
            <FlatList
              style={{ flex: 1, zIndex: 1 }}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              data={Data}
              renderItem={({ item, index }) => {
                return <Card item={item} navigation={navigation} data={Data} />;
              }}
            />
          )}
        </Animatable.View>
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchRoot: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 0.25,
    borderColor: 'white',
    elevation: 1,
    paddingHorizontal: 10,
    borderRadius: 35,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  arrow: {
    marginRight: '5%',
  },
  lottie: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width,
    height: width,
    marginTop: '30%',
  },
});
