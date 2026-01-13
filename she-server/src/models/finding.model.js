import mongoose from "mongoose";

const findingSchema = new mongoose.Schema(
  {
    description: { 
      type: String, 
      required: true,
      trim: true,
      minlength: 10,
    },
    reportedAt: {
      type: Date,
      required: true,
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    division: { 
      type: String, 
      required: true,
      trim: true,
    },
    targetDivision: { 
      type: String, 
      required: true,
      trim: true,
    },
    status: {
      type: String, 
      enum: ["in_progress", "completed", "postponed"],
      default: "in_progress",
      required: true 
    },
    lokasi: { 
      type: String, 
      required: true 
    },
    catatan: { 
      type: String 
    },
    images: [
      { type: String }
    ],
    logs: [
      {
        date: { 
          type: Date, 
          default: Date.now
        },
        action: { 
          type: String
        },
        status: { 
          type: String
        },
        by: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User" }
      },
    ],
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
);

// 🔍 Indexes for performance
findingSchema.index({ reportedAt: -1 });
findingSchema.index({ status: 1 });
findingSchema.index({ division: 1 });

const Finding = mongoose.model("Finding", findingSchema);

export default Finding;