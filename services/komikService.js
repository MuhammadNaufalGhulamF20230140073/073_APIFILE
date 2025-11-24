async function createKomik(database, komikData) {
  const { title, description, author, imagetype, imagename, ImageData } =
    komikData;

  if (!title || !description || !author) {
    throw new Error("Title, description, and author WAJIB DI ISI");
  }

  const newKomik = await database.Komik.create({
    title,
    description,
    author,
    imagetype: imagetype || null,
    imagename: imagename || null,
    ImageData: ImageData || null,
  });

  return newKomik;
}

async function getAllKomik(database) {
  const komiks = await database.Komik.findAll();

  return komiks.map((k) => {
    const komik = k.toJSON();
    if (komik.ImageData) {
      komik.ImageData = komik.ImageData.toString("base64");
    }
    return komik;
  });
}

async function getKomikById(database, id) {
  const komik = await database.Komik.findByPk(id);
  if (!komik) throw new Error("Komik TIDAK DITEMUKAN");

  const result = komik.toJSON();
  if (result.ImageData) {
    result.ImageData = result.ImageData.toString("base64");
  }
  return result;
}

async function updateKomik(database, id, komikData) {
  const komik = await database.Komik.findByPk(id);
  if (!komik) {
    throw new Error(`Komik dengan id ${id} TIDAK DITEMUKAN`);
  }

  await komik.update({
    title: komikData.title || komik.title,
    description: komikData.description || komik.description,
    author: komikData.author || komik.author,
    imagetype: komikData.imagetype ?? komik.imagetype,
    imagename: komikData.imagename ?? komik.imagename,
    ImageData: komikData.ImageData ?? komik.ImageData,
  });

  return komik;
}

async function deleteKomik(database, id) {
  const komik = await database.Komik.findByPk(id);
  if (!komik) {
    throw new Error(`Komik dengan id ${id} TIDAK DITEMUKAN`);
  }

  await komik.destroy();
  return { message: `Komik dengan id ${id} BERHASIL DIHAPUS` };
}

module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};
