const express = require('express');
const {authenticate }= require("../middlewares/authMiddleware");
const { 
    getAllSchedules,
    getSchedulesById,
    createSchedules,
    updateSchedules,
    deleteSchedules,
} = require("../controllers/schedulesController");
const router = express.Router();

// GET /schedules - Ambil semua jadwal
/**
* @swagger
* /api/schedules:
*   get:
*       tags: [Schedules]
*       summary: Lihat semua jadwal (publik)
*       responses:
*           200:
*               description: Daftar jadwal berhasil diambil
*/
router.get("/", getAllSchedules);

// GET /schedules/:id - Ambil satu jadwal
/**
* @swagger
* /api/schedules/{id}:
*   get:
*       tags: [Schedules]
*       summary: Lihat detail jadwal (publik)
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*               type: integer
*           example: 1
*       responses:
*           200:
*               description: Detail jadwal berhasil diambil
*           404:
*               description: Jadwal tidak ditemukan
*/
router.get("/:id", getSchedulesById);

// POST /schedules - Tambah jadwal baru
/**
* @swagger
* /api/schedules:
*   post:
*       tags: [Schedules]
*       summary: Tambah jadwal baru (perlu login)
*       security:
*         - BearerAuth: []
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       required: [name, hari, jamMulai, jamSelesai]
*                       properties:
*                           name:
*                               type: string
*                               example: John
*                           hari:
*                               type: string
*                               example: Senin
*                           jamMulai:
*                               type: string
*                               example: 08:00
*                           jamSelesai:
*                               type: string
*                               example: 15:00
*       responses:
*           201:
*               description: Jadwal berhasil ditambahkan
*           400:
*               description: Validasi gagal
*           401:
*               description: Unauthorized
*/
router.post("/", authenticate, createSchedules);

// PUT /schedules/:id - Perbarui jadwal
/**
* @swagger
* /api/schedules/{id}:
*   put:
*       tags: [Schedules]
*       summary: Update jadwal (perlu login)
*       security:
*         - BearerAuth: []
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*               type: integer
*           example: 1
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           name:
*                               type: string
*                           hari:
*                               type: string
*                           jamMulai:
*                               type: string
*                           jamSelesai:
*                               type: string
*       responses:
*           200:
*               description: Jadwalberhasil diupdate
*           401:
*               description: Unauthorized
*           404:
*               description: Jadwal tidak ditemukan
*/
router.put("/:id", authenticate, updateSchedules);

// DELETE /schedules/:id - Hapus Jadwal
/**
* @swagger
* /api/schedules/{id}:
*   delete:
*       tags: [Schedules]
*       summary: Hapus jadwal (perlu login)
*       security:
*         - BearerAuth: []
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*               type: integer
*           example: 1
*       responses:
*           200:
*               description: Jadwal berhasil dihapus
*           401:
*               description: Unauthorized
*           404:
*               description: Jadwal tidak ditemukan
*/
router.delete("/:id", authenticate, deleteSchedules);

module.exports = router;
