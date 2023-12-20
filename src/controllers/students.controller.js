import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/students.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const registerStudent = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    fatherName,
    nationality,
    domicile,
    dateOfBirth,
    gender,
    email,
    phone,
    programName,
    programCode,
    address,
    sourceOfInformation,
    qualification,
    academicSession,
    lastInstituteName,
    lastBoardCollege,
    yearOfPassing,
    stream,
    marks,
    examCourse,
  } = req.body;
  if (
    [
      firstName,
      middleName,
      lastName,
      fatherName,
      nationality,
      domicile,
      dateOfBirth,
      gender,
      email,
      phone,
      programName,
      programCode,
      address,
      sourceOfInformation,
      qualification,
      academicSession,
      lastInstituteName,
      lastBoardCollege,
      yearOfPassing,
      stream,
      marks,
    ].some((field) => field?.trim() === "")
  ) {
    throw res
      .status(403)
      .json(new ApiResponse(400, null, "All fields are required"));
  }
  const foundStudent = await Student.findOne({ email });
  if (foundStudent) {
    throw res
      .status(403)
      .json(
        new ApiResponse(403, null, "Student with this email already exists")
      );
  }
  const foundStudentWithPhone = await Student.findOne({ phone });
  if (foundStudentWithPhone) {
    throw res
      .status(403)
      .json(new ApiResponse(403, null, "phone no already exists"));
  }
  if (phone.length > 10 || phone.length < 10) {
    throw res
      .status(400)
      .json(new ApiResponse(400, null, "phone must be 10 digits"));
  }
  // image upload check
  // const avatarLocalPath = req.files?.photo[0]?.path;
  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "photo is required");
  // }
  // const photo = await uploadOnCloudinary(avatarLocalPath);
  // if (!photo) {
  //   throw new ApiError(400, "photo upload failed please try after some time");
  // }
  const createdStudent = await Student.create({
    firstName,
    middleName,
    lastName,
    fatherName,
    nationality,
    domicile,
    dateOfBirth,
    gender,
    email,
    phone,
    programName,
    programCode,
    address,
    sourceOfInformation,
    qualification,
    academicSession,
    // photo: photo.url,
    lastInstituteName,
    lastBoardCollege,
    yearOfPassing,
    stream,
    marks,
    examCourse,
  });
  if (!createdStudent) {
    throw res
      .status(403)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while registering the user"
        )
      );
  }
  return res
    .status(201)
    .json(
      new ApiResponse(200, createdStudent, "student registered Successfully")
    );
});

// delete student controller
const deleteStudent = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const foundStudent = await Student.findOne({ _id });

  const deletedStudent = await Student.deleteOne({ _id }, { new: true });
  if (!foundStudent) {
    throw res.status(403).json(new ApiResponse(404, null, "user not found"));
  }
  const { photo } = foundStudent;
  await deleteFromCloudinary(photo);
  res
    .status(200)
    .json(new ApiResponse(200, deletedStudent, "user deleted Successfully"));
});

// Get all Student Controller
const getAllStudents = asyncHandler(async (req, res) => {
  const foundStudent = await Student.find(req.query);
  if (!foundStudent) {
    throw res.status(403).json(new ApiResponse(404, null, "Student not found"));
  }
  res.status(200).json(new ApiResponse(200, foundStudent, "ok"));
});

// get one student
const getOneStudent = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const foundStudent = await Student.findOne({ _id });
  if (!foundStudent) {
    throw res.status(403).json(new ApiResponse(404, null, "student not found"));
  }
  res.status(200).json(new ApiResponse(200, foundStudent, "success"));
});
// ==============================================================================
const updateStudent = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  // const {} = req.body;
  const foundStudent = await Student.findOne({ _id });
  if (!foundStudent) {
    throw res.status(403).json(new ApiResponse(404, null, "Student not found"));
  }
  const response = await Student.findByIdAndUpdate(
    { _id },
    {
      $set: req.body,
    },
    { new: true }
  );
  res
    .status(200)
    .json(new ApiResponse(200, response, "changes updated successfully"));
});

// update profile picture

const updateProfile = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const foundStudent = await Student.findById({ _id });
  const photoLink = foundStudent.photo;
  const localPhotoPath = req.files?.photo[0]?.path;
  if (!localPhotoPath) {
    throw new ApiError(400, "photo is required");
  }
  const photo = await uploadOnCloudinary(localPhotoPath);
  if (!photo) {
    throw new ApiError(400, "photo upload failed please try after some time");
  }
  await deleteFromCloudinary(photoLink);
  const response = await Student.findByIdAndUpdate(
    { _id },
    {
      $set: { photo: photo.url },
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, response, "profile updated successfully"));
});

// add academic details
const addAcademicDetails = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const { lastInstituteName, lastBoardCollege, yearOfPassing, stream, marks } =
    req.body;
  const foundStudent = await Student.findById(_id);
  if (
    [lastInstituteName, lastBoardCollege, yearOfPassing, stream, marks].some(
      (student) => student?.trim() === "" || undefined
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }
  const addedData = await foundStudent.addAcademicDetails({
    lastInstituteName,
    lastBoardCollege,
    yearOfPassing,
    stream,
    marks,
  });
  res
    .status(200)
    .json(new ApiResponse(200, addedData, "details added successfully"));
});

// delete Academic details
const deleteAcadamicDetails = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const academicId = req.query.academicid;
  const foundStudent = await Student.findById(_id);
  const filterdDetails = foundStudent?.academicDetails?.filter(
    (detail) => detail._id.toString() === academicId
  );
  if (filterdDetails.length === 0) {
    throw new ApiError(400, "details not found");
  }
  const deleted = await foundStudent.deleteAcademicDetails(academicId);
  res
    .status(200)
    .json(new ApiResponse(200, deleted, "details deleted successfully"));
});

export const examTaken = asyncHandler(async (req, res) => {
  const _id = req.body.id;
  const foundUser = await Student.findById({ _id });
  if (!foundUser) {
    throw res.status(404).json(new ApiResponse(404, null, "user not found"));
  }
  const resData = await foundUser.addExamTaken(req.body.course);
  res.status(200).json(new ApiResponse(400, resData, "Successfully"));
});

export {
  registerStudent,
  deleteStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
  updateProfile,

  // addAcademicDetails,
  // deleteAcadamicDetails,
};
