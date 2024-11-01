import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('screen');

const HeaderLogin = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/login.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    zIndex:1,
  },
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderLogin;
