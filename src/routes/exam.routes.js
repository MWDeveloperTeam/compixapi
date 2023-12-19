import { Router } from "express";
import {
  getExams,
  createExams,
  deleteExams,
  editExams,
} from "../controllers/exam.controller.js";

const router = Router();

router.route("/exam").get(getExams).post(createExams);
router.route("/exam/:id").delete(deleteExams).patch(editExams);

export default router;
