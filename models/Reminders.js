// Esquema documento Reminders
import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },
    
    user: {
        type: Schema.ObjectId,
        ref: 'Users'
    },
    
    status: {
        type: Schema.ObjectId,
        ref: 'Status'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Reminders", reminderSchema);