import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View, Alert,KeyboardAvoidingView, Platform  } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import API_BASE_URL from '@/config';
import * as SecureStore from 'expo-secure-store';

const Register = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
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
    if (!gymId || !referralCode) {
      Alert.alert("Error", "Please enter both Gym ID and Referral Code");
      return;
    }
    console.log('Gym ID:', gymId);
    console.log('Referral Code:', referralCode);
  };

  const handleResendOtp = () => {
    setIsOtpSent(false);
    handleGetOtp();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-900 dark:bg-black">
        <LinearGradient
          colors={['#171A26', '#0F1014', '#0A0D18', '#141823', '#1A1A1D']}
          className="absolute inset-0"
        />
        <ImageBackground
          source={require('@/assets/images/auth.png')}
          resizeMode="cover"
          className="flex-1 justify-center items-center h-2/3"
        >
          <View className="flex-1"></View>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-4/5 py-8 justify-center items-center flex-1">
            {!isOtpSent ? (
              <>
                <TextInput
                  className="w-full h-12 bg-white/20 border border-white rounded-full mb-5 px-4 text-white text-lg"
                  placeholder="Name"
                  placeholderTextColor="white"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  className="w-full h-12 bg-white/20 border border-white rounded-full mb-5 px-4 text-white text-lg"
                  placeholder="Mobile Number"
                  placeholderTextColor="white"
                  keyboardType="phone-pad"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
                <TextInput
                  className="w-full h-12 bg-white/20 border border-white rounded-full mb-5 px-4 text-white text-lg"
                  placeholder="Email Address"
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <TouchableOpacity
                  className="w-1/2 h-12 bg-yellow-500 justify-center items-center rounded-full"
                  onPress={handleGetOtp}
                >
                  <Text className="text-black text-lg font-bold">Get OTP</Text>
                </TouchableOpacity>
              </>
            ) : !isOtpSubmitted ? (
              <View className="w-4/5 py-8 justify-center items-center flex-1">
                <View className="w-full flex-row justify-between mb-5">
                  <Text className="text-white text-lg">Mobile Number:</Text>
                  <Text className="text-white text-lg">{mobileNumber}</Text>
                </View>
                <TouchableOpacity
                  className="bg-transparent mb-5 self-end"
                  onPress={() => setIsOtpSent(false)}
                >
                  <Text className="text-white text-lg font-bold">Edit</Text>
                </TouchableOpacity>

                <View className="w-full flex-row justify-between mb-5">
                  {[...Array(6)].map((_, idx) => (
                    <TextInput
                      key={idx}
                      className="w-12 h-12 bg-white/20 border border-white rounded-lg text-white text-2xl text-center mx-1"
                      keyboardType="numeric"
                      maxLength={1}
                      value={otp[idx] || ''}
                      onChangeText={(text) => setOtp((prev) => prev.slice(0, idx) + text + prev.slice(idx + 1))}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  className="bg-transparent mb-5 self-end"
                  onPress={handleResendOtp}
                >
                  <Text className="text-white text-lg font-bold">Resend OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-1/2 h-12 bg-yellow-500 justify-center items-center rounded-full"
                  onPress={handleSubmitOtp}
                >
                  <Text className="text-black text-lg font-bold">Submit OTP</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="w-4/5 py-8 justify-center items-center flex-1">
                <TextInput
                  className="w-full h-12 bg-white/20 border border-white rounded-full mb-5 px-4 text-white text-lg"
                  placeholder="Registered Gym ID"
                  placeholderTextColor="white"
                  value={gymId}
                  onChangeText={setGymId}
                />
                <TextInput
                  className="w-full h-12 bg-white/20 border border-white rounded-full mb-5 px-4 text-white text-lg"
                  placeholder="Referral Code"
                  placeholderTextColor="white"
                  value={referralCode}
                  onChangeText={setReferralCode}
                />
                <TouchableOpacity
                  className="w-1/2 h-12 bg-yellow-500 justify-center items-center rounded-full"
                  onPress={handleContinue}
                >
                  <Text className="text-black text-lg font-bold">Continue</Text>
                </TouchableOpacity>
              </View>
            )}
          </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Register;
