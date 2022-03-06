const { bucket } = require("../helpers/storage");

const fetchImage = async (req, res, next) => {
  try {
    const { filename } = req.params;

    const contents = await bucket.file(filename).download();
    const type = filename.split(".").slice(-1)[0];

    res.type(type);
    res.send(contents[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchImage };
