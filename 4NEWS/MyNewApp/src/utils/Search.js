import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';


const Search = () => {
    return (
        <Animatable.View style={styles.header} animation="fadeIn" duration={1500}>

            <Text>Search</Text>
        </Animatable.View>
    );
}

export default Search;

const styles = StyleSheet.create({

})