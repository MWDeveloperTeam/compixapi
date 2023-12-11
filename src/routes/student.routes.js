import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteStudent, getAllStudents, getOneStudent, registerStudent } from "../controllers/students.controller.js";

const router = Router();
router.route("/students").post(
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    }
  ]),
  registerStudent
).get(getAllStudents);
router.route("/students/:id").delete(deleteStudent).patch().get(getOneStudent)

export default router;