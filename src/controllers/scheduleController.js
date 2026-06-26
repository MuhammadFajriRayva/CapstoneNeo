const scheduleService = require("../services/scheduleService");

const scheduleController = {

  async getAllSchedules(req, res) {
    try {
      const result = await scheduleService.getAllSchedules();

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

  async getScheduleById(req, res) {
    try {
      const id = Number(req.params.id);

      const result = await scheduleService.getScheduleById(id);

      return res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {

      if (error.message === "SCHEDULE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Jadwal tidak ditemukan",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      });
    }
  },

  async createSchedule(req, res) {
    try {
      const result = await scheduleService.createSchedule(req.body);

      return res.status(201).json({
        success: true,
        data: result,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Gagal membuat jadwal",
      });
    }
  },

  async updateSchedule(req, res) {
    try {
      const id = Number(req.params.id);

      const result = await scheduleService.updateSchedule(id, req.body);

      return res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {

      if (error.message === "SCHEDULE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Jadwal tidak ditemukan",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Gagal update jadwal",
      });
    }
  },

  async deleteSchedule(req, res) {
    try {
      const id = Number(req.params.id);

      await scheduleService.deleteSchedule(id);

      return res.status(200).json({
        success: true,
        message: "Jadwal berhasil dihapus",
      });

    } catch (error) {

      if (error.message === "SCHEDULE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Jadwal tidak ditemukan",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Gagal menghapus jadwal",
      });
    }
  },
};

module.exports = scheduleController;