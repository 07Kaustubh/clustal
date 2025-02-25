import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Calendar from 'expo-calendar';
import { CalendarList } from 'react-native-calendars';

const AccountHistory = () => {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        if (calendars.length > 0) {
          const events = await Calendar.getEventsAsync(
            [calendars[0].id],
            new Date(new Date().getFullYear(), 3, 1),
            new Date(new Date().getFullYear(), 5, 1)
          );
          const dates: Record<string, any> = {};
          events.forEach(event => {
            const date = new Date(event.startDate).toISOString().split('T')[0];
            dates[date] = { marked: true, dotColor: 'orange', selected: true, selectedColor: 'orange' };
          });
          setMarkedDates(dates);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity History</Text>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.profileImage} />
      </View>
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
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
