import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Category(props) {
  return (
    <TouchableOpacity>
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#dddddd',
        }}>
        <View style={{ flex: 2 }}>
          <Image
            source={props.imageUri}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain',
            }}
          />
        </View>

        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text style={styles.categoryName}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryName: {
    fontFamily: 'Inter-Light',
  },
});
