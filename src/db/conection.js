const mongoose = require("mongoose");

async function dbConnection() {
  return mongoose.connect(process.env.MONGO_URL, { dbName: "db-goit" });
}

module.exports = {
  dbConnection,
};
