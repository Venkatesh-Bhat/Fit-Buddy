import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import axios from "axios";
import FoodList from "./Foods/FoodList";
import { Text, Searchbar } from "react-native-paper";
import { server } from "../API/Server";

export default function Food() {
  const [food, setFood] = useState([]);
  const [value, setValue] = useState("");
  const [refreshing, setRefreshing] = useState(food.length === 0);

  const handleSubmit = async (value) => {
    if (value === "" || !value) {
      setFood([]);
      return;
    }
    setRefreshing(true);
    try {
      const res = await axios.get(
        `${server}/fatsecret/foods/search?foodName=${value}`
      );
      // console.log(res.data);
      // console.log(`RES: ${res.data}`);
      setFood(res.data.foods.food);
    } catch (err) {
      setFood([]);
      console.log(`Fetch error:${value} :${err}`);
    }
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Searchbar
          style={styles.input}
          placeholder="Search foods..."
          onChangeText={setValue}
          value={value}
          onSubmitEditing={() => handleSubmit(value)}
          mode="bar"
          iconColor="white"
          color="white"
          loading={refreshing}
        />
        {/* <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
          placeholder="Search foods..."
          onSubmitEditing={() => handleSubmit(value)}
        /> */}
        {/* <StatusBar backgroundColor="crimson" barStyle="light-content" /> */}
        {refreshing ? (
          <View style={styles.splash}>
            <ActivityIndicator size="large" color="tomato" />
            <Text>Waiting for food!</Text>
          </View>
        ) : (
          <FoodList
            foods={food}
            // refresh={refreshing}
            // handleRefresh={handleItemRefresh}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    margin: 12,
    backgroundColor: "rgba(255,4,75,0.7)",
    // width: "95%",
    // padding: 1,
    alignSelf: "center",
  },
  splash: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
