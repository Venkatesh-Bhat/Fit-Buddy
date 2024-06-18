import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userDetails: {
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    bmr: {
      type: Number,
      required: true,
    },
  },
  dietPlan: [
    {
      meal: {
        type: String,
        required: true,
      },
      foodItems: [
        {
          food: {
            type: String,
            required: true,
          },
          qty: {
            type: Number,
            required: true,
          },
          cal: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

export default mongoose.model("User", userSchema);
