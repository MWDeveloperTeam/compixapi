import { Router } from "express";
import {
  addFees,
  getFees,
  deleteFees,
  editFees,
} from "../controllers/fees.controller.js";

const router = Router();

router.route("/fees").get(getFees).post(addFees);
router.route("/fees/:id").delete(deleteFees).patch(editFees);

export default router;
