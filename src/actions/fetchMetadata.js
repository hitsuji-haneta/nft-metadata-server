const { db } = require("../helpers/storage");
const { calcPaddedHex } = require("../helpers/calcPaddedHex");

require("dotenv").config();

const fetchMetadata = async (req, res, next) => {
  try {
    const { id } = req.params;

    // for handling both of <url>/1 and <url>/1.json
    const rawId = id.split(".json")[0];
    const paddedHexId = calcPaddedHex(rawId);


    const ref = db.collection("metadata").doc(paddedHexId);
    const doc = await ref.get();

    if (!doc.exists) throw new Error(`No metadata at ${id}`);

    const metadata = doc.data();
    metadata.image = `${process.env.SERVER_URL}/images/${paddedHexId}.${metadata.extension}`;

    delete metadata.extension;

    res.json(metadata);
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchMetadata };
