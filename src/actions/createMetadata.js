const { db, bucket } = require("../helpers/storage");
const { convertBase64ToBuffer } = require("../helpers/convertBase64ToBuffer");
const { calcPaddedHex } = require("../helpers/calcPaddedHex");

require("dotenv").config();

const createMetadata = async (req, res, next) => {
  try {
    const { id, metadata, image, secret } = req.body;
    if (secret !== process.env.SECRET) throw new Error("wrong secret");

    const { buffer, mimeType, extension } = convertBase64ToBuffer(image);

    const hexId = calcPaddedHex(id);
    await uploadImage(`${hexId}.${extension}`, buffer, mimeType);
    const docRef = db.collection("metadata").doc(hexId);
    metadata.extension = extension;
    await docRef.set(metadata);

    res.send(`metadata ${id} was created.`);
  } catch (err) {
    next(err);
  }
};

const uploadImage = async (filename, buffer, mimeType) => {
  const file = bucket.file(filename);
  await file.save(buffer);
  await file.setMetadata({ contentType: mimeType });
};

module.exports = { createMetadata };
