import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fatSecretRoute from "./src/routes/fatsecret-route.js";
// import os from "os";
import userRouter from "./src/routes/user-route.js";
import "dotenv/config";

// const PORT = 5000;

// function getIPAddress() {
//   const interfaces = os.networkInterfaces();
//   for (const interfaceName in interfaces) {
//     const addresses = interfaces[interfaceName];
//     for (const address of addresses) {
//       if (address.family === "IPv4" && !address.internal) {
//         return address.address;
//       }
//     }
//   }
//   return "0.0.0.0"; // Default to listening on all available interfaces
// }

const app = express();
app.use(cors());
app.use(express.json());

app.use("/fatsecret", fatSecretRoute);

app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // const currIPAddress = getIPAddress();
    // if (currIPAddress !== process.env.IP_ADDRESS) {
    //   process.env.IP_ADDRESS = currIPAddress;
    //   console.log(`Updated IP address to ${currIPAddress}`);
    // }
    app.listen(process.env.PORT, () =>
      console.log(`Server listening at port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(`MongoDB error: ${err}`));

app.get("/", (req, res) => {
  console.log(`Server running on :${process.env.PORT}`);
  return res.send(`Server running on :${process.env.PORT}`);
});
