const isValid = (id) => !isNaN(id) || id.length === 64;

const calcPaddedHex = (id) => {
  if (!isValid(id)) {
    throw new Error(
      "[calcPaddedHex] ID must be a number or 64 digit hex string"
    );
  }

  return (
    "0000000000000000000000000000000000000000000000000000000000000000" +
    id.toString(16)
  ).substr(-64);
};

module.exports = { calcPaddedHex };
