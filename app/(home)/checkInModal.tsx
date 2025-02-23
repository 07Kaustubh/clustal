import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

interface CheckInModalProps {
  closeModal: () => void;
}

export default function CheckInModal({ closeModal }: CheckInModalProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Handle QR scan with correct property name 'onBarcodeScanned'
  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    alert(`QR code scanned! Type: ${type}, Data: ${data}`);
  };

  // Toggle camera facing direction
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing} // Adjusted for CameraType
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} // Corrected to 'onBarcodeScanned'
      >
        {/* Flip Camera Button */}
        <View style={styles.flipButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.instructions}>Place the camera in front of the QR code</Text>
          {scanned && (
            <TouchableOpacity onPress={() => setScanned(false)} style={styles.reScanButton}>
              <Text style={styles.reScanText}>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>

      <View style={styles.facingIssuesContainer}>
        <TouchableOpacity onPress={() => alert('Facing issues?')}>
          <Text style={styles.facingIssuesText}>Facing issues? Tap here</Text>
        </TouchableOpacity>
      </View>

      {/* Close Button */}
      <TouchableOpacity onPress={() => { closeModal() }} style={styles.closeButton}>
        <FontAwesome name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Ensures a consistent background color
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 100, // Moved this up to create space between the instructions and flip button
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 16,
    color: 'white',
  },
  instructions: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500', // Slightly bolder for better readability
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 30, // Added padding for text readability
  },
  reScanButton: {
    backgroundColor: '#FFB303',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  reScanText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600', // Slightly bolder for emphasis
  },
  facingIssuesContainer: {
    position: 'absolute',
    bottom: 30, // Slightly higher to make it more accessible
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  facingIssuesText: {
    color: '#FFB303',
    fontSize: 16,
    fontWeight: '600', // Making the text bolder for prominence
    textDecorationLine: 'underline', // Underlined for additional emphasis
  },
  closeButton: {
    position: 'absolute',
    top: 40, // A little further from the top for more breathing space
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background for the close button
    borderRadius: 25,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonContainer: {
    position: 'absolute',
    top: 40, // Moves the flip button further down to avoid overlapping the instructions
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly transparent black background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
