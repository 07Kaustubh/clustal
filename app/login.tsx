import React, { useState } from 'react';
import { ImageBackground, TextInput, TouchableOpacity, Text, View, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import API_BASE_URL from '@/config';
import useAuthStore from '@/store/authStore';

const Login = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [gymId, setGymId] = useState('');

  const handleGetOtp = async () => {
    if (!mobileNumber) {
      Alert.alert("Error", "Please enter a mobile number.");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/user/sendotp`, { mobilenumber: mobileNumber });
      if (response.data) {
        setIsOtpSent(true);
        Alert.alert("Success", "OTP sent successfully!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP.");
      console.error(error);
    }
  };

  const handleSubmitOtp = async () => {
    const otpValue = otp.join('');
    if (!otpValue || otpValue.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/user/verifyuser`, { mobilenumber: mobileNumber, otp: otpValue });
      if (response.data) {
        await useAuthStore.getState().login(response.data.data);
        setIsOtpSubmitted(true);
      }
    } catch (error) {
      Alert.alert("Error", "Invalid OTP.");
      console.error(error);
    }
  };

  const handleContinue = () => {
    console.log('Gym ID:', gymId);
    router.push('/(home)');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background dark:bg-darkBackground">
        <LinearGradient
          colors={['#171A26', '#0F1014', '#0A0D18', '#141823', '#1A1A1D']}
          className="absolute inset-0"
        />
        <ImageBackground source={require('../assets/images/auth.png')} resizeMode="cover" className="flex-1 justify-center items-center">
          <View className="flex-1" />
          <View className="w-4/5 py-7 justify-center items-center flex-1">
            {!isOtpSent ? (
              <>
                <TextInput
                  className="w-full h-12 bg-white/10 border border-white rounded-full mb-5 pl-4 text-white text-lg"
                  placeholder="Mobile Number or Email Address"
                  placeholderTextColor="white"
                  keyboardType="default"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
                <TouchableOpacity className="mt-4 w-full h-12 bg-[#FFB303] rounded-full flex justify-center items-center" onPress={handleGetOtp}>
                  <Text className="text-black text-lg font-bold">Get OTP</Text>
                </TouchableOpacity>
              </>
            ) : !isOtpSubmitted ? (
              <View className="w-4/5 py-7 justify-center items-center flex-1">
                <View className="flex-row justify-between w-full mb-3 gap-6">
                  <Text className="text-white text-lg">Mobile Number/Email:</Text>
                  <Text className="text-white text-lg">{mobileNumber}</Text>
                </View>
                <TouchableOpacity className="self-end mb-5">
                  <Text className="text-white text-lg font-bold">Edit</Text>
                </TouchableOpacity>

                <View className="flex-row justify-between w-full mb-5 mt-3">
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      className="w-10 h-10 bg-white/20 bg-opacity-20 border-white border rounded-xl text-center text-black text-md font-bold mx-1"
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

                <TouchableOpacity className="self-end mb-5">
                  <Text className="text-white text-lg font-bold">Resend OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity className="mt-4 w-full h-12 bg-[#FFB303] rounded-full flex justify-center items-center active:scale-95" onPress={handleSubmitOtp}>
                  <Text className="text-black text-lg font-bold">Submit OTP</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="w-4/5 py-7 justify-center items-center flex-1">
                <TextInput
                  className="w-full h-12 bg-white bg-opacity-20 border-white border-1 rounded-full mb-5 pl-4 text-white text-lg"
                  placeholder="Registered Gym ID"
                  placeholderTextColor="white"
                  value={gymId}
                  onChangeText={setGymId}
                />
                <TouchableOpacity className="mt-4 w-full h-12 bg-[#FFB303] rounded-full flex justify-center items-center" onPress={handleContinue}>
                  <Link href='./(home)' className="text-black text-lg font-bold">Continue</Link>
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
