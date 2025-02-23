import { Link } from 'expo-router';
import React from 'react';
import {Button, ImageBackground, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={require('../assets/images/home.png')} resizeMode='cover' style={styles.image}>
          <Text style={styles.text}>XYZ Fitness</Text>
          <View style={styles.buttonContainer}>
            <Link href='/register'  style={styles.signUpButton}>
                  <Text style={styles.signUpText}>Sign Up</Text>
            </Link>
            <Link href='/login' style={styles.signInButton}>
                <Text style={styles.signInText}>Sign In</Text>
            </Link>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: '900', // Updated font weight
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Added shadow color
    textShadowOffset: { width: 0, height: 2 }, // Added shadow offset
    textShadowRadius: 3, // Added shadow blur radius
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  signUpButton: {
    backgroundColor: '#FFB303',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
    width: '50%',
  },
  signUpText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '900',
  },
  signInButton: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '50%',
  },
  signInText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '900',
  },
});