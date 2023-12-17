import mongoose, { Schema } from "mongoose";

const feeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    feeAmount: {
      type: Number,
      required: true,
      trim: true,
    },
    feeAmountInWords: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },

    stdId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

export const Fee = mongoose.model("Fee", feeSchema);
