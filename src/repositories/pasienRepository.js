// src/repositories/pasienRepository.js

const prisma = require("../config/prisma");

const pasienRepository = {
  async findAll() {
    return prisma.pasien.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
  },

  async findById(id) {
    return prisma.pasien.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        konsultasi: {
          include: {
            jadwal: {
              include: {
                dokter: {
                  include: {
                    user: {
                      select: {
                        name: true,
                        email: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            tanggal: "desc",
          },
        },
      },
    });
  },

  async findByUserId(userId) {
    return prisma.pasien.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        konsultasi: true,
      },
    });
  },

  async create(data) {
    return prisma.pasien.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  async update(id, data) {
    return prisma.pasien.update({
      where: {
        id,
      },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  async delete(id) {
    return prisma.pasien.delete({
      where: {
        id,
      },
    });
  },
};

module.exports = pasienRepository;