const prisma = require("../config/prisma");

const scheduleRepository = {
  async findAll() {
    return prisma.schedule.findMany({
      include: {
        dokter: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          hari: "asc",
        },
        {
          jamMulai: "asc",
        },
      ],
    });
  },

  async findById(id) {
    return prisma.schedule.findUnique({
      where: {
        id,
      },
      include: {
        dokter: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  },

  async findByDokterId(dokterId) {
    return prisma.schedule.findMany({
      where: {
        dokterId,
      },
      include: {
        dokter: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        jamMulai: "asc",
      },
    });
  },

  async create(data) {
    return prisma.schedule.create({
      data,
      include: {
        dokter: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  },

  async update(id, data) {
    return prisma.schedule.update({
      where: {
        id,
      },
      data,
      include: {
        dokter: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  },

  async delete(id) {
    return prisma.schedule.delete({
      where: {
        id,
      },
    });
  },
};

module.exports = scheduleRepository;