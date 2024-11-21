import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TabBarIconProps {
  routeName: string;
  color: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({routeName, color}) => {
  let iconName: string;

  switch (routeName) {
    case 'Home':
      iconName = 'address-book';
      break;
    case 'Form':
      iconName = 'user-plus';
      break;
    case 'Profile':
      iconName = 'user-circle-o';
      break;
    default:
      iconName = 'user-circle-o';
  }

  return <Icon name={iconName} color={color} size={22} />;
};

export default TabBarIcon;
