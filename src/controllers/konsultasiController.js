const konsultasiService = require("../services/konsultasiService");
const { z } = require("zod");

// VALIDASI sederhana
const konsultasiSchema = z.object({
  jadwalId: z.number(),
  tanggal: z.string(),
  keluhan: z.string().min(5),
});

const konsultasiController = {

  async create(req, res) {

    const validation = konsultasiSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.issues,
      });
    }

    try {

      const result = await konsultasiService.createKonsultasi(
        req.user.userId,
        validation.data
      );

      return res.status(201).json({
        success: true,
        data: result,
      });

    } catch (error) {

      if (error.message === "PROFILE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Lengkapi profil terlebih dahulu",
        });
      }

      if (error.message === "SCHEDULE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Jadwal tidak ditemukan",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  async getAll(req, res) {

    try {

      const result = await konsultasiService.getAllKonsultasi(
        req.user.userId
      );

      return res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {

      if (error.message === "PROFILE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Profil belum dibuat",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  async getById(req, res) {

    try {

      const result = await konsultasiService.getKonsultasiById(
        req.user.userId,
        Number(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {

      if (error.message === "KONSULTASI_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Konsultasi tidak ditemukan",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  async updateStatus(req, res) {
  try {
    const { status } = req.body;
    const id = Number(req.params.id);

    const result = await konsultasiService.updateStatusKonsultasi(
      id,
      status
    );

    return res.status(200).json({
      success: true,
      message: "Status berhasil diupdate",
      data: result,
    });

  } catch (error) {

    if (error.message === "KONSULTASI_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Konsultasi tidak ditemukan",
      });
    }

    if (error.message === "INVALID_STATUS") {
      return res.status(400).json({
        success: false,
        message: "Status tidak valid",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
};

module.exports = konsultasiController;