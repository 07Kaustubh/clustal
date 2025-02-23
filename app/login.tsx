import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // OTP as an array of 6 digits
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [gymId, setGymId] = useState('');

  const handleGetOtp = () => {
    setIsOtpSent(true); // OTP is sent after clicking Get OTP
  };

  const handleSubmitOtp = () => {
    setIsOtpSubmitted(true); // When OTP is submitted, proceed to gym ID screen
  };

  const handleContinue = () => {
    console.log('Gym ID:', gymId);
    // Logic to proceed after gym ID submission
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <LinearGradient
                // Background Linear Gradient
                colors={['#171A26', '#0F1014', '#0A0D18', '#141823', '#1A1A1D' ]}
                style={styles.background}
              />
        <ImageBackground source={require('../assets/images/auth.png')} resizeMode="cover" style={styles.image}>
          <View style={styles.upperSpace} />

          <View style={styles.formContainer}>
            {!isOtpSent ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number or Email Address"
                  placeholderTextColor="white"
                  keyboardType="default"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
                <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
                  <Text style={styles.buttonText}>Get OTP</Text>
                </TouchableOpacity>
              </>
            ) : !isOtpSubmitted ? (
              <View style={styles.otpContainer}>
                <View style={styles.mobileNumberContainer}>
                  <Text style={styles.label}>Mobile Number/Email:</Text>
                  <Text style={styles.mobileNumber}>{mobileNumber}</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

                {/* OTP Input Section */}
                <View style={styles.otpInputContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpInput}
                      keyboardType="numeric"
                      maxLength={1}
                      value={digit}
                      onChangeText={(value) => {
                        const newOtp = [...otp];
                        newOtp[index] = value;
                        setOtp(newOtp);
                      }}
                    />
                  ))}
                </View>

                {/* Resend OTP Button */}
                <TouchableOpacity style={styles.resendButton}>
                  <Text style={styles.resendButtonText}>Resend OTP</Text>
                </TouchableOpacity>

                {/* Submit OTP Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitOtp}>
                  <Text style={styles.submitButtonText}>Submit OTP</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Render Gym ID form
              <View style={styles.gymReferralFormContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Registered Gym ID"
                  placeholderTextColor="white"
                  value={gymId}
                  onChangeText={setGymId}
                />
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                  <Link href='./(home)' style={styles.buttonText}>Continue</Link>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '66%',
  },
  upperSpace: {
    flex: 1,
  },
  formContainer: {
    width: '80%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 15,
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '50%',
    height: 45,
    backgroundColor: '#FFB303',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpContainer: {
    width: '80%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  mobileNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  mobileNumber: {
    color: 'white',
    fontSize: 16,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginHorizontal: 1,
  },
  resendButton: {
    backgroundColor: 'transparent',
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  resendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    width: '50%',
    height: 45,
    backgroundColor: '#FFB303',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'transparent',
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gymReferralFormContainer: {
    width: '80%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
});
