import React from 'react';
import Toast from 'react-native-toast-message';

interface CustomToastProps {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
}

const CustomToast: React.FC<CustomToastProps> = ({
  type,
  text1,
  text2,
  position = 'bottom',
  visibilityTime = 3000,
  autoHide = true,
}) => {
  const showToast = () => {
    Toast.show({
      type,
      position,
      text1,
      text2,
      visibilityTime,
      autoHide,
    });
  };

  React.useEffect(() => {
    showToast();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text1, text2, type, position, visibilityTime, autoHide]);

  return null;
};

export default CustomToast;
