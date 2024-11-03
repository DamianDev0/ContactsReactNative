// App.tsx
import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigation from './src/navigation/appNavigation';
import Loader from './src/components/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
