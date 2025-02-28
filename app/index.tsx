import { Link } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground 
        source={require('../assets/images/home.png')} 
        resizeMode="cover" 
        className="flex-1 justify-center items-center bg-black"
      >
        {/* Title */}
        <Text className="text-white text-4xl font-extrabold text-center shadow-md">
          XYZ Fitness
        </Text>

        {/* Buttons */}
        <View className="mt-6 w-3/4 space-y-4">
          {/* Sign Up Button */}
          <Link href="/register" className="bg-primary text-black py-3 rounded-full text-center text-lg font-bold">
            Sign Up
          </Link>

          {/* Sign In Button */}
          <Link href="/login" className="py-3 text-white text-center text-lg font-bold">
            Sign In
          </Link>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
