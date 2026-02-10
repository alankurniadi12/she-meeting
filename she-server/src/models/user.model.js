import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/hash.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    placeOfBirth: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    employId: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    position: {
      type: String,
      trim: true,
    },
    division: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    employmentStatus: {
      type: String,
      enum: ["Permanent", "Contract", "Internship"],
      default: "Contract",
    },
    yearJoined: {
      type: Number,
    },
    retirementAge: {
      type: Number,
    },
    countFindings: {
      type: Number,
      default: 0,
    },
    latestContribution: {
      type: Date,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    }
  },
  { timestamps: true }
);

// hasil hash password ini bisa di lihat pada mongodb 
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hashPassword(this.password);
});

// mengembalikan nilai boolean, fungsi ini dipanggil pada testUserSchema.js 
// bukti keberhasilanya di testUserSchema.js true/false
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await comparePassword(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;