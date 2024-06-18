import express from "express";
import {
  addDietPlans,
  getDietPlans,
  login,
  signup,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

//Login User
userRouter.post("/Login", login);

//Signup User
userRouter.post("/Signup", signup);

//Add Diet Plans
userRouter.put("/diet", addDietPlans);

//Get Diet Plans
userRouter.get("/getPlans", getDietPlans);

export default userRouter;
