import express from "express";
import {
  createNotes,
  fetchNotesById,
  fetchAllNotes,
  updateNotes,
  deleteNotes,
} from "../controller/notesController.js";

const router = express.Router();

router.get("/", fetchAllNotes);
router.get("/:id", fetchNotesById);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
