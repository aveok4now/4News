import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from '../../../screens/MovieNewsScreen/theme';
import {width, height} from '../../../utils/global/getDimensions';
import {image185} from '../../../api/moviedb';

export default function MovieList({title, data, navigation, hideSeeAll}) {
  let upComingLink = 'https://www.imdb.com/calendar/';
  let topMoviesLink = 'https://www.imdb.com/chart/top/';

  return (
    <View style={{marginBottom: 32, marginTop: 16}}>
      <View
        style={{
          marginHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Inter-Black',
            fontSize: 20,
            lineHeight: 28,
            textShadowColor: 'rgba(226, 232, 240, 0.25)',
            textShadowOffset: {width: 0, height: 3},
            textShadowRadius: 4,
          }}>
          {title.split(' ').map((word, index) =>
            word.toLowerCase() === 'новинки' ||
            word.toLowerCase() === 'рейтинга' ? (
              <Text key={index} style={{fontFamily: 'Inter-ExtraBold'}}>
                {word}{' '}
              </Text>
            ) : (
              <Text key={index}>{word} </Text>
            ),
          )}
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NewsViewer', {
                url: title === 'Будущие новинки' ? upComingLink : topMoviesLink,
              })
            }>
            <Text
              style={[
                styles.text,
                {fontSize: 16, lineHeight: 24, fontFamily: 'Inter-Light'},
              ]}>
              Смотреть все
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('MovieScreen', item)}>
              <View style={{marginTop: 4, marginRight: 16}}>
                <Image
                  style={{
                    borderRadius: 24,
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  source={{
                    uri: image185(item.poster_path),
                  }}
                />
                <Text
                  style={{
                    color: 'rgb(209 213 219)',
                    marginLeft: 4,
                    textAlign: 'center',
                    fontFamily: 'Inter-Black',
                  }}>
                  {item.title && item.title.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
