import { Router } from "express";
//controllers
import {
  getAllResults,
  createNewResult,
  getResult,
  updateResult,
  deleteResult,
} from "../controllers/resultController";

const router = Router();

router.get("/", getAllResults);
router.post("/", createNewResult);
router.get("/:id", getResult);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);

export default router;
