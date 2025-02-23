import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Register = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // Boolean to track OTP state
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false); // Boolean to track OTP submission state
  const [gymId, setGymId] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleGetOtp = () => {
    // Assuming OTP is sent after this function is triggered
    setIsOtpSent(true);
  };

  const handleSubmitOtp = () => {
    // When OTP is submitted, show gym ID and referral code form
    setIsOtpSubmitted(true);
  };

  const handleContinue = () => {
    // Handle continue button logic after gym ID and referral code
    console.log('Gym ID:', gymId);
    console.log('Referral Code:', referralCode);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#171A26', '#0F1014', '#0A0D18', '#141823', '#1A1A1D' ]}
        style={styles.background}
      />
        <ImageBackground source={require('@/assets/images/auth.png')} resizeMode="cover" style={styles.image}>
          <View style={styles.upperSpace} />

          <View style={styles.formContainer}>
            {!isOtpSent ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="white"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="white"
                  keyboardType="phone-pad"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
                  <Text style={styles.buttonText}>Get OTP</Text>
                </TouchableOpacity>
              </>
            ) : !isOtpSubmitted ? (
              <View style={styles.otpContainer}>
                <View style={styles.mobileNumberContainer}>
                  <Text style={styles.label}>Mobile Number:</Text>
                  <Text style={styles.mobileNumber}>{mobileNumber}</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

                {/* OTP Input Section */}
                <View style={styles.otpInputContainer}>
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                  />
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
              // Render Gym ID and Referral Code form
              <View style={styles.gymReferralFormContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Registered Gym ID"
                  placeholderTextColor="white"
                  value={gymId}
                  onChangeText={setGymId}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Referral Code"
                  placeholderTextColor="white"
                  value={referralCode}
                  onChangeText={setReferralCode}
                />
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Register;

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
