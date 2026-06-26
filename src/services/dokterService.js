const dokterRepository = require("../repositories/dokterRepository");

const dokterService = {

  async getAllDokter() {
    return dokterRepository.findAll();
  },

  async getDokterById(id) {
    const dokter = await dokterRepository.findById(id);

    if (!dokter) {
      throw new Error("DOKTER_NOT_FOUND");
    }

    return dokter;
  },
};

module.exports = dokterService;