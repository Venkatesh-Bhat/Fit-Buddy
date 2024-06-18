import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Snackbar,
  Text,
  TextInput,
  RadioButton,
} from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import axios from "axios";
import { server } from "../API/Server";

export default function Auth({ navigation }) {
  const [mode, setMode] = React.useState("Login");
  const [gender, setGender] = React.useState("");

  const [visible, setVisible] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const onToggleSnackBar = (mes) => {
    setMessage(mes);
    setSnackbarVisible(!visible);
  };

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [val, setVal] = useState({
    hide: true,
    icon: "eye",
  });

  const sendRequest = async () => {
    console.log("Inside sendRequest");
    console.log(user);
    // setVisible(true);
    try {
      setVisible(true);
      console.log("Inside try");
      // let m = mode === "Login" ? "login" : "Signup";
      const res = await axios.post(`${server}/user/${mode}`, user);
      if (res.status === 200) {
        console.log("Success");
        onToggleSnackBar(res.data.message);
        setVisible(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home", params: { user: res.data.user } }],
        });
      }
      // setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      onToggleSnackBar(err.response.data.message);
      // setMessage(err.response.data.message);
      setVisible(false);
    }
  };

  const handleSubmit = () => {
    sendRequest();
  };

  const handlePress = (m) => {
    setMode(m);
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <KeyboardAvoidingView style={styles.safe} behavior="height">
      <ImageBackground
        source={require("../assets/backHome.jpg")}
        style={styles.header}
        resizeMode="stretch"
      >
        {visible ? (
          <ActivityIndicator size="large" color="tomato" style={styles.view} />
        ) : (
          <View style={styles.view}>
            <Text variant="displaySmall" style={styles.title}>
              {mode}
            </Text>
            {mode === "Login" ? (
              <>
                <TextInput
                  label="Email"
                  value={user.email}
                  activeUnderlineColor="crimson"
                  onChangeText={(text) =>
                    setUser((prev) => ({ ...prev, email: text }))
                  }
                  mode="flat"
                  style={styles.input}
                />
                <TextInput
                  label="Password"
                  value={user.password}
                  secureTextEntry={val.hide}
                  right={
                    <TextInput.Icon
                      icon={() => <Icon name={val.icon} size={20} />}
                      onPress={() =>
                        setVal((prev) => ({
                          ...prev,
                          hide: !val.hide,
                          icon: val.hide ? "eye-with-line" : "eye",
                        }))
                      }
                    />
                  }
                  mode="flat"
                  activeUnderlineColor="crimson"
                  onChangeText={(text) =>
                    setUser((prev) => ({ ...prev, password: text }))
                  }
                  style={styles.input}
                />
              </>
            ) : (
              <>
                <TextInput
                  label="Name"
                  value={user.name || ""}
                  activeUnderlineColor="crimson"
                  onChangeText={(text) =>
                    setUser((prev) => ({ ...prev, name: text }))
                  }
                  mode="flat"
                  style={styles.input}
                />
                <TextInput
                  label="Email"
                  value={user.email}
                  activeUnderlineColor="crimson"
                  onChangeText={(text) =>
                    setUser((prev) => ({ ...prev, email: text }))
                  }
                  mode="flat"
                  style={styles.input}
                />
                <RadioButton.Group
                  onValueChange={(newValue) => {
                    setGender(newValue);
                    setUser((prev) => ({ ...prev, gender: newValue }));
                  }}
                  value={gender}
                >
                  <View style={styles.mass}>
                    <TextInput
                      label="Age"
                      value={user.age || ""}
                      activeUnderlineColor="crimson"
                      onChangeText={(text) =>
                        setUser((prev) => ({ ...prev, age: text }))
                      }
                      mode="flat"
                      keyboardType="number-pad"
                      style={[styles.input, { width: "auto" }]}
                    />
                    <View style={styles.chooseGend}>
                      <RadioButton.Item
                        label="Male"
                        value="male"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                      <RadioButton.Item
                        label="Female"
                        value="female"
                        labelVariant="bodySmall"
                        mode="ios"
                        position="leading"
                        color="#ed045b"
                      />
                    </View>
                  </View>
                </RadioButton.Group>
                <View style={styles.mass}>
                  <TextInput
                    label="Weight (kg)"
                    value={user.weight || ""}
                    activeUnderlineColor="crimson"
                    onChangeText={(text) =>
                      setUser((prev) => ({ ...prev, weight: text }))
                    }
                    mode="flat"
                    keyboardType="number-pad"
                    style={[styles.input, { width: "45%" }]}
                  />
                  <TextInput
                    label="Height (ft)"
                    value={user.height || ""}
                    activeUnderlineColor="crimson"
                    onChangeText={(text) =>
                      setUser((prev) => ({ ...prev, height: text }))
                    }
                    mode="flat"
                    keyboardType="number-pad"
                    style={[styles.input, { width: "45%" }]}
                  />
                </View>
                <TextInput
                  label="Password"
                  value={user.password}
                  secureTextEntry={val.hide}
                  right={
                    <TextInput.Icon
                      icon={() => <Icon name={val.icon} size={20} />}
                      onPress={() =>
                        setVal((prev) => ({
                          ...prev,
                          hide: !val.hide,
                          icon: val.hide ? "eye-with-line" : "eye",
                        }))
                      }
                    />
                  }
                  mode="flat"
                  activeUnderlineColor="crimson"
                  onChangeText={(text) =>
                    setUser((prev) => ({ ...prev, password: text }))
                  }
                  style={styles.input}
                />
              </>
            )}
            <Button
              style={{ marginTop: 10, alignSelf: "stretch" }}
              mode="contained"
              contentStyle={{ backgroundColor: "crimson" }}
              icon="login"
              onPress={
                handleSubmit
                // {navigation.reset({
                //   index: 0,
                //   routes: [{ name: "Home" }],
                // })}
              }
            >
              {mode}
            </Button>

            <Text style={styles.bottom}>
              {mode === "Login" ? "Don't have" : "Have"} an account?{" "}
              <Text
                onPress={() =>
                  handlePress(mode === "Login" ? "Signup" : "Login")
                }
                style={{ color: "crimson", fontWeight: "bold" }}
              >
                {mode === "Login" ? "Signup" : "Login"} Instead!
              </Text>
            </Text>

            <Snackbar
              visible={snackbarVisible}
              onDismiss={onDismissSnackBar}
              duration={1500}
            >
              {message}
            </Snackbar>
          </View>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "rgba(255,4,75,0.2)",
  },
  header: {
    flex: 1,
    padding: 10,
  },
  view: {
    flex: 1,
    gap: 10,
    backgroundColor: "rgba(75,4,75,0.2)",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 30,
    marginVertical: "25%",
  },
  input: {
    width: "100%",
  },
  mass: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 3,
    // flex: 0.5,
    width: "100%",
    justifyContent: "space-between",
    // alignItems: "flex-start",
    // justifyItems: "space-evenly",
  },
  title: {
    color: "white",
    position: "absolute",
    top: "5%",
    left: "3%",
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  bottom: {
    color: "white",
  },
  chooseGend: {
    display: "flex",
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
