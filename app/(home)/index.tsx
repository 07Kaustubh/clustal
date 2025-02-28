import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; // For icons
import { useRouter } from 'expo-router';
import CheckInModal from './checkInModal';

export default function App() {
  const router = useRouter();
  const [isCheckInModalVisible, setIsCheckInModalVisible] = useState(false);

  const handleCheckinPress = () => {
    setIsCheckInModalVisible(true); // Show modal when check-in button is pressed
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setIsCheckInModalVisible(false); // Close the modal
  };

  const [activePage, setActivePage] = useState(0); // To track the active page
  const pagerRef = useRef<PagerView>(null); // Create ref for PagerView

  const handlePageChange = (e: { nativeEvent: { position: number } }) => {
    setActivePage(e.nativeEvent.position); // Update active page when swiped
  };

  const handleButtonPress = (page: number) => {
    setActivePage(page); // Update activePage state
    pagerRef.current?.setPage(page); // Programmatically change the page if pagerRef.current is not null
  };

  // Navigate to user profile when profile picture is pressed
  const handleProfilePress = () => {
    router.push('./user-profile'); // Adjust this path based on your app's routing setup
  };

  const handleHistoryPress = () => {
    router.push('./user-profile/accountHistory'); // Adjust this path based on your app's routing setup
  };

  return (
    <View className="flex-1 items-center justify-start bg-gray-900 dark:bg-gray-950">
      <LinearGradient
        colors={['#171A26', '#0A0D18', '#1A1A1D']}
        className="absolute inset-0"
      />

      {/* Profile Picture in the top right */}
      <TouchableOpacity onPress={handleProfilePress} className="absolute top-5 right-5 z-10">
        <Image
          source={require('@/assets/images/profile-picture.png')} // Add your profile picture path here
          className="w-14 h-14 rounded-full"
        />
      </TouchableOpacity>

      {/* Image Carousel in the upper half */}
      <View className="h-2/3 w-full">
        <PagerView
          style={styles.carousel}
          initialPage={0}
          onPageSelected={handlePageChange} // Track page changes
          ref={pagerRef} // Attach ref to the PagerView
        >
          {/* First Page with Overlay */}
          <View className="justify-center items-center" key="1">
            <Image
              source={require('@/assets/images/carousel1.png')}
              className="w-full h-full object-cover"
            />
            <View className="absolute bottom-10 left-0 right-0 items-center justify-center p-3 rounded-lg">
              <Image
                source={require('@/assets/images/carousel-icon.png')} // Replace with your PNG
                className="w-24 h-24 object-contain"
              />
              <Text className="text-white text-md mt-2">Extra ₹500 Off on All Plans</Text>
            </View>
          </View>

          {/* Second Page */}
          <View className="justify-center items-center" key="2">
            <Image
              source={require('@/assets/images/carousel2.png')}
              className="w-full h-full object-cover"
            />
            <View className="absolute bottom-10 left-0 right-0 items-center justify-center p-3 rounded-lg">
              <Image
                source={require('@/assets/images/carousel-icon2.png')} // Replace with your PNG
                style={styles.discountIcon}
              />
              <Text className="text-white text-sm mt-2">Availible on All Plans</Text>
            </View>
          </View>
        </PagerView>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-center gap-2 ">
        <TouchableOpacity
          className={`w-6 h-2.5 rounded-full border-2 border-yellow-500 ${activePage === 0 ? 'bg-yellow-500' : 'bg-transparent'}`}
          onPress={() => handleButtonPress(0)} // Navigate to page 0
        />
        <TouchableOpacity
          className={`w-6 h-2.5 rounded-full border-2 border-yellow-500 ${activePage === 1 ? 'bg-yellow-500' : 'bg-transparent'}`}
          onPress={() => handleButtonPress(1)} // Navigate to page 1
        />
      </View>

      {/* Content below the carousel */}
      <View className="flex-1 w-full justify-between p-4">
        {/* Row 1: Hi username! */}
        <View className="flex-1 justify-center items-start">
          <Text className="text-white text-2xl font-bold ml-3">Hi, username!</Text>
        </View>

        {/* Row 2: Buttons */}
        <View className="flex-1 justify-center items-center w-full">
          <View className="flex-row justify-center w-full space-x-4">
            <TouchableOpacity className="items-center justify-center p-5 border border-gray-300 bg-gray-800 rounded-lg mx-1">
              <MaterialCommunityIcons name="autorenew" size={48} color="#FFB303" />
              <Text className="text-white text-sm mt-2 font-bold">Renew Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center p-5 border border-gray-300 bg-gray-800 rounded-lg mx-1">
              <FontAwesome name="history" size={48} color="#FFB303" onPress={handleHistoryPress} />
              <Text className="text-white text-sm mt-2 font-bold">Activity History</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center p-5 border border-gray-300 bg-gray-800 rounded-lg mx-1">
              <FontAwesome name="shopping-cart" size={48} color="#FFB303" />
              <Text className="text-white text-sm mt-2 font-bold">Fitness Shop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Row 3: Check-In Button */}
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity className="flex-row items-center bg-yellow-500 py-3 px-5 rounded-full" onPress={handleCheckinPress}>
            <FontAwesome name="qrcode" size={24} color="#000" />
            <Text className="text-black text-xl ml-2 font-bold">Check-In</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCheckInModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-end items-center bg-gray-500">
          <View className="w-full h-1/2 bg-gray-800 rounded-t-lg p-5">
            <CheckInModal closeModal={handleCloseModal} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
  },
  discountIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
