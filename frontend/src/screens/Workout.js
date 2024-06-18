import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import WorkoutAPI from "../API/WorkoutAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutList from "./Workouts/WorkoutList";

export default function Workout({ route }) {
  const { params } = route.params;
  const [workout, setWorkout] = useState({});
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      const res = await WorkoutAPI(params);
      setWorkout(res);
      setRefreshing(false);
      console.log("Fetched workout data");
    }
    fetchWorkouts();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {refreshing ? (
        <View style={styles.splash}>
          <ActivityIndicator size="large" color="tomato" />
          <Text>Fetching your workouts!</Text>
        </View>
      ) : (
        <WorkoutList work={workout} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  splash: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
