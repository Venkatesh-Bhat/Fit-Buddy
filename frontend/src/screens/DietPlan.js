import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  FAB,
  Modal,
  Portal,
  TextInput,
  MD2Colors,
} from "react-native-paper";
import axios from "axios";
import { server } from "../API/Server";

export default function DietPlan({ route, navigation }) {
  const user = route.params.user;

  const [meal, setMeal] = React.useState("");
  const [qty, setQty] = React.useState("1");
  const [food, setFood] = React.useState("");
  const [foodList, setFoodList] = React.useState(null);
  const [foodDetail, setFoodDetail] = React.useState(null);
  const [diet, setDiet] = React.useState([]);
  const [mealIndex, setMealIndex] = React.useState(null); // State variable to hold the index of the meal

  const [modalType, setModalType] = React.useState(null);

  const [visible, setVisible] = React.useState(false);
  const showModal = (type = null, index = null) => {
    setMeal("");
    setFood("");
    setMealIndex(index); // Set the meal index when modal is opened
    setModalType(type);
    setVisible(true);
  };

  const hideModal = () => {
    setQty("1");
    setFoodList(null);
    setFoodDetail(null);
    setVisible(false);
  };

  useEffect(() => {
    if (diet.length === 0) {
      setTotalCals(0);
    }
  }, [diet]);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const submitMeal = () => {
    if (modalType === "meal") {
      setDiet([...diet, { meal: meal, foodItems: [] }]);
    } else if (modalType === "food") {
      const updatedDiet = [...diet];
      updatedDiet[mealIndex].foodItems.push({
        food: foodDetail.food,
        qty: qty,
        cal: foodDetail.Calories,
      }); // Add food to the selected meal's foodItems array
      setDiet(updatedDiet);
      setTotalCals((cals) => cals + qty * parseInt(foodDetail.Calories));
    }
    hideModal();
  };

  const removeMeal = (index) => {
    const updatedDiet = [...diet];
    updatedDiet.splice(index, 1);
    setDiet(updatedDiet);
  };

  const sendSearchRequest = async () => {
    if (food.trim() === "" || !food) {
      setFoodList([]);
      return;
    }
    try {
      const res = await axios.get(
        `${server}/fatsecret/foods/search?foodName=${food}`
      );
      // console.log(res.data);
      // console.log(`RES: ${res.data}`);
      setFoodList(res.data.foods.food);
    } catch (err) {
      setFoodList([]);
      console.log(`Fetch error:${food} :${err}`);
    }
  };

  const handleSearchSubmit = () => {
    sendSearchRequest();
  };

  const handleFoodAdd = (item) => {
    const desc = item.food_description.split(" - ");
    const nutrientArray = desc[1].split(" | ");
    const nutrientObj = {};
    nutrientArray.forEach((nutrient) => {
      const [name, value] = nutrient.split(":");
      nutrientObj[name.trim()] = value.trim();
    });
    // setFoodList(null);
    nutrientObj["food"] = item.food_name;
    console.log(nutrientObj);
    setFood(item.food_name);
    setFoodDetail(nutrientObj);
  };

  const [totalCals, setTotalCals] = React.useState(0);

  // React.useEffect(() => {
  //   if (foodDetail)
  //     setTotalCals((cals) => cals + qty * parseInt(foodDetail.Calories));
  // }, [foodDetail, qty]);

  const sendDietPlanRequest = async () => {
    try {
      const res = await axios.put(`${server}/user/diet`, {
        email: user.email,
        dietPlans: diet,
      });
      console.log(res.data.user);
      navigation.replace("Reminder", { email: user.email });
    } catch (err) {
      console.log("Unable to send diet plan to server", err);
    }
  };

  const handlePlanSubmit = () => {
    console.log(diet);
    if (diet.length !== 0 || (diet.foodItems && diet.foodItems.length !== 0))
      sendDietPlanRequest();
    else
      Alert.alert("Empty Plan", "Please create a diet plan!!", [
        { text: "Ok", onPress: () => console.log("Ok pressed") },
      ]);
  };

  const removeFood = (mealIndex, foodIndex) => {
    const updatedDiet = [...diet];
    // Check if foodItem exists before accessing its properties
    if (updatedDiet[mealIndex].foodItems[foodIndex]) {
      const removedCalories = updatedDiet[mealIndex].foodItems[foodIndex].cal;
      const qtyRemoved = updatedDiet[mealIndex].foodItems[foodIndex].qty;
      updatedDiet[mealIndex].foodItems.splice(foodIndex, 1);
      setDiet(updatedDiet);
      // Calculate the total calories after removing the food item
      setTotalCals((cals) => cals - parseInt(removedCalories) * qtyRemoved);
    }
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {modalType === "food" ? ( // Conditionally render TextInput for adding food
            <>
              <Text style={styles.salutation}>Add Food</Text>
              <TextInput
                placeholder="Search Food Name"
                mode="outlined"
                outlineColor="crimson"
                activeOutlineColor="crimson"
                style={styles.input}
                value={food}
                onChangeText={(text) => setFood(text)}
                onSubmitEditing={handleSearchSubmit}
              />

              {foodList && food !== "" ? (
                <View style={styles.foodList}>
                  <FlatList
                    ListEmptyComponent={
                      <Text style={styles.empty}>No foods found!!</Text>
                    }
                    data={foodList}
                    renderItem={({ item }) => (
                      <Text
                        style={{ color: "crimson", paddingVertical: 3 }}
                        onPress={() => handleFoodAdd(item)}
                      >
                        {item.food_name}
                      </Text>
                    )}
                  />
                </View>
              ) : (
                <View>
                  <ActivityIndicator
                    animating={food ? true : false}
                    color={MD2Colors.red800}
                  />
                </View>
              )}
              <View style={styles.nutrient}>
                <View style={{ alignItems: "center" }}>
                  <Text>Protein</Text>
                  <Button mode="outlined">
                    <Text>{foodDetail ? foodDetail.Protein : ""}</Text>
                  </Button>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text>Fat</Text>
                  <Button mode="outlined">
                    <Text>{foodDetail ? foodDetail.Fat : ""}</Text>
                  </Button>
                </View>
                <View style={{ alignItems: "center" }}>
                  {/* <Text>Carbs</Text>
                  <View style={styles.indiNuts}>
                    <Text>{foodDetail ? foodDetail.Carbs : ""}</Text>
                  </View> */}
                  <Text>Carbs</Text>
                  <Button mode="outlined">
                    {foodDetail ? foodDetail.Carbs : ""}
                  </Button>
                </View>
              </View>
              <View style={styles.footer}>
                <Text>
                  Total Calories:{" "}
                  {foodDetail && qty
                    ? `${parseInt(foodDetail.Calories) * qty}kcal`
                    : ""}
                </Text>
                <TextInput
                  label="Quantity"
                  mode="outlined"
                  outlineColor="crimson"
                  activeOutlineColor="crimson"
                  style={styles.input}
                  value={qty}
                  keyboardType="numeric"
                  onChangeText={(text) => setQty(text)}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.salutation}>Meal Details</Text>
              <TextInput
                placeholder="Enter Meal Name"
                mode="outlined"
                outlineColor="crimson"
                activeOutlineColor="crimson"
                style={styles.input}
                value={meal}
                onChangeText={(text) => setMeal(text)}
              />
            </>
          )}
          <View style={styles.buttonView}>
            <Button
              onPress={submitMeal}
              textColor="crimson"
              style={styles.button}
            >
              Submit
            </Button>
            <Button
              onPress={hideModal}
              textColor="crimson"
              style={styles.button}
            >
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>
      {diet.length !== 0 && (
        <FlatList
          data={diet}
          renderItem={({ item, index }) => (
            <View style={styles.mealView}>
              <View style={styles.header}>
                <Text style={styles.meal}>{item.meal}</Text>
                <View style={styles.addItems}>
                  <FAB
                    color="white"
                    icon="plus"
                    mode="flat"
                    size="small"
                    style={{ backgroundColor: "limegreen", width: "auto" }}
                    onPress={() => showModal("food", index)} // Pass the meal index to showModal
                  />
                  <FAB
                    color="white"
                    icon="minus"
                    mode="flat"
                    size="small"
                    style={{ backgroundColor: "crimson", width: "auto" }}
                    onPress={() => removeMeal(index)}
                  />
                </View>
              </View>
              <FlatList
                data={item.foodItems ? item.foodItems : []}
                renderItem={({ item: foodItem, index: foodIndex }) => (
                  <View style={styles.foodDispay}>
                    <Text>{foodItem.food}</Text>
                    <Text>
                      {foodItem.qty} x {foodItem.cal}
                    </Text>
                    <FAB
                      color="white"
                      icon="minus"
                      mode="flat"
                      size="small"
                      style={{ backgroundColor: "crimson", width: "auto" }}
                      onPress={() => removeFood(index, foodIndex)}
                    />
                  </View>
                )}
              />
            </View>
          )}
        />
      )}
      <View style={styles.totalCalories}>
        <Text style={styles.calories}>
          {totalCals}/{user.userDetails.bmr}
        </Text>
        <Button mode="outlined" onPress={handlePlanSubmit}>
          Submit
        </Button>
      </View>
      <FAB
        color="white"
        icon="plus"
        style={styles.fab}
        onPress={() => showModal("meal")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    // backgroundColor: "rgba(255,4,75,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: 13,
  },
  salutation: {
    fontSize: 25,
    textAlign: "center",
    color: "#ed045b",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "crimson",
  },
  input: {
    margin: 12,
    borderColor: "white",
    width: "95%",
    alignSelf: "center",
  },
  mealView: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "crimson",
    margin: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meal: {
    fontSize: 25,
    textAlign: "left",
    color: "#ed045b",
  },
  addItems: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    // backgroundColor: "rgba(255,4,75,0.5)",
    // color: "crimson",
  },
  foodList: {
    height: "30%",
    width: "95%",
    alignSelf: "center",
    overflow: "scroll",
    padding: 3,
    // borderColor: "gray",
    borderWidth: 1,
  },
  nutrient: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 4,
  },
  indiNuts: {
    borderColor: "crimson",
    marginTop: 6,
    borderWidth: 1,
    padding: 10,
  },
  footer: {
    marginTop: 4,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  foodDispay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  totalCalories: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  calories: {
    fontSize: 28,
    color: "gray",
  },
});
