import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';
import { CalendarList } from 'react-native-calendars';

const AccountHistory = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCalendarEvents = useCallback(async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable calendar access in settings.');
        setLoading(false);
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      if (calendars.length === 0) {
        setLoading(false);
        return;
      }

      const events = await Calendar.getEventsAsync(
        [calendars[0].id],
        new Date(new Date().getFullYear(), 3, 1),
        new Date(new Date().getFullYear(), 5, 1)
      );

      if (events.length === 0) {
        setLoading(false);
        return;
      }

      const dates: Record<string, any> = {};
      events.forEach(event => {
        const date = new Date(event.startDate).toISOString().split('T')[0];
        dates[date] = { marked: true, dotColor: 'orange', selected: true, selectedColor: 'orange' };
      });

      setMarkedDates(dates);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalendarEvents();
  }, [fetchCalendarEvents]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity History</Text>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.profileImage} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="orange" style={styles.loader} />
      ) : (
        <CalendarList
          pastScrollRange={2}
          futureScrollRange={0}
          horizontal={true}
          pagingEnabled={true}
          markedDates={markedDates}
          theme={{
            backgroundColor: '#000',
            calendarBackground: '#000',
            textSectionTitleColor: '#fff',
            monthTextColor: '#fff',
            dayTextColor: '#fff',
            todayTextColor: 'yellow',
            arrowColor: 'white',
          }}
        />
      )}
    </View>
  );
};

export default AccountHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  loader: {
    marginTop: 20,
  },
});
