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
  const examResponse = await Exam.create(req.body).populate("Student");
  res.status(404).json(new ApiResponse(201, examResponse, "Success"));
});
export const getExams = asyncHandler(async (req, res) => {});
export const deleteExams = asyncHandler(async (req, res) => {});
export const editExams = asyncHandler(async (req, res) => {});
