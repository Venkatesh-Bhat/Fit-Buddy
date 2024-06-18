import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import RecipeItem from "./RecipeItem";

export default function RecipeList({ recipes, refresh, handleRefresh }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeItem recipe={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No recipes found!!</Text>
        }
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
  empty: {
    textAlign: "center",
    // fontSize: 25,
    marginTop: "40%",
  },
});
