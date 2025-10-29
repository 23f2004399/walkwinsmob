import React from 'react';
import { StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#0a1a2f" barStyle="light-content" />
      <LoginScreen />
    </>
  );
};

export default App;
