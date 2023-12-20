import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Fee } from "../models/fees.model.js";
import { Student } from "../models/students.model.js";

export const addFees = asyncHandler(async (req, res) => {
  const { fullName, email, feeAmount, feeAmountInWords, address, stdId } =
    req.body;
  // const foundStudent = await Student.findById({ _id: stdId });
  // if (!foundStudent) {
  //   throw res.status(400).json(new ApiResponse(400, null, "Student not found"));
  // }
  console.log(req.body);
  const stdData = [
    fullName,
    email,
    feeAmount,
    feeAmountInWords,
    address,
    stdId,
  ];
  if (stdData.some((field) => field?.trim() === "" || undefined)) {
    throw res
      .status(403)
      .json(new ApiResponse(400, null, "All fields are required"));
  }
  const createdfee = await Fee.create({
    fullName,
    email,
    feeAmount,
    feeAmountInWords,
    address,
    stdId,
  });
  if (!createdfee) {
    throw res
      .status(500)
      .json(
        new ApiResponse(
          400,
          null,
          "Something went wrong while registering the user"
        )
      );
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdfee, "student registered Successfully"));
});
export const getFees = asyncHandler(async (req, res) => {
  const fees = await Fee.find(req.query).populate("stdId");
  if (!fees) {
    throw res.status(404).json(new ApiResponse(400, null, "Fees not found"));
  }
  res.status(200).json(new ApiResponse(200, fees, "success"));
});

// delete fees from database
export const deleteFees = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const fees = await Fee.findById(_id);
  if (!fees) {
    throw res.status(404).json(new ApiResponse(400, null, "Fees not found"));
  }
  const deletedfees = await Fee.findByIdAndDelete(_id, { new: true });

  res.status(200).json(new ApiResponse(200, deletedfees, "success"));
});

//edit fees details

export const editFees = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const fees = await Fee.findById(_id);
  if (!fees) {
    throw res.status(404).json(new ApiResponse(400, null, "Fees not found"));
  }
  const deletedfees = await Fee.findByIdAndUpdate(_id, req.body, { new: true });

  res.status(200).json(new ApiResponse(200, deletedfees, "success"));
});
