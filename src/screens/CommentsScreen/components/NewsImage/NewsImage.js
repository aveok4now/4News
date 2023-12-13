import {
  View,
  Pressable,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

export default function NewsImage({
  navigation,
  handleImagePressed,
  isImageUrl,
  defaultImage,
  imageLoaded,
  includesG,
  item,
}) {
  return (
    <Pressable onPress={handleImagePressed}>
      <View
        style={{
          width: 65,
          height: 65,
        }}>
        <Animatable.View
          animation="slideInLeft"
          duration={1000}
          style={styles.imageContainer}>
          {isImageUrl ? (
            <TouchableWithoutFeedback
              onPress={() =>
                !includesG && navigation.navigate('NewsViewer', {url: item.url})
              }>
              <Image
                source={{
                  uri: imageLoaded
                    ? item.urlToImage || defaultImage
                    : defaultImage,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback>
              <Image
                source={item.userImage}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </TouchableWithoutFeedback>
          )}
        </Animatable.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 155,
    borderWidth: 1.5,
    borderColor: 'transparent',
    overflow: 'hidden',
    shadowColor: 'rgba(245, 40, 145, 1)',
    elevation: 1,
    marginHorizontal: '10%',
  },
});
