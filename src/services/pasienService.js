const pasienRepository = require("../repositories/pasienRepository");

const pasienService = {

  async createProfile(userId, data) {

    const existingProfile = await pasienRepository.findByUserId(userId);

    if (existingProfile) {
      throw new Error("PROFILE_ALREADY_EXISTS");
    }

    return pasienRepository.create({
      user: {
        connect: {
          id: userId,
        },
      },
      nik: data.nik,
      tanggalLahir: new Date(data.tanggalLahir),
      alamat: data.alamat,
      noHP: data.noHP,
    });
  },

  async getProfile(userId) {

    const profile = await pasienRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("PROFILE_NOT_FOUND");
    }

    return profile;
  },

  async updateProfile(userId, data) {

    const profile = await pasienRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("PROFILE_NOT_FOUND");
    }

    return pasienRepository.update(userId, {
      nik: data.nik,
      tanggalLahir: new Date(data.tanggalLahir),
      alamat: data.alamat,
      noHP: data.noHP,
    });
  },

};

module.exports = pasienService;