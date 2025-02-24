import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/profile-picture.png')} // Replace with actual image
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>John Doe</Text>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <Link key={index} href={`./user-profile/${item.title.toLowerCase()}`} asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <Link href="./logout" asChild>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ProfileScreen;

const menuItems = [
  { title: 'Subscription', subtitle: 'Check Plan and Renew' },
  { title: 'Account', subtitle: 'Change Account Details' },
  { title: 'Orders', subtitle: 'Order History' },
  { title: 'Referrals', subtitle: 'Refer a Friend, Referral History' },
  { title: 'Help', subtitle: 'Contact Support, FAQ' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171A26',
    alignItems: 'center',
    padding: 30,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 50,
  },
  profileName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  menu: {
    width: '100%',
    marginTop: 30,
  },
  menuItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuTitle: {
    color: '#f1c40f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuSubtitle: {
    color: '#bbb',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
  },
  logoutText: {
    color: '#f1c40f',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
