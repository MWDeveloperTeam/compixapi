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

const router = Router();
router.route("/students").post(registerStudent).get(getAllStudents);
router
  .route("/students/:id")
  .get(getOneStudent)
  .delete(deleteStudent)
  .patch(updateStudent);
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
