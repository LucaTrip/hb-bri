import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

export const connect = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI!);

    const ChoiceSchema = new mongoose.Schema({
      name: String,
      coming: Boolean,
    });

    const Choice =
      mongoose.models.Choice || mongoose.model("Choice", ChoiceSchema);

    return { conn, Choice };
  } catch (error) {
    console.log("mongo db connection error", error);
  }
};
