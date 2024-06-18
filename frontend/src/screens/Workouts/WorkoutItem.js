import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function WorkoutItem({ workout }) {
  const navigation = useNavigation();
  const handleClick = (workout) => {
    navigation.navigate("Workout Detail", { title: workout.WorkOut, workout });
  };

  return (
    <Card
      mode="elevated"
      style={styles.card}
      onPress={() => {
        handleClick(workout);
      }}
    >
      <Card.Content>
        <Text variant="titleMedium" style={styles.name}>
          {workout.WorkOut}
        </Text>
        <View style={styles.body}>
          <Text variant="labelSmall">Muscle: {workout.Muscles}</Text>
          <Text variant="labelSmall">
            Experience Level: {workout.Intensity_Level}
          </Text>
          {workout.Equipment !== null && (
            <Text variant="labelSmall">Equipment: {workout.Equipment}</Text>
          )}
        </View>
        <Text variant="bodyMedium" style={styles.type}>
          {workout.Explaination}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    // backgroundColor: "#ed045b",
    elevation: 5,
  },
  name: {
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ed045b",
  },
  type: {
    textAlign: "auto",
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#ed045b",
  },
  body: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
