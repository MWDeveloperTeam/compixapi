import mongoose, { Schema } from "mongoose";

const examSchema = new Schema(
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
    answers: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    answerKey: [
      {
        question: {
          type: String,
          lowercase: true,
          trim: true,
        },
        options: [
          {
            type: String,
            lowercase: true,
            trim: true,
          },
        ],
        answer: {},
      },
    ],
    stdId: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);
