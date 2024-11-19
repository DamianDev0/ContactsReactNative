import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface TabBarIconProps {
  routeName: string;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ routeName, color, size }) => {
  let iconName: string;

  switch (routeName) {
    case 'Home':
      iconName = 'people-outline';
      break;
    case 'Form':
      iconName = 'person-add-outline';
      break;
    default:
      iconName = 'alert-circle-outline';
  }

  return <Icon name={iconName} color={color} size={size} />;
};

export default TabBarIcon;
