import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    age: { type: Number },
    picture: { type: String, required: true },
});

export default mongoose.model("student", UserSchema);
