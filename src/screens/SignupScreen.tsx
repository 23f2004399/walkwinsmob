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
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const SignupScreen = ({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [referralFocused, setReferralFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Dummy states for step 2 (you can replace these later)
  const [field1Focused, setField1Focused] = useState(false);
  const [field2Focused, setField2Focused] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  
  const glow1 = useRef(new Animated.Value(0.3)).current;
  const glow2 = useRef(new Animated.Value(0.3)).current;
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateCircle = (opacityAnim: Animated.Value, scaleAnim: Animated.Value, duration1: number, duration2: number) => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(opacityAnim, { toValue: 0.6, duration: duration1, useNativeDriver: false }),
            Animated.timing(opacityAnim, { toValue: 0.3, duration: duration1, useNativeDriver: false }),
          ]),
          Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.1, duration: duration2, useNativeDriver: false }),
            Animated.timing(scaleAnim, { toValue: 1, duration: duration2, useNativeDriver: false }),
          ]),
        ])
      ).start();
    };

    animateCircle(glow1, scale1, 3000, 3000);
    animateCircle(glow2, scale2, 4000, 4000);
  }, []);

  const handleNext = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(2);
      slideAnim.setValue(width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBack = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(1);
      slideAnim.setValue(-width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const GradientText = ({ children, style }: any) => (
    <MaskedView maskElement={<Text style={style}>{children}</Text>}>
      <LinearGradient colors={['#5EA02A', '#8BC34A', '#4CAF50']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );

  const renderStep1 = () => (
    <View style={styles.card}>
      {/* Header with logo and title */}
      <View style={styles.titleContainer}>
        <View style={styles.iconContainer}>
          <Image 
            source={require('../assets/images/icon.png')}
            style={styles.titleIcon}
            resizeMode="contain"
          />
        </View>
        <GradientText style={styles.title}>Join WalkWins</GradientText>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Start your fitness journey today!</Text>

      {/* Username Label */}
      <Text style={styles.label}>Username</Text>
      <View style={[styles.inputContainer, usernameFocused && styles.inputContainerFocused]}>
        <Icon name="account-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#9CA3AF"
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
          autoCapitalize="none"
        />
      </View>

      {/* Email Label */}
      <Text style={styles.label}>Email</Text>
      <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
        <Icon name="email-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#9CA3AF"
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {/* Password Label */}
      <Text style={styles.label}>Password</Text>
      <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}>
        <Icon name="lock-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon 
            name={isPasswordVisible ? "eye-off" : "eye"} 
            size={24} 
            color="#9CA3AF" 
            style={styles.iconToggle} 
          />
        </Pressable>
      </View>

      {/* Referral Code Label */}
      <Text style={styles.label}>Referral Code (Optional)</Text>
      <View style={[styles.inputContainer, referralFocused && styles.inputContainerFocused]}>
        <Icon name="gift-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#9CA3AF"
          onFocus={() => setReferralFocused(true)}
          onBlur={() => setReferralFocused(false)}
          autoCapitalize="characters"
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity activeOpacity={0.8} style={styles.buttonWrapper} onPress={handleNext}>
        <LinearGradient
          colors={['#6FAF2D', '#8BC34A', '#4CAF50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={onNavigateToLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.card}>
      {/* Header with logo and title */}
      <View style={styles.titleContainer}>
        <View style={styles.iconContainer}>
          <Image 
            source={require('../assets/images/icon.png')}
            style={styles.titleIcon}
            resizeMode="contain"
          />
        </View>
        <GradientText style={styles.title}>Almost There!</GradientText>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Complete your profile</Text>

      {/* Age Label */}
      <Text style={styles.label}>Age</Text>
      <View style={[styles.inputContainer, field1Focused && styles.inputContainerFocused]}>
        <Icon name="calendar" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#9CA3AF"
          onFocus={() => setField1Focused(true)}
          onBlur={() => setField1Focused(false)}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      {/* Gender Label */}
      <Text style={styles.label}>Gender</Text>
      <View style={{ position: 'relative' }}>
        <View style={[styles.inputContainer, genderDropdownOpen && styles.inputContainerFocused]}>
          <Icon name="gender-male-female" size={24} color="#9CA3AF" style={styles.inputIcon} />
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setGenderDropdownOpen(!genderDropdownOpen)}
          >
            <Text style={[styles.input, { paddingTop: 15, paddingBottom: 15 }]}>
              {selectedGender || ''}
            </Text>
            <Icon 
              name={genderDropdownOpen ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#9CA3AF" 
              style={styles.iconToggle} 
            />
          </TouchableOpacity>
        </View>

        {/* Gender Dropdown Options - Absolute positioned overlay */}
        {genderDropdownOpen && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={styles.dropdownOption}
              onPress={() => {
                setSelectedGender('Male');
                setGenderDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownOptionText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownOption}
              onPress={() => {
                setSelectedGender('Female');
                setGenderDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownOptionText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.dropdownOption, { borderBottomWidth: 0 }]}
              onPress={() => {
                setSelectedGender('Other');
                setGenderDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownOptionText}>Other</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Button Row */}
      <View style={styles.buttonRow}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleBack} style={styles.backButtonSide} activeOpacity={0.8}>
          <Text style={styles.backButtonSideText}>Back</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity activeOpacity={0.8} style={styles.signupButtonSide}>
          <LinearGradient
            colors={['#6FAF2D', '#8BC34A', '#4CAF50']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#0D1B2A', '#1B263B', '#415A77']}
      style={styles.container}
    >
      {/* Animated background circles */}
      <Animated.View
        style={[
          styles.circle1,
          {
            opacity: glow1,
            transform: [{ scale: scale1 }],
          },
        ]}
      />
      
      <Animated.View
        style={[
          styles.circle2,
          {
            opacity: glow2,
            transform: [{ scale: scale2 }],
          },
        ]}
      />

      {/* Animated Card Container */}
      <Animated.View
        style={[
          { width: '100%' },
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {currentStep === 1 ? renderStep1() : renderStep2()}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  circle1: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#8BC34A',
  },
  circle2: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#4CAF50',
  },
  card: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.7)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleIcon: {
    width: 32,
    height: 32,
    tintColor: '#8BC34A',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  label: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f192eff',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#8BC34A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  inputContainerFocused: {
    borderColor: '#8BC34A',
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 5,
  },
  inputIcon: {
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  iconToggle: {
    padding: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#9CA3AF',
  },
  loginText: {
    color: '#8BC34A',
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#8BC34A',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 12,
  },
  backButtonSide: {
    flex: 0.35,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#6B7280',
    borderWidth: 1,
    borderColor: '#9CA3AF',
  },
  backButtonSideText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButtonSide: {
    flex: 0.65,
  },
  dropdownButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#0f192eff',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownOption: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  dropdownOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SignupScreen;