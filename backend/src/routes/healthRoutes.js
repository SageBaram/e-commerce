const router = require("express").Router();
const mongoose = require("mongoose");

router.get("/ping", (_, res) => res.status(200).json({ message: "pong" }));
router.get("/mongo", async (_, res) => {
	try {
		await mongoose.connection.db.admin().ping();
		res
			.status(200)
			.json({ status: "Healthy", message: "All systems operational" });
	} catch (error) {
		Logger.error(`Health check failed: ${error}`);
		res
			.status(500)
			.json({ status: "Unhealthy", message: "MongoDB ping failed" });
	}
});

module.exports = router;
