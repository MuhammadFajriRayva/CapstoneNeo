const express = require("express");
const router = express.Router();

const dokterController = require("../controllers/dokterController");

/**
 * @swagger
 * /api/dokter:
 *   get:
 *     tags: [Dokter]
 *     summary: Lihat semua dokter
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", dokterController.getAllDokter);

/**
 * @swagger
 * /api/dokter/{id}:
 *   get:
 *     tags: [Dokter]
 *     summary: Lihat satu dokter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:id", dokterController.getDokterById);

module.exports = router;