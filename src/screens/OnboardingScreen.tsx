import React from 'react';
import {StyleSheet, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {useNavigation} from '@react-navigation/native';
import OnboardingPage from '../components/OnboardingComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleDone = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyles={{paddingHorizontal: 15}}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        pages={[
          {
            backgroundColor: '#f5cba7',
            image: (
              <OnboardingPage
                animationSource={require('../assets/animations/AnimationE.json')}
              />
            ),
            title: 'Welcome to EasyConnect',
            subtitle: 'Easily manage your contacts and stay connected.',
          },
          {
            backgroundColor: '#bb8fce',
            image: (
              <OnboardingPage
                animationSource={require('../assets/animations/AnimationPerson.json')}
              />
            ),
            title: 'Streamline Your Tasks',
            subtitle: 'Effortlessly manage your contacts and stay organized.',
          },
          {
            backgroundColor: '#f5b7b1',
            image: (
              <OnboardingPage
                animationSource={require('../assets/animations/AnimationFour.json')}
              />
            ),
            title: 'Your Contacts, Secure and Protected',
            subtitle:
              'Keep your contact information safe with our secure contact manager.',
          },
          {
            backgroundColor: '#fef3c7',
            image: (
              <OnboardingPage
                animationSource={require('../assets/animations/AnimationContact.json')}
              />
            ),
            title: 'Personalize Your Contacts',
            subtitle:
              'Customize and manage your contacts for a tailored experience.',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#54595c',
  },
});

export default OnboardingScreen;
