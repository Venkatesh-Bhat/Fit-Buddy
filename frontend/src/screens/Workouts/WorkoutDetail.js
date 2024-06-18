import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Linking,
} from "react-native";
import { Button, Card, Text, List, Chip } from "react-native-paper";
import React from "react";

export default function WorkoutDetail({ route }) {
  const workout = route.params.workout;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card mode="outlined" style={styles.container}>
        <ScrollView>
          <Card.Content>
            <View style={styles.info}>
              <Text variant="titleMedium">Targeted Muscle:</Text>
              <View style={{ alignItems: "flex-start" }}>
                <Chip mode="flat" selected={true} style={styles.chip}>
                  {workout.Muscles}
                </Chip>
              </View>
            </View>
            <View style={styles.info}>
              <Text variant="titleMedium">Equipments Required:</Text>
              {workout.Equipment !== null ? (
                <View style={{ alignItems: "flex-start" }}>
                  <Chip mode="flat" selected={true} style={styles.chip}>
                    {workout.Equipment}
                  </Chip>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "flex-start",
                  }}
                >
                  <Chip mode="flat" selected={false} style={styles.chip}>
                    None
                  </Chip>
                </View>
              )}
            </View>
            <View style={styles.info}>
              <Text variant="titleMedium">Intensity Level:</Text>
              <View style={{ alignItems: "flex-start" }}>
                <Chip mode="flat" selected={true} style={styles.chip}>
                  {workout.Intensity_Level}
                </Chip>
              </View>
            </View>
            <List.AccordionGroup>
              <List.Accordion title="Types of Sets" id="1">
                <View style={styles.info}>
                  <Text variant="titleMedium">Beginner Sets:</Text>
                  <View style={{ alignItems: "flex-start" }}>
                    <Chip mode="flat" selected={true} style={styles.chip}>
                      {workout["Beginner Sets"]}
                    </Chip>
                  </View>
                </View>
                <View style={styles.info}>
                  <Text variant="titleMedium">Intermediate Sets:</Text>
                  <View style={{ alignItems: "flex-start" }}>
                    <Chip mode="flat" selected={true} style={styles.chip}>
                      {workout["Intermediate Sets"]}
                    </Chip>
                  </View>
                </View>
                <View style={styles.info}>
                  <Text variant="titleMedium">Expert Sets:</Text>
                  <View style={{ alignItems: "flex-start" }}>
                    <Chip mode="flat" selected={true} style={styles.chip}>
                      {workout["Expert Sets"]}
                    </Chip>
                  </View>
                </View>
              </List.Accordion>
            </List.AccordionGroup>
            <View style={styles.descView}>
              <Text variant="titleMedium">Explanation:</Text>
              <Text variant="bodyMedium" style={styles.desc}>
                {"  "}
                {workout["Long Explanation"]}
              </Text>
            </View>
          </Card.Content>
        </ScrollView>
        <Card.Actions style={{ justifyContent: "center" }}>
          <Button
            mode="contained"
            style={styles.chip}
            onPress={() => {
              Linking.openURL(workout.Video);
            }}
          >
            Watch Video
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
  },
  info: {
    marginVertical: 10,
  },
  desc: {
    textAlign: "auto",
    padding: 10,
  },
  descView: {
    marginTop: 25,
  },
  chip: {
    backgroundColor: "rgba(237,4,91,0.3)",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
