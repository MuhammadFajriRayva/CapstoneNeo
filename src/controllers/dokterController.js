const dokterService = require("../services/dokterService");

const dokterController = {

  async getAllDokter(req, res) {
    try {
      const result = await dokterService.getAllDokter();

      return res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      });
    }
  },

  async getDokterById(req, res) {
    try {
      const id = Number(req.params.id);

      const result = await dokterService.getDokterById(id);

      return res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {

      if (error.message === "DOKTER_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Dokter tidak ditemukan",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      });
    }
  },
};

module.exports = dokterController;