const scheduleRepository = require("../repositories/scheduleRepository");

const scheduleService = {

  async getAllSchedules() {
    return scheduleRepository.findAll();
  },

  async getScheduleById(id) {
    const schedule = await scheduleRepository.findById(id);

    if (!schedule) {
      throw new Error("SCHEDULE_NOT_FOUND");
    }

    return schedule;
  },

  async createSchedule(data) {
    return scheduleRepository.create(data);
  },

  async updateSchedule(id, data) {
    const existing = await scheduleRepository.findById(id);

    if (!existing) {
      throw new Error("SCHEDULE_NOT_FOUND");
    }

    return scheduleRepository.update(id, data);
  },

  async deleteSchedule(id) {
    const existing = await scheduleRepository.findById(id);

    if (!existing) {
      throw new Error("SCHEDULE_NOT_FOUND");
    }

    return scheduleRepository.delete(id);
  },
};

module.exports = scheduleService;