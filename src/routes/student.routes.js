import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteStudent,
  getAllStudents,
  getOneStudent,
  registerStudent,
  updateProfile,
  updateStudent,
} from "../controllers/students.controller.js";

const router = Router();
router
  .route("/students")
  .post(
    upload.fields([
      {
        name: "photo",
        maxCount: 1,
      },
    ]),
    registerStudent
  )
  .get(getAllStudents);
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
export default router;
