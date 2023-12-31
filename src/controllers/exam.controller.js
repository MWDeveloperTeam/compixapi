import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Fee } from "../models/fees.model.js";
import { Student } from "../models/students.model.js";
import { Exam } from "../models/exam.model.js";

export const createExams = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const foundStudent = await Student.findById({ _id: req.body.stdId });
  if (!foundStudent) {
    throw res.status(404).json(new ApiResponse(404, null, "Student not found"));
  }
  const examResponse = await Exam.create(req.body);
  res.status(201).json(new ApiResponse(201, examResponse, "Success"));
});
export const getExams = asyncHandler(async (req, res) => {
  const getExam = await Exam.find(req.query).populate("stdId");
  if (!getExam) {
    throw res.status(404).json(new ApiResponse(404, null, "Student not found"));
  }
  res.status(201).json(new ApiResponse(201, getExam, "Success"));
});
export const deleteExams = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const deletedExam = await Exam.findByIdAndDelete({ _id });
  if (!deletedExam) {
    throw res.status(404).json(new ApiResponse(404, null, "exam not found"));
  }
  res.status(201).json(new ApiResponse(201, deletedExam, "Success"));
});
export const editExams = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, null, "cannot change exam details"));
});
