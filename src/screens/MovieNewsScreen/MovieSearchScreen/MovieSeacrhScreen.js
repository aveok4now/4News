import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {width, height} from '../../../utils/global/getDimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme';
import {Icons} from '../../../utils/global/Icons';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import newsAnimation from '../../../../assets/animations/nothing_found.json';
import Loader from '../../../components/MovieNewsComponents/Loader';
import {debounce} from 'lodash';
import {image185, searchMovies} from '../../../api/moviedb';

export default function MovieSeacrhScreen() {
  const [showSearch, setShowSearch] = useState(true);
  const [results, setResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSearch = value => {
    if (value && value.length > 2) {
      setIsLoading(true);
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'ru-RU',
        page: '1',
      }).then(data => {
        setIsLoading(false);
        //console.log("фильмы: ", data)
        if (data && data.results) {
          setResults(data.results);
        }
      });
    } else {
      setIsLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'rgb(30 58 138)', display: 'flex'}}>
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 35,
          backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
          marginTop: '2%',
          borderWidth: 1,
          borderColor: theme.bgWhite(0.3),
        }}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Искать фильмы 🎥"
          style={{
            paddingLeft: 24,
            height: 40,
            flex: 1,
            fontSize: 16,
            lineHeight: 24,
            fontFamily: 'Inter-Light',
            paddingBottom: 8,
          }}
          selectionColor="white"
          placeholderTextColor={'lightgray'}
        />

        <TouchableOpacity
          //onPress={() => setShowSearch(!showSearch)}
          onPress={() => navigation.navigate('MovieNewsScreen')}
          style={{
            borderRadius: 999,
            padding: 10,
            margin: 2,
            backgroundColor: theme.bgWhite(0.3),
          }}>
          <Icons.Ionicons name="close-sharp" size={25} color="white" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loader />
      ) : results.length > 0 ? (
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          style={{marginTop: 12}}>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              color: 'white',
              marginLeft: 4,
            }}>
            Результаты ({results.length})
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('MovieScreen', item)}>
                  <View style={{marginTop: 8, marginBottom: 16}}>
                    <Image
                      style={{
                        borderRadius: 24,
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      source={{
                        uri: image185(item?.poster_path),
                      }}
                    />
                    <Text
                      style={{
                        color: 'rgb(229 229 229)',
                        marginLeft: 4,
                        fontFamily: 'Inter-Light',
                      }}>
                      {item?.title.length > 18
                        ? item?.title.slice(0, 18) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <LottieView
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: width,
              height: height * 0.5,
            }}
            source={newsAnimation}
            autoPlay
            loop
          />
        </View>
      )}
    </SafeAreaView>
  );
}
