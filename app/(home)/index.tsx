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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#171A26', '#0A0D18', '#1A1A1D']}
        style={styles.background}
      />

      {/* Image Carousel in the upper half */}
      <View style={styles.carouselContainer}>
        <PagerView
          style={styles.carousel}
          initialPage={0}
          onPageSelected={handlePageChange} // Track page changes
          ref={pagerRef} // Attach ref to the PagerView
        >
          {/* First Page with Overlay */}
          <View style={styles.page} key="1">
            <Image
              source={require('@/assets/images/carousel1.png')}
              style={styles.image}
            />
            <View style={styles.overlayContainer}>
              <Image
                source={require('@/assets/images/carousel-icon.png')} // Replace with your PNG
                style={styles.discountIcon}
              />
              <Text style={styles.overlayText}>Extra ₹500 Off on All Plans</Text>
            </View>
          </View>

          {/* Second Page */}
          <View style={styles.page} key="2">
            <Image
              source={require('@/assets/images/carousel2.png')}
              style={styles.image}
            />
            <View style={styles.overlayContainer}>
              <Image
                source={require('@/assets/images/carousel-icon2.png')} // Replace with your PNG
                style={styles.discountIcon}
              />
              <Text style={styles.overlayText}>Availible on All Plans</Text>
            </View>
          </View>
        </PagerView>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navButtonContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            activePage === 0 ? styles.navButtonActive : styles.navButtonInactive,
          ]}
          onPress={() => handleButtonPress(0)} // Navigate to page 0
        />
        <TouchableOpacity
          style={[
            styles.navButton,
            activePage === 1 ? styles.navButtonActive : styles.navButtonInactive,
          ]}
          onPress={() => handleButtonPress(1)} // Navigate to page 1
        />
      </View>

      {/* Content below the carousel */}
      <View style={styles.contentContainer}>
        {/* Row 1: Hi username! */}
        <View style={styles.row}>
          <Text style={styles.greetingText}>Hi, username!</Text>
        </View>

        {/* Row 2: Buttons */}
        <View style={styles.row}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonFirst]}>
              <MaterialCommunityIcons name="autorenew" size={48} color="#FFB303" />
              <Text style={styles.buttonText}>Renew Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonMiddle]}>
              <FontAwesome name="history" size={48} color="#FFB303" />
              <Text style={styles.buttonText}>Activity History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonLast]}>
              <FontAwesome name="shopping-cart" size={48} color="#FFB303" />
              <Text style={styles.buttonText}>Fitness Shop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Row 3: Check-In Button */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.checkInButton} onPress={handleCheckinPress}>
            <FontAwesome name="qrcode" size={24} color="#000" />
            <Text style={styles.checkInText}>Check-In</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCheckInModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <CheckInModal closeModal={handleCloseModal} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  carouselContainer: {
    height: '66%', // Set height for the upper part of the screen (1)
    width: '100%',
  },
  carousel: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: '10%', // Position the container below the middle of the image
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  discountIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  overlayText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 10,
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10, // Adds a gap between the navigation buttons
  },
  navButton: {
    width: 25, // Width of the button
    height: 10, // Height of the button
    borderRadius: 20, // Makes the button pill-shaped
    borderWidth: 1, // Border thickness
    borderColor: '#FFB303', // Border color (yellow)
  },
  navButtonActive: {
    backgroundColor: '#FFB303', // Active button background color
  },
  navButtonInactive: {
    backgroundColor: 'transparent', // Inactive button is transparent
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between', // Space out rows evenly
    padding: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1, // Border width for separation
    borderColor: '#D3D3D3', // Light grey border color
    backgroundColor: '#2C2C2C', // Grey background
    borderRadius: 5,
  },
  buttonFirst: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5, // Rounded left corners for the first button
  },
  buttonMiddle: {
    borderLeftWidth: 0, // Remove left border to connect with the first button
    borderRightWidth: 0, // Remove right border to connect with the last button
  },
  buttonLast: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5, // Rounded right corners for the last button
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB303',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  checkInText: {
    color: '#000',
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Ensures the modal is at the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a slight dark overlay
  },
  modalContainer: {
    width: '100%',
    height: '50%', // Set to whatever height you want for the drawer (adjust as needed)
    backgroundColor: '#2C2C2C', // Background color for the modal
    borderTopLeftRadius: 20, // Rounded corners for the top
    borderTopRightRadius: 20, // Rounded corners for the top
    padding: 20,
  },
});

