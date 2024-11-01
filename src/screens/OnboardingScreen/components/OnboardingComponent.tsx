import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('screen');

interface OnboardingPageProps {
  animationSource: any;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({
  animationSource,
}) => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        source={animationSource}
        style={styles.lottie}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
    paddingVertical: height * 0.2,
  },
  lottie: {
    width: width * 1.1,
    height: width * 1.1,
  },
});

export default OnboardingPage;
