const express = require("express");
const router = express.Router();

const pasienController = require("../controllers/pasienController");
const { authenticate } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/pasien/profile:
 *   post:
 *     tags: [Pasien]
 *     security:
 *       - BearerAuth: []
 *     summary: Lengkapi profil pasien
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nik: "1234567890123456"
 *             tanggalLahir: "2004-05-20"
 *             alamat: "Padang"
 *             noHP: "081234567890"
 *     responses:
 *       201:
 *         description: Profil berhasil dibuat
 */
router.post("/profile", authenticate, pasienController.createProfile);

/**
 * @swagger
 * /api/pasien/profile:
 *   get:
 *     tags: [Pasien]
 *     security:
 *       - BearerAuth: []
 *     summary: Get all pasien
 *     responses:
 *       200:
 *         description: Profil berhasil diambil
 */
router.get("/profile", authenticate, pasienController.getProfile);

/**
 * @swagger
 * /api/pasien/profile:
 *   put:
 *     tags: [Pasien]
 *     security:
 *       - BearerAuth: []
 *     summary: Update pasien
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nik:
 *                 type: string
 *               tanggalLahir:
 *                 type: date
 *               alamat:
 *                 type: string
 *               noHP:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data profil berhasil diupdate
 *       401:
 *         description: Unauthorized
 *       404:
 *             description: Profil tidak ditemukan
 */
router.put("/profile", authenticate, pasienController.updateProfile);

module.exports = router;