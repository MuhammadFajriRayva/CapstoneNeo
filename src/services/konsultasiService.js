const konsultasiRepository = require("../repositories/konsultasiRepository");
const prisma = require("../config/prisma");

const konsultasiService = {

  async createKonsultasi(userId, data) {

    // 1. Cari pasien berdasarkan user login
    const pasien = await prisma.pasien.findUnique({
      where: { userId },
    });

    if (!pasien) {
      throw new Error("PROFILE_NOT_FOUND");
    }

    // 2. Validasi jadwal
    const jadwal = await prisma.schedules.findUnique({
      where: { id: data.jadwalId },
    });

    if (!jadwal) {
      throw new Error("SCHEDULE_NOT_FOUND");
    }

    // 3. Buat konsultasi
    return konsultasiRepository.create({
      pasienId: pasien.id,
      jadwalId: data.jadwalId,
      tanggal: new Date(data.tanggal),
      keluhan: data.keluhan,
      status: "Menunggu",
    });
  },

  async getAllKonsultasi(userId) {

    const pasien = await prisma.pasien.findUnique({
      where: { userId },
    });

    if (!pasien) {
      throw new Error("PROFILE_NOT_FOUND");
    }

    return konsultasiRepository.findAllByPasienId(pasien.id);
  },

  async getKonsultasiById(userId, id) {

    const pasien = await prisma.pasien.findUnique({
      where: { userId },
    });

    if (!pasien) {
      throw new Error("PROFILE_NOT_FOUND");
    }

    const konsultasi = await konsultasiRepository.findById(id);

    if (!konsultasi || konsultasi.pasienId !== pasien.id) {
      throw new Error("KONSULTASI_NOT_FOUND");
    }

    return konsultasi;
  },

  async updateStatusKonsultasi(id, status) {

    const konsultasi = await prisma.konsultasi.findUnique({
      where: { id },
    });

    if (!konsultasi) {
      throw new Error("KONSULTASI_NOT_FOUND");
    }

    const allowedStatus = [
      "Menunggu",
      "Dikonfirmasi",
      "Selesai",
      "Dibatalkan",
    ];

    if (!allowedStatus.includes(status)) {
      throw new Error("INVALID_STATUS");
    }

    return konsultasiRepository.updateStatus(id, status);
  },
};

module.exports = konsultasiService;