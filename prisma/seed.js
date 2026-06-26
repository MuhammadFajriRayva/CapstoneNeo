const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@gmail.com",
      password,
      role: "ADMIN",
    },
  });

  const dokterUser = await prisma.user.create({
    data: {
      name: "Dr. Andi",
      email: "dokter@gmail.com",
      password,
      role: "DOKTER",
    },
  });
  const dokter = await prisma.dokter.create({
    data: {
      userId: dokterUser.id,
      noHP: "081234567890",
      spesialis: "Dokter Umum",
    },
  });
  await prisma.schedule.createMany({
    data: [
      {
        dokterId: dokter.id,
        hari: "Senin",
        jamMulai: "08:00",
        jamSelesai: "12:00",
      },
      {
        dokterId: dokter.id,
        hari: "Rabu",
        jamMulai: "09:00",
        jamSelesai: "13:00",
      },
      {
        dokterId: dokter.id,
        hari: "Jumat",
        jamMulai: "08:00",
        jamSelesai: "11:00",
      },
    ],
  });

  const pasienUser = await prisma.user.create({
    data: {
      name: "Budi",
      email: "pasien@gmail.com",
      password,
      role: "PASIEN",
    },
  });
  await prisma.pasien.create({
    data: {
      userId: pasienUser.id,
      nik: "1234567890123456",
      tanggalLahir: new Date("2002-08-15"),
      alamat: "Padang",
      noHP: "081298765432",
    },
  });

  console.log("================================");
  console.log("Seed berhasil dijalankan");
  console.log("================================");

  console.log("Admin");
  console.log("Email    : admin@gmail.com");
  console.log("Password : password123");

  console.log("");

  console.log("Dokter");
  console.log("Email    : dokter@gmail.com");
  console.log("Password : password123");

  console.log("");

  console.log("Pasien");
  console.log("Email    : pasien@gmail.com");
  console.log("Password : password123");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });