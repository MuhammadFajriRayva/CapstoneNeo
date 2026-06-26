// src/repositories/dokterRepository.js

const prisma = require("../config/prisma");

const dokterRepository = {
  async findAll() {
    return prisma.dokter.findMany({
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
    });
  },

  async findById(id) {
    return prisma.dokter.findUnique({
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
      },
    });
  },
};

module.exports = dokterRepository;