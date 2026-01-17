import mongoose from "mongoose";
import User from "../models/user.model.js";
import dotevn from "dotenv";

dotevn.config();

async function testUserSchema() {
    await mongoose.connect(process.env.MONGODB_URI);

    // Create a new user
    const user = await User.create(
        {
            name: "alankeren",
            email: `bangalan@gmail.com`,
            password: "alan1234",
            position: "ICT Main. Support Jr. Assistant",
            division: "ICT",
            isActive: true,
            role: "admin"
        },
    );

    console.log("User created:", user);

    const isMatch = await user.comparePassword("alan");
    console.log("Password match:", isMatch);

    await mongoose.disconnect();
}

testUserSchema()