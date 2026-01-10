import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import dotevn from "dotenv";

dotevn.config();

async function testUserSchema() {
    await mongoose.connect('mongodb://127.0.0.1:27017/she_meeting');

    // Create a new user
    const user = await User.create(
        {
        name: "alan",
        email: "alan@gmail.com",
        password: "alan",
        division: "Test Division",
        role: "admin"
    },
);

    console.log("User created:", user);

    const isMatch = await user.comparePassword("password12");
    console.log("Password match:", isMatch);
    
    await mongoose.disconnect();
}

testUserSchema()