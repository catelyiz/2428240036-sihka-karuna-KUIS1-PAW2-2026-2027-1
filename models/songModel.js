import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    judul_lagu: {
      type: String,
      required: [true, "Judul lagu wajib diisi"],
    },
    penyanyi: {
      type: String,
      required: [true, "Penyanyi wajib diisi"],
    },
    durasi_detik: {
      type: Number,
      required: [true, "Durasi (detik) wajib diisi"],
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema, "songs");

export default Song;
