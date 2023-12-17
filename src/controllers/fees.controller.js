import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Fee } from "../models/fees.model.js";
import { Student } from "../models/students.model.js";

export const addFees = asyncHandler(async (req, res) => {
  const { fullName, email, feeAmount, feeAmountInWords, address, stdId } =
    req.body;
  console.log(req.body);
  const foundStudent = await Student.findById({ _id: stdId });
  if (!foundStudent) {
    throw new ApiError(400, "Student not found");
  }
  const stdData = [
    fullName,
    email,
    feeAmount,
    feeAmountInWords,
    address,
    stdId,
  ];
  if (stdData.some((field) => field?.trim() === "" || undefined)) {
    throw new ApiError(400, "All fields are required");
  }
  const createdfee = await Fee.create({
    fullName,
    email,
    feeAmount,
    feeAmountInWords,
    address,
    stdId: foundStudent,
  });
  if (!createdfee) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdfee, "student registered Successfully"));
});
export const getFees = asyncHandler(async (req, res) => {
  const fees = await Fee.find(req.query);
  if (!fees) {
    throw new ApiError(404, "Fees not found");
  }
  res.status(200).json(new ApiResponse(200, fees, "success"));
});

// delete fees from database
export const deleteFees = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const fees = await Fee.findById(_id);
  if (!fees) {
    throw new ApiError(404, "Fees not found");
  }
  const deletedfees = await Fee.findByIdAndDelete(_id, { new: true });

  res.status(200).json(new ApiResponse(200, deletedfees, "success"));
});

//edit fees details

export const editFees = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const fees = await Fee.findById(_id);
  if (!fees) {
    throw new ApiError(404, "Fees not found");
  }
  const deletedfees = await Fee.findByIdAndUpdate(_id, req.body, { new: true });

  res.status(200).json(new ApiResponse(200, deletedfees, "success"));
});
