import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { width } from '../../../../utils/global/getDimensions';
import { theme } from '../../../WeatherScreen/theme';

export default function CategoryList({
  Category,
  Select,
  setSelect,
  getData2,
  flatListRef,
}) {
  return (
    <Animatable.View animation="fadeIn" duration={1500} style={styles.horList}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={Category}
        bounces={false}
        initialScrollIndex={0}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={index == Select ? styles.selListItem : styles.horListItem}
              onPress={() => {
                setSelect(index);
                getData2(Category[index].category);
                flatListRef.current.scrollToIndex({
                  index: 1,
                  animated: true,
                });
              }}>
              <Text
                style={
                  index == Select ? styles.selListText : styles.horListText
                }>
                {item.nameRU}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  horList: {
    //paddingHorizontal: 10,
    width: width,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  selListItem: {
    backgroundColor: theme.bgWhite(0.35),
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 12,
    borderRadius: 24,
    borderColor: '#c7d2fe',
    borderWidth: 0.75,
  },
  horListItem: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 12,
    borderRadius: 24,
    borderColor: 'rgb(156 163 175)',
    backgroundColor: theme.bgWhite(0.15),
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
  },
  horListText: {
    color: 'rgb(203 213 225)',
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },

  selListText: {
    fontFamily: 'Inter-ExtraBold',
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
