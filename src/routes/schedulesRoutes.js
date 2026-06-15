const express = require('express');
const router = express.Router();

// Data sementara
let schedules = [
    { id: 1, nama: 'Ryan', hari: 'Senin', jamMulai: '08:00', jamSelesai: '12:00'},
    { id: 2, nama: 'Georgie', hari: 'Senin', jamMulai: '13:00', jamSelesai: '17:00'},
];
let nextId = 2;

// GET /schedules
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: schedules,
    });
});

// GET /schedules/:id -
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const schedules = schedules.find((b) => b.id === id);
    if (!schedules) {
        return res.status(404).json({ success: false, message: 'Jadwal tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: schedules });
});

// POST /schedules
router.post('/', (req, res) => {
    const { id, nama, hari, jamMulai, jamSelesai } = req.body;
    const newSchedule = { id: nextId++, nama, hari, jamMulai, jamSelesai };
    schedules.push(newSchedule);
    res.status(201).json({ success: true, data: newSchedule });
});

// PUT /schedules/:id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = schedules.findIndex((b) => b.id === id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Jadwal tidak ditemukan' });
    }
    schedules[index] = { id, ...req.body };
    res.status(200).json({ success: true, data: schedules[index] });
});

// DELETE /schedules/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = schedules.findIndex((b) => b.id === id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Jadwal tidak ditemukan' });
    }
    schedules.splice(index, 1);
    res.status(200).json({ success: true, message: 'Jadwal berhasil dihapus' });
});
module.exports = router;