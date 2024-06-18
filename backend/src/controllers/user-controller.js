import User from "../models/User.js";
import bcryptjs from "bcryptjs";

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User doesn't exist, please signup instead!" });
    }
    //check password
    const correctPass = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!correctPass) {
      return res.status(400).json({ message: "Incorrect password!" });
    }
    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const signup = async (req, res) => {
  const user = req.body;
  console.log(req.body);
  console.log(user);
  try {
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists, please login instead!" });
    }

    //Generating Salt
    const salt = await bcryptjs.genSalt(10);
    //Hashing the Password using the generated salt
    const hashedPass = await bcryptjs.hash(user.password, salt);

    //calculating BMI - weight (kg) and height (m)
    const bmi = user.weight / Math.pow(user.height * 0.3048, 2);

    //calculating BMR using Mifflin-St Jeor Equation (more accurate)
    let bmr;
    if (user.gender === "male") {
      bmr = 10 * user.weight + 6.25 * (user.height * 30.48) - 5 * user.age + 5;
    } else {
      bmr =
        10 * user.weight + 6.25 * (user.height * 30.48) - 5 * user.age - 161;
    }

    const newUser = new User({
      name: user.name,
      email: user.email,
      password: hashedPass,
      userDetails: {
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
        bmi: bmi.toFixed(2),
        bmr: bmr.toFixed(2),
      },
    });
    await newUser.save();
    return res.status(200).json({ message: "success", user: newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const addDietPlans = async (req, res) => {
  try {
    const { email, dietPlans } = req.body; // Assuming you're sending userId and dietPlans in the request body
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.dietPlan.push(...dietPlans);
    await user.save();

    return res
      .status(200)
      .json({ message: "Diet plans added successfully", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const getDietPlans = async (req, res) => {
  try {
    const email = req.query.email; // Assuming you're sending userId and dietPlans in the request body
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("No user found");
      return res.status(404).json({ message: "User not found" });
    }

    const dietPlans = user.dietPlan;

    if (dietPlans.length === 0) {
      console.log("No diet plans added");
      return res.status(404).json({ message: "No diet plans added!" });
    }

    return res.status(200).json({ dietPlans });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const updateUser = async (req, res) => {
  const value = req.body;
  try {
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    for (let i in value.userDetails) {
      user[i] = value.userDetails[i];
    }
    await user.save();
    return res.status(200).json({ message: "updated successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!" });
  }
};
