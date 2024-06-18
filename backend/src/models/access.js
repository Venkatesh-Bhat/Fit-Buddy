import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accessSchema = new Schema({
  access_token: { type: String, required: true },
  expires_in: { type: Number, required: true },
});

export default mongoose.model("Access", accessSchema);
