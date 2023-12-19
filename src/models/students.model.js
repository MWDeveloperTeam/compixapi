import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    fatherName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    domicile: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    programName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    programCode: {
      type: Number,
      required: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    sourceOfInformation: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    qualification: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    academicSession: {
      type: Number,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photo: {
      type: String, //cloudaniray string
      default: "avatar.png",
      required: true,
    },
    lastInstituteName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastBoardCollege: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    yearOfPassing: {
      type: Number,
      required: true,
      lowercase: true,
      trim: true,
    },
    stream: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    marks: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    lastInstituteName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastBoardCollege: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    yearOfPassing: {
      type: Number,
      required: true,
      lowercase: true,
      trim: true,
    },
    stream: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    examCourse: {
      type: String,
      lowercase: true,
      trim: true,
      default: " ",
    },
    examTaken: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    marks: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

studentSchema.methods.addExamTaken = async function (data) {
  await this.examTaken.push(data);
  return await this.save();
};

export const Student = mongoose.model("Student", studentSchema);
