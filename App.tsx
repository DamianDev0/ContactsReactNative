// App.tsx
import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigation from './src/navigation/appNavigation';
import Loader from './src/components/Loader';
import Toast from 'react-native-toast-message';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : (
    <AuthProvider>
      <AppNavigation />
      <Toast />
    </AuthProvider>
  );
};

export default App;
