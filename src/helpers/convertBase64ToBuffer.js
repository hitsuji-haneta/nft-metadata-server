const mimeTypes = require("mimetypes");

const convertBase64ToBuffer = (data) => {
  const mimeType = data.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
  const extension = mimeTypes.detectExtension(mimeType);
  const withoutPrefix = data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(withoutPrefix, "base64");

  return {
    buffer,
    mimeType,
    extension,
  };
};

module.exports = { convertBase64ToBuffer };
