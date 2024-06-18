// Reminder.js

import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Notifications } from "expo-notifications";
// import { NOTIFICATIONS as Notifications } from "expo-permissions";
// import * as Notifications from "expo-notifications";
// import DietItems from "./DietPlan/DietItems";
import DietItems from "./DietPlan/DietItem";
import { ActivityIndicator } from "react-native-paper";
import { server } from "../API/Server";

export default function Reminder({ route }) {
  const email = route.params.email;
  console.log(email);

  const [plans, setPlans] = useState(null);

  useEffect(() => {
    async function getDietPlans() {
      try {
        const res = await axios.get(`${server}/user/getPlans/?email=${email}`);
        console.log(res.data.dietPlans);
        setPlans(res.data.dietPlans);
      } catch (err) {
        console.log("Fetching diet plans error: ", err);
      }
    }
    getDietPlans();
  }, [email]);

  return (
    <View style={styles.container}>
      {plans ? (
        <FlatList
          data={plans}
          renderItem={({ item }) => <DietItems item={item} />}
        />
      ) : (
        <ActivityIndicator animating={true} />
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
