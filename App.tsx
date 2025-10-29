import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Login');

  const navigateToSignup = () => setCurrentScreen('Signup');
  const navigateToLogin = () => setCurrentScreen('Login');

  return (
    <>
      <StatusBar backgroundColor="#0a1a2f" barStyle="light-content" />
      {currentScreen === 'Login' ? (
        <LoginScreen onNavigateToSignup={navigateToSignup} />
      ) : (
        <SignupScreen onNavigateToLogin={navigateToLogin} />
      )}
    </>
  );
};

export default App;
