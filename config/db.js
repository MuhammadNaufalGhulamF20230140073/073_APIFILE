const db = require("../models");

async function connectDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log("KONEKSI DATABASE BERHASIL");

    await db.sequelize.sync([{ alter: true }]);
    console.log("SINKRONISASI DATABASE BERHASIL");
  } catch (error) {
    console.error("KONEKSI DATABASE GAGAL:", error.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
