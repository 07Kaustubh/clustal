import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, ScrollView, View, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GettingStarted = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const router = useRouter();

  const toggleSection = (section: any) => {
    setExpandedSection(prevState => prevState === section ? null : section);
  };

  const openLink = () => {
    Linking.openURL('https://www.strongerbyscience.com/goal-setting/');
  };

  const navigateToDiet = () => {
    router.push('/(add-info)/diet');
  };

  const navigateToActivity = () => {
    router.push('/(add-info)/activity');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={require('../assets/images/auth.png')} resizeMode="cover" style={styles.image}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.heading}>Before You Begin</Text>
            <Text style={styles.text}>
              Bettering your physical fitness can feel daunting, especially if it's a completely new experience. It's important to lay some groundwork so your mindset is in the right place as you pursue your fitness goals.
            </Text>

            <TouchableHighlight onPress={() => toggleSection('startSmall')} style={styles.toggleButton}>
              <View style={styles.toggleContent}>
                <Text style={styles.subheading}>It’s OK to Start Small</Text>
                <Ionicons name={expandedSection === 'startSmall' ? 'chevron-up' : 'chevron-down'} size={18} color="white" />
              </View>
            </TouchableHighlight>

            {expandedSection === 'startSmall' && (
              <Text style={styles.text}>
                Consistency over time is key. People often try to do too much at once and get overwhelmed. The key is to start small and build up gradually.
              </Text>
            )}

            <TouchableHighlight onPress={() => toggleSection('changeTime')} style={styles.toggleButton}>
              <View style={styles.toggleContent}>
                <Text style={styles.subheading}>Change Takes Time, You Must Be Patient</Text>
                <Ionicons name={expandedSection === 'changeTime' ? 'chevron-up' : 'chevron-down'} size={18} color="white" />
              </View>
            </TouchableHighlight>

            {expandedSection === 'changeTime' && (
              <Text style={styles.text}>
                Beginners often expect quick results and get discouraged when they don't see them. Be patient, and remember how long it took to get out of shape.
              </Text>
            )}

            <TouchableHighlight onPress={() => toggleSection('simpleComponents')} style={styles.toggleButton}>
              <View style={styles.toggleContent}>
                <Text style={styles.subheading}>Fitness Goals Are Made of Simple Components</Text>
                <Ionicons name={expandedSection === 'simpleComponents' ? 'chevron-up' : 'chevron-down'} size={18} color="white" />
              </View>
            </TouchableHighlight>

            {expandedSection === 'simpleComponents' && (
              <Text style={styles.text}>
                Most fitness goals can be broken down into a few simple concepts:
                <Text style={styles.bulletPoint}>• Losing some amount of fat</Text>
                <Text style={styles.bulletPoint}>• Gaining some amount of muscle</Text>
                <Text style={styles.bulletPoint}>• Doing strength/resistance training</Text>
                <Text style={styles.bulletPoint}>• Doing cardio/conditioning work</Text>
                <Text style={styles.bulletPoint}>• Improving specific movement patterns</Text>
              </Text>
            )}

            <TouchableHighlight onPress={() => toggleSection('majoringMinors')} style={styles.toggleButton}>
              <View style={styles.toggleContent}>
                <Text style={styles.subheading}>Avoid Majoring in the Minors</Text>
                <Ionicons name={expandedSection === 'majoringMinors' ? 'chevron-up' : 'chevron-down'} size={18} color="white" />
              </View>
            </TouchableHighlight>

            {expandedSection === 'majoringMinors' && (
              <Text style={styles.text}>
                Focus on these key factors to achieve your fitness goals:
                <Text style={styles.bulletPoint}>• Appropriate training intensity</Text>
                <Text style={styles.bulletPoint}>• Progression in training</Text>
                <Text style={styles.bulletPoint}>• Proper calories and protein intake</Text>
                <Text style={styles.bulletPoint}>• Enough rest and recovery</Text>
                <Text style={styles.bulletPoint}>• Consistency</Text>
              </Text>
            )}

            <TouchableHighlight onPress={() => toggleSection('goalSetting')} style={styles.toggleButton}>
              <View style={styles.toggleContent}>
                <Text style={styles.subheading}>Goal Setting and Habit Formation</Text>
                <Ionicons name={expandedSection === 'goalSetting' ? 'chevron-up' : 'chevron-down'} size={18} color="white" />
              </View>
            </TouchableHighlight>

            {expandedSection === 'goalSetting' && (
              <Text style={styles.text}>
                Reading about goal setting will help you succeed. We recommend:
                <Text style={styles.link} onPress={openLink}> Stronger By Science – An Evidence-Based Approach To Goal Setting</Text>
              </Text>
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={navigateToDiet}>
              <Text style={styles.buttonText}>Improving Your Diet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={navigateToActivity}>
              <Text style={styles.buttonText}>Adding Physical Activity</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Dark gray background for the page
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#4e4e4e', // Slightly lighter gray to contrast with dark text
  },
  scrollView: {
    marginBottom: 60,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white', // Light text on dark background
    marginBottom: 20,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white', // Lighter text for subheadings
    marginVertical: 12,
  },
  text: {
    fontSize: 16,
    color: 'white', // Light text to contrast the dark background
    lineHeight: 22,
    marginBottom: 14,
  },
  bulletPoint: {
    fontSize: 16,
    color: 'white', // Matching color for bullet points
    lineHeight: 22,
    marginLeft: 20,
    marginBottom: 6,
  },
  link: {
    color: '#4db8ff', // A light blue color for links to stand out
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#006bb3', // Muted blue button to contrast with dark background
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  toggleButton: {
    marginVertical: 10,
    paddingVertical: 14,
    backgroundColor: '#666', // Medium gray for toggle buttons
    borderRadius: 8,
  },
  toggleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 25,
  },
});

export default GettingStarted;
