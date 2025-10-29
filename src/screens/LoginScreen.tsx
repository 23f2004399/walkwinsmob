import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = 350;

const LoginScreen = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const glow1 = useRef(new Animated.Value(0.6)).current;
  const glow2 = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animateGlow = (anim: Animated.Value) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 0.9, duration: 3000, useNativeDriver: false }),
          Animated.timing(anim, { toValue: 0.4, duration: 3000, useNativeDriver: false }),
        ])
      ).start();
    };

    animateGlow(glow1);
    animateGlow(glow2);
  }, []);

  return (
    <LinearGradient
      colors={['#0a1a2f', '#122744', '#0b1d3d']}
      style={styles.container}
    >
      {/* Glowing top-left circle */}
      <Animated.View
        style={[
          styles.glowCircle,
          {
            top: -100,
            left: -100,
            backgroundColor: '#32cd32',
            opacity: glow1,
          },
        ]}
      />

      {/* Glowing bottom-right circle */}
      <Animated.View
        style={[
          styles.glowCircle,
          {
            bottom: -150,
            right: -150,
            backgroundColor: '#2ecc71',
            opacity: glow2,
          },
        ]}
      />

      {/* Card */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../assets/images/icon.png')}
              style={{ width: 28, height: 28, tintColor: '#6fff7e' }}
              resizeMode="contain"
            />
          </View>

          {/* Gradient WalkWins text */}
          <MaskedView maskElement={<Text style={styles.title}>WalkWins</Text>}>
            <LinearGradient colors={['#6fff7e', '#30d45c']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={[styles.title, { opacity: 0 }]}>WalkWins</Text>
            </LinearGradient>
          </MaskedView>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Welcome back! Let's get moving.</Text>

        {/* Email Label */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          {!emailFocused && <Icon name="email-outline" size={20} color="#aaa" />}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        {/* Password Label */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          {!passwordFocused && <Icon name="lock-outline" size={20} color="#aaa" />}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#6fff7e', '#30d45c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    shadowColor: '#32cd32',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 80,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#112240',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#30d45c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  label: {
    color: '#ffffff',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0b1628',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#233554',
  },
  input: {
    flex: 1,
    color: 'white',
    paddingLeft: 10,
  },
  buttonWrapper: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  footerText: {
    color: '#cbd5e1',
  },
  signupText: {
    color: '#30d45c',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
