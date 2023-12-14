import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {handleUsersNewsShare} from '../../../../utils/newsUtils/Share';
import {Icons} from '../../../../constants/Icons';
import {formatPostTime} from '../../../../utils/global/formatPostTime';

export default function NewsTitle({item, postAuthor, postText, formattedDate}) {
  return (
    <Animatable.View animation="slideInRight" duration={1000}>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Inter-ExtraBold',
          textAlign: 'auto',
          paddingHorizontal: 15,
          fontSize: 18,
          letterSpacing: -1,
        }}>
        {postAuthor && postText && postText.length > 150
          ? postText.slice(0, 150) + ' ...'
          : postText}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: 'white',
            opacity: 0.8,
            fontFamily: 'Inter-Light',
            textAlign: 'justify',
            paddingHorizontal: 15,
            fontSize: 14,
          }}>
          {postAuthor}
          {' • '}
          {formattedDate}
        </Text>
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() =>
            handleUsersNewsShare({
              newsTitle: item.title || item.post,
              author: item.userName || item.author,
              postTime: item.postTime || formatPostTime(item.publishedAt),
            })
          }>
          <Icons.FontAwesome name={'send-o'} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}
