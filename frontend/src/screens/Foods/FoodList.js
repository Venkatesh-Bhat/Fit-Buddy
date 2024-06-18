import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import FoodItem from "./FoodItem";

export default function FoodList({ foods, refresh, handleRefresh }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        renderItem={({ item }) => <FoodItem food={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No foods found!!</Text>}
        // ListHeaderComponent={<Text style={styles.header}>Food List</Text>}
        ItemSeparatorComponent={<View style={{ height: 16 }} />}
        ListFooterComponent={<View style={{ height: 16 }} />}
        // refreshing={refresh}
        // onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "left",
    fontSize: 25,
  },
  empty: {
    textAlign: "center",
    // fontSize: 25,
    marginTop: "40%",
  },
});
