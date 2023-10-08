const dotenv = require("dotenv");
dotenv.config({ path: "@root/.env" });

/** MongoDB URI setup */
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || "";
const MONGO_DRIVER_ID = process.env.MONGO_DRIVER_ID || "";

const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.${MONGO_DRIVER_ID}.mongodb.net/e-commerce`;

/** Server settings */
const PORT = process.env.PORT;

module.exports = {
	mongoURI: MONGO_URI,
	port: PORT,
};
