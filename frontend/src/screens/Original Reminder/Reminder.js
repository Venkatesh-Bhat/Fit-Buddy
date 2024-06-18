// Reminder.js

import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Notifications } from "expo-notifications";
// import { NOTIFICATIONS as Notifications } from "expo-permissions";
// import * as Notifications from "expo-notifications";
import DietItems from "./DietPlan/DietItems";

export default function Reminder({ route }) {
  const email = route.params.email;
  console.log(email);

  const [plans, setPlans] = useState(null);

  useEffect(() => {
    async function getDietPlans() {
      try {
        const res = await axios.get(
          `https://super-dassie-normally.ngrok-free.app/user/getPlans/?email=${email}`
        );
        console.log(res.data.dietPlans);
        setPlans(res.data.dietPlans);
      } catch (err) {
        console.log("Fetching diet plans error: ", err);
      }
    }
    getDietPlans();
  }, [email]);

  const setDefaultAlarm = async () => {
    try {
      await scheduleNotification("07:00", "Default Alarm", "Time to wake up!");
    } catch (err) {
      console.log("Error setting default alarm: ", err);
    }
  };

  const scheduleNotification = async (time, title, body) => {
    try {
      const now = new Date();
      const alarmTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(time.split(":")[0]),
        parseInt(time.split(":")[1]),
        0
      );
      const schedulingOptions = { time: alarmTime, repeat: "day" };

      const res = await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
        },
        trigger: schedulingOptions,
      });
      console.log("scheduleNotificationAsync: ", res);
    } catch (err) {
      console.log("Error in scheduleNotification:", err);
    }
  };

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        console.log("Status:", status);
        if (status !== "granted") {
          alert("Permission to send notifications required!");
        }
      } catch (err) {
        console.log("set alarm error: ", err);
      }
    }

    registerForPushNotificationsAsync();
    setDefaultAlarm(); // Set default alarm when component mounts
  }, []);

  return (
    <View style={styles.container}>
      {plans && (
        <FlatList
          data={plans}
          renderItem={({ item }) => (
            <DietItems item={item} setAlarm={scheduleNotification} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});
