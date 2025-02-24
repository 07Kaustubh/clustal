import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SubscriptionScreen = () => {
  const [screen, setScreen] = useState('subscriptionDetails');
  const [selectedPlan, setSelectedPlan] = useState('3Month');
  const [pauseStartDate, setPauseStartDate] = useState('');
  const [pauseEndDate, setPauseEndDate] = useState('');

  const plans = [
    { title: '3 Months', price: '₹2,499', subtext: '₹833/mo' },
    { title: '6 Months', price: '₹4,799', subtext: '₹800/mo' },
    { title: '1 Year', price: '₹9,690', subtext: '₹807/mo' },
  ];

  return (
    <View style={styles.container}>
      {screen === 'subscriptionDetails' && (
        <View style={styles.content}>
          <Text style={styles.header}>Subscription</Text>

          {/* Plan Details */}
          <View style={styles.planContainer}>
            <View style={styles.row}>
              <Text style={styles.planText}>3 Month Plan</Text>
              <Text style={styles.daysLeft}>23 Days Left</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.dateText}>Started: 3 Aug 2023</Text>
              <Text style={styles.dateText}>Ending: 3 Nov 2023</Text>
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.optionButton} onPress={() => setScreen('renewSubscription')}>
            <FontAwesome name="refresh" size={24} color="black" style={styles.icon} />
            <Text style={styles.optionText}>Renew Subscription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => setScreen('pauseSubscription')}>
            <FontAwesome name="pause-circle" size={24} color="black" style={styles.icon} />
            <Text style={styles.optionText}>Pause Membership</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'renewSubscription' && (
        <View style={styles.content}>
          <Text style={styles.header}>Renew Subscription</Text>

          {/* Renew Same Plan */}
          <Text style={styles.subHeader}>Renew Same Plan</Text>
          <TouchableOpacity
            style={[
              styles.planOption,
              selectedPlan === '3 Months' && styles.selectedPlan,
            ]}
            onPress={() => setSelectedPlan('3 Months')}
          >
            <Text style={styles.planTitle}>3 Months</Text>
            <Text style={styles.planPrice}>₹2,499</Text>
            <Text style={styles.planSubText}>₹833/mo</Text>
          </TouchableOpacity>

          {/* Choose Another Plan */}
          <Text style={styles.subHeader}>Choose Another Plan</Text>
          {plans.map((plan) =>
            plan.title !== '3 Months' ? (
              <TouchableOpacity
                key={plan.title}
                style={[
                  styles.planOption,
                  selectedPlan === plan.title && styles.selectedPlan,
                ]}
                onPress={() => setSelectedPlan(plan.title)}
              >
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planSubText}>{plan.subtext}</Text>
              </TouchableOpacity>
            ) : null
          )}

          {/* Continue Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('confirmation')}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

    {screen === 'confirmation' && (
        <View style={styles.confirmationContainer}>
          <FontAwesome name="check-circle" size={60} color="green" style={styles.confirmationIcon} />
          <Text style={styles.header}>Your <Text style={{ fontWeight: 'bold', color: 'gold' }}>Subscription</Text> has been Renewed</Text>

          <View style={styles.planOption}>
            <Text style={styles.planTitle}>{selectedPlan}</Text>
            <Text style={styles.planPrice}>₹{plans.find(plan => plan.title === selectedPlan)?.price}</Text>
          </View>

          <Text style={styles.infoText}>Payment Method: Zero Cost EMI</Text>
          <Text style={styles.infoText}>Date: 4 August 2024</Text>

          <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('subscriptionDetails')}>
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}

{screen === 'pauseSubscription' && (
        <View style={styles.pauseContainer}>
          <Text style={styles.header}>Pause Subscription</Text>
          <Text style={styles.infoText}>Pause Days Available: <Text style={{ color: 'gold', fontWeight: 'bold' }}>12</Text></Text>
          
          <TextInput
            style={styles.input}
            placeholder="Pause Start Date"
            placeholderTextColor="#ccc"
            value={pauseStartDate}
            onChangeText={setPauseStartDate}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Pause End Date"
            placeholderTextColor="#ccc"
            value={pauseEndDate}
            onChangeText={setPauseEndDate}
          />

          <Text style={styles.infoText}>Days Left: <Text style={{ color: 'gold', fontWeight: 'bold' }}>10</Text></Text>
          
          <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('subscriptionDetails')}>
            <Text style={styles.primaryButtonText}>Pause</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#171A26',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    content: {
      alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
      },
    subHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'gold',
      marginTop: 20,
      alignSelf: 'flex-start',
    },
    planContainer: {
      width: '100%',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 16,
    },
    planText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
    },
    daysLeft: {
      color: 'gold',
      fontWeight: 'bold',
      fontSize: 20,
    },
    dateText: {
      color: '#ccc',
      fontSize: 14,
    },
    optionButton: {
      flexDirection: 'row',
      backgroundColor: '#2C2C2C',
      paddingVertical: 20,
      paddingHorizontal: 15,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      marginTop: 20,
    },
    optionText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
    },
    icon: {
      marginRight: 10,
      color: '#FFB303',
    },
    planOption: {
      width: '100%',
      backgroundColor: '#222',
      padding: 20,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: 'transparent',
      alignItems: 'center',
      marginBottom: 10,
    },
    selectedPlan: {
      borderColor: 'gold',
    },
    planTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'gold',
    },
    planPrice: {
      fontSize: 16,
      color: '#fff',
      marginTop: 5,
    },
    planSubText: {
      fontSize: 14,
      color: '#ccc',
      marginTop: 5,
    },
    primaryButton: {
      backgroundColor: 'gold',
      padding: 15,
      width: '100%',
      alignItems: 'center',
      borderRadius: 12,
      marginTop: 20,
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    infoText: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 10,
        textAlign: 'center',
      },
    confirmationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      confirmationIcon: {
        marginBottom: 20,
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
        textAlign: 'center',
      },
      pauseContainer: {
        position: 'absolute',
        top: '35%',
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 20,
      },
  });
