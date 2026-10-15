import express from "express";
import {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";

const router = express.Router();

router.route("/").get(getAllSongs).post(createSong);

router.route("/:id").get(getSongById).put(updateSong).delete(deleteSong);

export default router;
