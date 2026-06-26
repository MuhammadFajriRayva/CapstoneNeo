const prisma = require("../config/prisma");

const konsultasiRepository = {
  async findAll() {
    return prisma.konsultasi.findMany({
      include: {
        pasien: {
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
        jadwal: {
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
        },
      },
      orderBy: {
        tanggal: "desc",
      },
    });
  },

  async findById(id) {
    return prisma.konsultasi.findUnique({
      where: {
        id,
      },
      include: {
        pasien: {
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
        jadwal: {
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
        },
      },
    });
  },

  async findByPasienId(pasienId) {
    return prisma.konsultasi.findMany({
      where: {
        pasienId,
      },
      include: {
        jadwal: {
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
        },
      },
      orderBy: {
        tanggal: "desc",
      },
    });
  },

  async findByDokterId(dokterId) {
    return prisma.konsultasi.findMany({
      where: {
        jadwal: {
          dokterId,
        },
      },
      include: {
        pasien: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        jadwal: true,
      },
      orderBy: {
        tanggal: "desc",
      },
    });
  },

  async create(data) {
    return prisma.konsultasi.create({
      data,
      include: {
        pasien: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        jadwal: {
          include: {
            dokter: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  async updateStatus(id, status) {
    return prisma.konsultasi.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        pasien: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        jadwal: {
          include: {
            dokter: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  async delete(id) {
    return prisma.konsultasi.delete({
      where: {
        id,
      },
    });
  },
};

module.exports = konsultasiRepository;