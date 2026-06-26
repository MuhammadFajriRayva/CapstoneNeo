const pasienService = require("../services/pasienService");
const { pasienSchema } = require("../validations/pasienValidation");

const pasienController = {
  async createProfile(req, res) {

    const validation = pasienSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal.",
        errors: validation.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    try {

      const result = await pasienService.createProfile(
        req.user.userId,
        validation.data
      );

      return res.status(201).json({
        success: true,
        message: "Profil berhasil dibuat.",
        data: result,
      });

    } catch (error) {

      if (error.message === "PROFILE_ALREADY_EXISTS") {
        return res.status(409).json({
          success: false,
          message: "Profil sudah ada.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server.",
      });
    }
  },

  async getProfile(req, res) {

    try {

      const result = await pasienService.getProfile(
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
          message: "Profil belum dibuat.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server.",
      });
    }
  },

  async updateProfile(req, res) {

    const validation = pasienSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal.",
        errors: validation.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    try {

      const result = await pasienService.updateProfile(
        req.user.userId,
        validation.data
      );

      return res.status(200).json({
        success: true,
        message: "Profil berhasil diupdate.",
        data: result,
      });

    } catch (error) {

      if (error.message === "PROFILE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Profil tidak ditemukan.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server.",
      });
    }
  },
};

module.exports = pasienController;