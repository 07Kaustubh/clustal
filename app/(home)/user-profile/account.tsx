import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Account = () => {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={require('@/assets/images/profile-picture.png')} // Replace with actual image URL
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.header}>Account</Text>

      {/* Full Name Input */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="Vabhav" placeholderTextColor="#fff" />

      {/* Phone Number Input */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} placeholder="+91 9343234952" placeholderTextColor="#fff" keyboardType="phone-pad" />

      {/* Email Input */}
      <Text style={styles.label}>E-mail Address</Text>
      <TextInput style={styles.input} placeholder="vabshr@gmail.com" placeholderTextColor="#fff" keyboardType="email-address" />

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171A26', // Dark background
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  input: {
        width: '100%',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        color: 'white',
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        
      },
  button: {
    backgroundColor: 'gold',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
