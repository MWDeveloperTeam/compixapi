import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteStudent,
  getAllStudents,
  getOneStudent,
  registerStudent,
  updateProfile,
  updateStudent,
  addExamTaken,
  deleteExamTaken,
} from "../controllers/students.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router
  .route("/students")
  .post(verifyJWT, registerStudent)
  .get(verifyJWT, getAllStudents);
router
  .route("/students/:id")
  .get(verifyJWT, getOneStudent)
  .delete(verifyJWT, deleteStudent)
  .patch(verifyJWT, updateStudent);
router.route("/students/upload/:id").patch(
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  updateProfile
);

router.route("/examTaken").post(addExamTaken).delete(deleteExamTaken);

// router
//   .route("/students/academicdetails/:id")
//   .post(addAcademicDetails)
//   .delete(deleteAcadamicDetails);

export default router;
