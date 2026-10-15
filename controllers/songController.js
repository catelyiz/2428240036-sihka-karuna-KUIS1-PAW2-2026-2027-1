import mongoose from "mongoose";
import Song from "../models/songModel.js";

export const createSong = async (req, res) => {
  try {
    const { judul_lagu, penyanyi, durasi_detik } = req.body;

    if (!judul_lagu || !penyanyi || durasi_detik === undefined) {
      return res.status(400).json({
        success: false,
        message: "Semua field (judul_lagu, penyanyi, durasi_detik) wajib diisi",
      });
    }

    const song = await Song.create({ judul_lagu, penyanyi, durasi_detik });

    res.status(201).json({
      success: true,
      message: "Lagu berhasil ditambahkan",
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan lagu",
      error: error.message,
    });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();

    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data lagu",
      error: error.message,
    });
  }
};

export const getSongById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Lagu tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data lagu",
      error: error.message,
    });
  }
};

export const updateSong = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Lagu tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lagu berhasil diperbarui",
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui data lagu",
      error: error.message,
    });
  }
};

export const deleteSong = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Lagu tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lagu berhasil dihapus",
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menghapus data lagu",
      error: error.message,
    });
  }
};
