// DietItems.js

import { FlatList, Modal, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Switch, Text, Button, Portal } from "react-native-paper";
import AnalogClockModal from "./AnalogClockModal";

export default function DietItems({ item, setAlarm }) {
  return (
    <Card style={styles.card}>
      <Card.Title title={item.meal} />
      <Card.Content>
        <FlatList
          data={item.foodItems}
          renderItem={({ item }) => (
            <View style={styles.food}>
              <Text>
                {item.qty} x {item.food}
              </Text>
              <Text>{item.cal}</Text>
            </View>
          )}
        />
      </Card.Content>
      <Card.Actions></Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 5,
  },
  food: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
