import mongoose from "mongoose";
import User from "../models/user.model.js";
import dotevn from "dotenv";

dotevn.config();

async function testUserSchema() {
    await mongoose.connect(process.env.MONGODB_URI);

    // Create a new user
    const user = await User.create(
        {
            name: "alan4",
            email: `alan4@gmail.com`,
            password: "alan4",
            division: "Test Division",
            role: "admin"
        },
    );

    console.log("User created:", user);

    const isMatch = await user.comparePassword("alan2");
    console.log("Password match:", isMatch);

    await mongoose.disconnect();
}

testUserSchema()