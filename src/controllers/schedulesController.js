const prisma = require("../config/prisma");
const getAllSchedules = async (req, res) => {
 try {
 const schedules = await prisma.schedules.findMany();
 res.status(200).json({
 status: "success",
 data: schedules,
 });
 } catch (error) {
 res.status(500).json({ status: "error", message: error.message });
 }
};
//GET /schedules/:id — Ambil Satu Buku Berdasarkan ID
const getSchedulesById = async (req, res) => {
 try {
 const { id } = req.params;
 const schedules = await prisma.schedules.findUnique({
 where: { id: Number(id) }, // ID dari URL selalu string, konversi ke Number
 });
 if (!schedules) {
 return res.status(404).json({ status: "error", message: "Jadwal tidak ditemukan." });
 }
 res.status(200).json({ status: "success", data: schedules });
 } catch (error) {
 res.status(500).json({ status: "error", message: error.message });
 }
};
//POST /schedules — Tambah Buku Baru
const createSchedules = async (req, res) => {
 try {
 const { name, hari, jamMulai, jamSelesai } = req.body;
 const newSchedules = await prisma.schedules.create({
 data: {
 name,
 hari,
 jamMulai,
 jamSelesai,
 },
 });
 res.status(201).json({ status: "success", data: newSchedules });
 } catch (error) {
 res.status(500).json({ status: "error", message: error.message });
 }
};
//PUT /schedules/:id — Perbarui Data Buku
const updateSchedules = async (req, res) => {
 try {
 const { id } = req.params;
 const { name, hari, jamMulai, jamSelesai } = req.body;
 const updatedSchedules = await prisma.schedules.update({
 where: { id: Number(id) },
 data: { name, hari, jamMulai, jamSelesai },
 });
 res.status(200).json({ status: "success", data: updatedSchedules });
 } catch (error) {
 // Kode P2025 adalah error Prisma saat record tidak ditemukan
 if (error.code === "P2025") {
 return res.status(404).json({ status: "error", message: "Jadwal tidak ditemukan." });
 }
 res.status(500).json({ status: "error", message: error.message });
 }
};
//DELETE /books/:id — Hapus Buku
const deleteSchedules = async (req, res) => {
 try {
 const { id } = req.params;
 await prisma.schedules.delete({
 where: { id: Number(id) },
 });
 res.status(200).json({ status: "success", message: "Jadwal berhasil dihapus." });
 } catch (error) {
 if (error.code === "P2025") {
 return res.status(404).json({ status: "error", message: "Jadwal tidak ditemukan." });
 }
 res.status(500).json({ status: "error", message: error.message });
 }
};
module.exports = { getAllSchedules, getSchedulesById, createSchedules, updateSchedules,
deleteSchedules };