// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// let jadwalDokter = [];
// function tambahJadwal(namaDokter, hari) {
//     const dokter = {
//         id: jadwalDokter.length + 1,
//         namaDokter: namaDokter,
//         hari: hari
//     };
//     jadwalDokter.push(dokter);
//     console.log(`\n Jadwal berhasil di Update`);
// }

// function tampilkanJadwal() {
//     console.log("\n===== JADWAL DOKTER =====");
//     if (jadwalDokter.length === 0) {
//         console.log("Belum ada Jadwal Dokter");
//     } else {
//         jadwalDokter.forEach((dokter) => {
//             console.log(`${dokter.id}. ${dokter.namaDokter} - ${dokter.hari}`);
//         });
//     }
//     console.log("=======================");
// }

// function ambilDataDokter() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Data berhasil dimuat dari server.");
//         }, 1500);
//     });
// }

// async function main() {
//     console.log("===== APLIKASI FASILITAS KESEHATAN =====");
//     const pesan = await ambilDataDokter();
//     console.log(pesan);

//     rl.question("\nMasukkan nama Dokter: ", (namaDokter) => {
//         rl.question("Masukkan Hari: ", (hari) => {
//             tambahJadwal(namaDokter, hari);
//             tampilkanJadwal();
//             rl.close();
//         });
//     });
// }

// main();

const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});