import mongoose from "mongoose";
import config from "../config/config.js";

function connectdb() {
    mongoose.connect(config.MONGODB_URL)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("MongoDB connection error:", err));
    
}
export default connectdb;