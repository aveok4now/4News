import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Icons } from '../../../../constants/Icons';
import { theme } from '../../../WeatherScreen/theme';

export default function Comment({

  userImage,
  index,
  item,
  formatPostTime,
  onMorePress,
}) {
  return (
    <View key={index} style={styles.feedItem}>
      <Image source={item.userAvatar || userImage} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.name}>{item.authorName}</Text>
            <Text style={styles.timestamp}>
              {formatPostTime(item.timestamp, new Date())}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: theme.bgWhite(0.3),
              borderRadius: 25,
              padding: 4,
            }}
            onPress={onMorePress}>
            <Icons.MaterialIcons
              name="more-horiz"
              size={28}
              color="rgb(96 165 250)"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.post}>{item.postText || item.commentText}</Text>
        {item.postImage && (
          <Image
            src={item.postImage}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: theme.bgWhite(0.7),
    borderRadius: 15,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'rgb(96 165 250)',
    textShadowColor: 'rgba(8, 51, 68, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Light',
    color: 'rgb(163 163 163)',
    marginTop: 2,
    textShadowColor: 'rgba(226, 232, 240, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Light',
    color: 'rgb(22 78 99)',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
