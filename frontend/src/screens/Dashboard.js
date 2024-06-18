import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  Card,
  Text,
  Modal,
  Portal,
  RadioButton,
  List,
  Button,
  Tooltip,
} from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";

export default function Dashboard({ navigation, route }) {
  const user = route.params.user;
  const [muscle, setMuscle] = React.useState("Biceps");
  const [equip, setEquip] = React.useState("");
  const [exp, setExp] = React.useState("");
  const [params, setParams] = React.useState({ Muscles: "Biceps" });
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 5 };

  const [detail, setDetail] = React.useState({
    greeting: "",
    status: "",
  });

  // Function to get the current greeting based on the time
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 20) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  const getStatus = () => {
    if (user.userDetails.bmi < 18.5) return "underweight";
    if (user.userDetails.bmi > 18.5 && user.userDetails.bmi < 24.9)
      return "fit";
    if (user.userDetails.bmi > 25 && user.userDetails.bmi < 29.9)
      return "overweight";
    if (user.userDetails.bmi >= 30) return "obese";
  };

  // Set the greeting when the component mounts
  React.useEffect(() => {
    setDetail({ greeting: getGreeting(), status: getStatus() });
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaViewContainer}>
      <ScrollView>
        <View style={styles.container}>
          {/* <StatusBar backgroundColor="crimson" barStyle="light-content" /> */}
          <View style={styles.user}>
            <Text style={styles.salutation}>
              {detail.greeting} {user.name}!
            </Text>
            <View style={styles.userInfo}>
              <Text style={styles.userInfoText}>
                Age: {user.userDetails.age}
              </Text>
              <Text style={styles.userInfoText}>
                height: {user.userDetails.height}ft
              </Text>
              <Text style={styles.userInfoText}>
                Weight: {user.userDetails.weight}kg
              </Text>
            </View>
            <View style={styles.userCalc}>
              <Text style={[styles.userInfoText, styles.userCalcText]}>
                BMI: {user.userDetails.bmi}
              </Text>
              <Text style={[styles.userInfoText, styles.userCalcText]}>
                BMR: {user.userDetails.bmr}
              </Text>
              {/* <Text>
                Your body requires about {user.userDetails.bmr}kcal/day to
                maintain essential functions
              </Text> */}
            </View>
            <Text
              style={{
                fontSize: 15,
                marginTop: 3,
                textAlign: "center",
                color: "#ed045b",
              }}
            >
              You are {detail.status}!
            </Text>
          </View>

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <List.AccordionGroup>
                <List.Accordion title="Muscle Group" id="1">
                  <RadioButton.Group
                    onValueChange={(newValue) => {
                      setMuscle(newValue);
                      setParams((prev) => ({ ...prev, Muscles: newValue }));
                    }}
                    value={muscle}
                  >
                    <View style={styles.chooseWork}>
                      <RadioButton.Item
                        label="Biceps"
                        value="Biceps"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Triceps"
                        value="Triceps"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Chest"
                        value="Chest"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Back"
                        value="Back"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Legs"
                        value="Legs"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Abs"
                        value="Abs"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Stretching"
                        value="Stretching"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Warm Up"
                        value="Warm Up"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Lats"
                        value="Lats"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Hamstring"
                        value="Hamstring"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Calves"
                        value="Calves"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Quadriceps"
                        value="Quadriceps"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Trapezius"
                        value="Trapezius"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Shoulders"
                        value="Shoulders"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Glutes"
                        value="Glutes"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                    </View>
                  </RadioButton.Group>
                </List.Accordion>
                <List.Accordion
                  title="Equipment"
                  description="(Optional)"
                  id="2"
                >
                  <RadioButton.Group
                    onValueChange={(newValue) => {
                      setEquip(newValue);
                      setParams((prev) => ({ ...prev, Equipment: newValue }));
                    }}
                    value={equip}
                  >
                    <View style={styles.chooseWork}>
                      <RadioButton.Item
                        label="Barbell"
                        value="Barbell"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Dumbbells"
                        value="Dumbbells"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="EZ-bar"
                        value="EZ-bar"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="kettlebell"
                        value="kettlebell"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Bench"
                        value="Bench"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Chest press machine"
                        value="Chest press machine"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Cable"
                        value="Cable"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Pull-Up Bar"
                        value="Pull-Up Bar"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Leg Extension"
                        value="Leg Extension"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Leg Curl"
                        value="Leg Curl"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Smith Machine"
                        value="Smith Machine"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Calf Raise"
                        value="Calf Raise"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                    </View>
                  </RadioButton.Group>
                </List.Accordion>
                <List.Accordion
                  title="Experience Level"
                  description="(Optional)"
                  id="3"
                >
                  <RadioButton.Group
                    onValueChange={(newValue) => {
                      setExp(newValue);
                      setParams((prev) => ({
                        ...prev,
                        Intensity_Level: newValue,
                      }));
                    }}
                    value={exp}
                  >
                    <View style={styles.chooseWork}>
                      <RadioButton.Item
                        label="Beginner"
                        value="Beginner"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Intermediate"
                        value="Intermediate"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Expert"
                        value="Expert"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                    </View>
                  </RadioButton.Group>
                </List.Accordion>
                <Button
                  textColor="#ed045b"
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate("Workout", { params });
                  }}
                >
                  Submit
                </Button>
              </List.AccordionGroup>
            </Modal>
          </Portal>

          <Card style={{ marginHorizontal: 10 }} onPress={showModal}>
            <Card.Content
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "auto",
                justifyContent: "space-between",
              }}
            >
              <Text variant="titleLarge">Personalized Workouts</Text>
              <Icon name="rightcircleo" color="#ed045b" size={45} />
            </Card.Content>
          </Card>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.choice}
              onPress={() => navigation.navigate("Food")}
            >
              <View>
                <Image
                  source={require("../assets/food.png")}
                  style={styles.image}
                />
                <Text style={styles.choiceText}>Food</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.choice}
              onPress={() => navigation.navigate("Recipe", {})}
            >
              <View>
                <Image
                  source={require("../assets/recipe.png")}
                  style={styles.image}
                />
                <Text style={styles.choiceText}>Recipe</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.choice}
              onPress={() =>
                navigation.navigate("Diet Plan", {
                  user,
                })
              }
            >
              <View>
                <Image
                  source={require("../assets/diet-plan.png")}
                  style={styles.image}
                />
                <Text style={styles.choiceText}>Diet Plan</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.choice}
              onPress={() =>
                navigation.navigate("Reminder", {
                  email: user.email,
                })
              }
            >
              <View>
                <Image
                  source={require("../assets/view-diet.png")}
                  style={styles.image}
                />
                <Text style={styles.choiceText}>View Diet</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaViewContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
    // backgroundColor: "rgba(255,4,75,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: 13,
  },
  user: {
    borderWidth: 2,
    width: "90%",
    alignSelf: "center",
    borderColor: "#ed045b",
    padding: 10,
    marginTop: 20,
    borderRadius: 7,
  },
  salutation: {
    fontSize: 25,
    textAlign: "center",
    color: "#ed045b",
  },
  userInfo: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 18,
    color: "grey",
  },
  userCalcText: {
    fontSize: 20,
  },
  userCalc: {
    marginTop: 10,
    paddingVertical: 30,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 125,
    resizeMode: "contain",
  },
  options: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 0,
    marginBottom: 10,
    gap: 10,
  },
  choice: {
    width: "45%",
    padding: 8,
    borderWidth: 2,
    borderColor: "white",
    // marginVertical: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#eee",
  },
  choiceText: {
    fontSize: 22,
    color: "#6a6a6a",
    textAlign: "center",
  },
  workout: {
    marginVertical: 0,
    width: "auto",
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  chooseWork: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
