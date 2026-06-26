const { z } = require("zod");

const pasienSchema = z.object({

  nik: z
    .string()
    .length(16, "NIK harus terdiri dari 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  tanggalLahir: z
    .string()
    .date("Tanggal lahir tidak valid"),

  alamat: z
    .string()
    .min(5, "Alamat minimal 5 karakter")
    .max(255, "Alamat maksimal 255 karakter"),

  noHP: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .max(15, "Nomor HP maksimal 15 digit")
    .regex(/^\d+$/, "Nomor HP hanya boleh berisi angka")

});

module.exports = {pasienSchema};