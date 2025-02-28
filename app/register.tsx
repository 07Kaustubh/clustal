import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import API_BASE_URL from '@/config';
import * as SecureStore from 'expo-secure-store';

const Register = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // Boolean to track OTP state
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false); // Boolean to track OTP submission state
  const [gymId, setGymId] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState('');

  const handleGetOtp = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobilenumber: mobileNumber }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setIsOtpSent(true);
        Alert.alert("Success", "OTP sent successfully!");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to send OTP");
    }
  };

  const handleSubmitOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert("Error", "Please enter a valid OTP");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/user/verifyuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobilenumber: mobileNumber, otp }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setIsOtpSubmitted(true);
        await SecureStore.setItemAsync("authToken", data.data.accessToken);
        Alert.alert("Success", "Registration successful!");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to verify OTP");
    }
  };

  const handleContinue = () => {
    // Handle continue button logic after gym ID and referral code
    if (!gymId || !referralCode) {
      Alert.alert("Error", "Please enter both Gym ID and Referral Code");
      return;
    }
    console.log('Gym ID:', gymId);
    console.log('Referral Code:', referralCode);
  };

  const handleResendOtp = () => {
    setIsOtpSent(false); // Reset OTP sent state if needed
    handleGetOtp(); // Re-send OTP
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
                    value={otp[0]}
                    onChangeText={(text) => setOtp((prev) => text + prev.slice(1))}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[1]}
                    onChangeText={(text) => setOtp(prev => prev.slice(0, 1) + text + prev.slice(2))}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[2]}
                    onChangeText={(text) => setOtp(prev => prev.slice(0, 2) + text + prev.slice(3))}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[3]}
                    onChangeText={(text) => setOtp(prev => prev.slice(0, 3) + text + prev.slice(4))}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[4]}
                    onChangeText={(text) => setOtp(prev => prev.slice(0, 4) + text + prev.slice(5))}
                  />
                  <TextInput
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[5]}
                    onChangeText={(text) => setOtp(prev => prev.slice(0, 5) + text)}
                  />
                </View>

                {/* Resend OTP Button */}
                <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
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
