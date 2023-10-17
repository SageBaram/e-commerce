const mongoose = require("mongoose");

const Logger = require("@shared/utils/Logger").default;
const config = require("@config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      retryWrites: true,
      w: "majority",
    });

    if (process.env.NODE_ENV !== "test") {
      Logger.info("Connected successfully to MongoDB!\n");
    }
    return true;
  } catch (error) {
    Logger.error(`Error while connecting to MongoDB ${error}`);
    Logger.error(error.stack);
    return false;
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    Logger.error(`Error while closing MongoDB connection ${error}`);
    Logger.error(error.stack);
  }
};

module.exports = { connectDB, closeDB };
