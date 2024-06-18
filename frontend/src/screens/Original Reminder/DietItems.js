// DietItems.js

import { FlatList, Modal, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Switch, Text, Button, Portal } from "react-native-paper";
import AnalogClockModal from "./AnalogClockModal";

export default function DietItems({ item, setAlarm }) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAlarmTime, setSelectedAlarmTime] = useState("07:00");

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (!isSwitchOn) {
      setAlarm(selectedAlarmTime, "Custom Alarm", "Time to wake up!");
    }
  };

  const onCardPress = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onSelectAlarmTime = (time) => {
    setSelectedAlarmTime(`${time.hour}:${time.min}`);
    setModalVisible(false);
  };

  return (
    <Card style={styles.card} onPress={onCardPress}>
      <Card.Title title={item.meal} subtitle={`Time: ${selectedAlarmTime}`} />
      <Card.Content>
        <FlatList
          data={item.foodItems}
          renderItem={({ item }) => (
            <View style={styles.food}>
              <Text>{item.food}</Text>
              <Text>{item.qty}</Text>
              <Text>{item.cal}</Text>
            </View>
          )}
        />
      </Card.Content>
      <Card.Actions>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </Card.Actions>
      <Portal>
        <AnalogClockModal
          visible={modalVisible}
          onClose={onCloseModal}
          onSelectAlarmTime={onSelectAlarmTime}
        />
      </Portal>
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
