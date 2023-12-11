import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/students.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
    acedemicSession,
    lastInstituteName,
    lastBoardCollege,
    yearOfPassing,
    stream,
    marks,
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
      acedemicSession,
      lastInstituteName,
      lastBoardCollege,
      yearOfPassing,
      stream,
      marks,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const foundStudent = await Student.findOne({ email });
  if (foundStudent) {
    throw new ApiError(403, "student with this email already exists");
  }
  const foundStudentWithPhone = await Student.findOne({ phone });
  if(foundStudentWithPhone){
    throw new ApiError(403, "phone no already exists");
  }
  if(phone.length>10 || phone.length<10){
    throw new ApiError(400, "phone must be 10 digits");

  }
  // image upload check
  const avatarLocalPath = req.files?.photo[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "photo is required");
  }
  const photo = await uploadOnCloudinary(avatarLocalPath);
  if (!photo) {
    throw new ApiError(400, "photo upload failed please try after some time");
  }
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
    acedemicSession,
    photo: photo.url,
    acedemicDetails: [
      { lastInstituteName, lastBoardCollege, yearOfPassing, stream, marks },
    ],
  });
  if (!createdStudent) {
    throw new ApiError(500, "Something went wrong while registering the user");
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
  const foundStudent = await Student.findOne({_id});

  const deletedStudent = await Student.deleteOne({ _id },{new:true});
  if(!foundStudent){
    throw new ApiError(404, "user not found");
  }
  const {photo}=foundStudent 
  res.status(200).json(new ApiResponse(200,deletedStudent,"user not found"));

});

// Get Student Controller
const getAllStudents = asyncHandler(async (req, res) => {
  const foundStudent = await Student.find();
  res
    .status(200)
    .json(new ApiResponse(200, foundStudent, "list of all the students found"));
});

// get one student
const getOneStudent = asyncHandler(async(req, res) => {
  const _id =req.params.id
  const foundStudent = await Student.findOne({_id})
  if (!foundStudent){
    throw new ApiError(404, "user not found");
  }
    res.status(200).json(new ApiResponse(200,foundStudent,"success"));

})

export { registerStudent, deleteStudent, getAllStudents,getOneStudent};
