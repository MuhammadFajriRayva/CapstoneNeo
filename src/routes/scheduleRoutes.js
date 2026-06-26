const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/scheduleController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     tags: [Schedule]
 *     summary: Lihat semua jadwal dokter
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", scheduleController.getAllSchedules);

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     tags: [Schedule]
 *     summary: Lihat semua jadwal dokter
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:id", scheduleController.getScheduleById);

// ADMIN ONLY
/**
 * @swagger
 * /api/schedule:
 *   post:
 *     tags: [Schedule]
 *     security:
 *       - BearerAuth: []
 *     summary: Tambah Jadwal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dokterId, hari, jamMulai, jamSelesai]
 *             properties:
 *               dokterId:
 *                 type: integer
 *                 example: 1
 *               hari:
 *                 type: string
 *                 example: Senin
 *               jamMulai:
 *                 type: string
 *                 example: "08:00"
 *               jamSelesai:
 *                 type: string
 *                 example: "12:00"
 *     responses:
 *       201:
 *         description: Jadwal berhasil ditambahkan.
 *       400:
 *         description: Data tidak valid.
 *       401:
 *         description: Token tidak valid atau belum login.
 *       403:
 *         description: Hanya ADMIN yang boleh mengakses endpoint ini.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.post("/", authenticate, authorize("ADMIN"), scheduleController.createSchedule);

/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     tags: [Schedule]
 *     summary: Mengubah jadwal dokter
 *     description: Hanya ADMIN yang dapat mengubah jadwal dokter.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID jadwal
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dokterId:
 *                 type: integer
 *                 example: 1
 *               hari:
 *                 type: string
 *                 example: Selasa
 *               jamMulai:
 *                 type: string
 *                 example: "09:00"
 *               jamSelesai:
 *                 type: string
 *                 example: "13:00"
 *     responses:
 *       200:
 *         description: Jadwal berhasil diperbarui.
 *       400:
 *         description: Data tidak valid.
 *       401:
 *         description: Token tidak valid.
 *       403:
 *         description: Hanya ADMIN yang dapat mengakses endpoint ini.
 *       404:
 *         description: Jadwal tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.put("/:id", authenticate, authorize("ADMIN"), scheduleController.updateSchedule);

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     tags: [Schedule]
 *     summary: Menghapus jadwal dokter
 *     description: Hanya ADMIN yang dapat menghapus jadwal dokter.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID jadwal
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Jadwal berhasil dihapus.
 *       401:
 *         description: Token tidak valid.
 *       403:
 *         description: Hanya ADMIN yang dapat mengakses endpoint ini.
 *       404:
 *         description: Jadwal tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.delete("/:id", authenticate, authorize("ADMIN"), scheduleController.deleteSchedule);

module.exports = router;