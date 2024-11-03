import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#000" />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Loader;
