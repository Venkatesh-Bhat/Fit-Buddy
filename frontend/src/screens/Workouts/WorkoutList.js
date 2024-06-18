import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import WorkoutItem from "./WorkoutItem";

export default function WorkoutList({ work }) {
  return (
    <FlatList
      data={work}
      renderItem={({ item }) => <WorkoutItem workout={item} />}
      ListEmptyComponent={<Text style={styles.empty}>No workouts found!!</Text>}
      ItemSeparatorComponent={<View style={{ height: 16 }} />}
      ListFooterComponent={<View style={{ height: 16 }} />}
      ListHeaderComponent={<View style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    // fontSize: 25,
    marginTop: "40%",
  },
});
