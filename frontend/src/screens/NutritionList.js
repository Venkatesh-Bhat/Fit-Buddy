import { StyleSheet, Text } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";

export default function NutritionList({ item }) {
  return (
    <>
      {/* <Text variant="bodyLarge" style={[{ color: "#ed045b" }, styles.nutText]}>
        Calories {"\t\t\t"} {item.calories}
      </Text>
      <Text variant="bodyLarge" style={[{ color: "#ed045b" }, styles.nutText]}>
        Carbohydrate {"\t\t\t"} {item.carbohydrate}
      </Text>
      <Text variant="bodyLarge" style={[{ color: "#ed045b" }, styles.nutText]}>
        Fat {"\t\t\t"} {item.fat}
      </Text>
      <Text variant="bodyLarge" style={[{ color: "#ed045b" }, styles.nutText]}>
        Protein {"\t\t\t"} {item.protein}
      </Text>
      {item.trans_fat && (
        <Text variant="bodyLarge" style={styles.nutText}>
          Trans Fat {"\t\t\t"} {item.trans_fat}
        </Text>
      )}
      <Text variant="bodyLarge" style={styles.nutText}>
        Saturated Fat {"\t\t\t"} {item.saturated_fat}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Polyunsaturated Fat {"\t\t\t"} {item.polyunsaturated_fat}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Monounsaturated Fat {"\t\t\t"} {item.monounsaturated_fat}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Cholesterol {"\t\t\t"} {item.cholesterol}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Sodium {"\t\t\t"} {item.sodium}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Potassium {"\t\t\t"} {item.potassium}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Fiber {"\t\t\t"} {item.fiber}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Sugar {"\t\t\t"} {item.sugar}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Calcium {"\t\t\t"} {item.calcium}
      </Text>
      <Text variant="bodyLarge" style={styles.nutText}>
        Iron {"\t\t\t"} {item.iron}
      </Text> */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Composition</DataTable.Title>
          <DataTable.Title numeric>Size (g)</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Calories</DataTable.Cell>
          <DataTable.Cell numeric>{item.calories || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Carbohydrate</DataTable.Cell>
          <DataTable.Cell numeric>{item.carbohydrate || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Fat</DataTable.Cell>
          <DataTable.Cell numeric>{item.fat || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Protein</DataTable.Cell>
          <DataTable.Cell numeric>{item.protein || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Trans Fat</DataTable.Cell>
          <DataTable.Cell numeric>{item.trans_fat || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Saturated Fat</DataTable.Cell>
          <DataTable.Cell numeric>{item.saturated_fat || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Polyunsaturated Fat</DataTable.Cell>
          <DataTable.Cell numeric>
            {item.polyunsaturated_fat || "--"}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Monounsaturated Fat</DataTable.Cell>
          <DataTable.Cell numeric>
            {item.monounsaturated_fat || "--"}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Cholesterol</DataTable.Cell>
          <DataTable.Cell numeric>{item.cholesterol || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Sodium</DataTable.Cell>
          <DataTable.Cell numeric>{item.sodium || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Potassium</DataTable.Cell>
          <DataTable.Cell numeric>{item.potassium || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Fiber</DataTable.Cell>
          <DataTable.Cell numeric>{item.fiber || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Sugar</DataTable.Cell>
          <DataTable.Cell numeric>{item.sugar || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Calcium</DataTable.Cell>
          <DataTable.Cell numeric>{item.calcium || "--"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Iron</DataTable.Cell>
          <DataTable.Cell numeric>{item.iron || "--"}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </>
  );
}

const styles = StyleSheet.create({
  nutText: {
    marginTop: 3,
    marginStart: 7,
  },
});
