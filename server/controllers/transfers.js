const fs = require("fs").promises;

//This code should be moved to models/transfers, so just models deals with files
const getTransferById = async (id) => {
  const data = await fs.readFile("./server/db/transfers.json", "utf8");
  obj = JSON.parse(data); //convert file data to
  transfer = obj.find((element) => element.id === id);
  return transfer;
};

module.exports = {
  getTransferById,
};
