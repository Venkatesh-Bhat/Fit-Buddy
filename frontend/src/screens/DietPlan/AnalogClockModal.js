import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Modal, TextInput } from "react-native-paper";

export default function AnalogClockModal({
  visible,
  onClose,
  onSelectAlarmTime,
}) {
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [time, setTime] = useState({
    hour: "",
    min: "",
  });
  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={containerStyle}
    >
      <View style={styles.time}>
        <TextInput
          placeholder="00"
          value={time.hour}
          keyboardType="numeric"
          maxLength={2}
          textAlign="center"
          onChangeText={(text) => {
            if (text >= 24) setTime((prev) => ({ ...prev, hour: "" }));
            else setTime((prev) => ({ ...prev, hour: text }));
          }}
        />
        <TextInput
          placeholder="00"
          value={time.min}
          keyboardType="numeric"
          maxLength={2}
          textAlign="center"
          onChangeText={(text) => {
            if (text >= 60) setTime((prev) => ({ ...prev, min: "" }));
            else setTime((prev) => ({ ...prev, min: text }));
          }}
        />
      </View>
      <Button onPress={() => onSelectAlarmTime(time)}>Submit</Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  time: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    alignItems: "center",
  },
});
