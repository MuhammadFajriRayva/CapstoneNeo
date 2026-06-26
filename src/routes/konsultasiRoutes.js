const express = require("express");
const router = express.Router();

const konsultasiController = require("../controllers/konsultasiController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/konsultasi:
 *   post:
 *     tags: [Konsultasi]
 *     security:
 *       - BearerAuth: []
 *     summary: Booking konsultasi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             jadwalId: 1
 *             tanggal: "2026-06-30T09:00:00Z"
 *             keluhan: "Sakit kepala"
 *     responses:
 *       201:
 *         description: Konsultasi berhasil dibuat
 */
router.post("/", authenticate, authorize("PASIEN"), konsultasiController.create);

/**
 * @swagger
 * /api/konsultasi:
 *   get:
 *     tags: [Konsultasi]
 *     security:
 *       - BearerAuth: []
 *     summary: Get all konsultasi
 */
router.get("/", authenticate, authorize("PASIEN"), konsultasiController.getAll);

/**
 * @swagger
 * /api/konsultasi/{id}:
 *   get:
 *     tags: [Konsultasi]
 *     security:
 *       - BearerAuth: []
 *     summary: Get konsultasi by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *         200:
 *             description: Detail Konsultasi dapat dilihat
 */
router.get("/:id", authenticate, authorize("PASIEN"), konsultasiController.getById);

/**
 * @swagger
 * /api/Konsultasi/{id}:
 *   patch:
 *     tags: [Konsultasi]
 *     security:
 *       - BearerAuth: []
 *     summary: Update Konsultasi
 *     parameters:
 *       - in: path
 *         name: id
 *           required: true
 *           schema:
 *               type: integer
 *               example: 1
 */
router.patch("/:id/status", authenticate, authorize("ADMIN", "DOKTER"), konsultasiController.updateStatus);

module.exports = router;