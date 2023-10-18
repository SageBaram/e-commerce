const mongoose = require("mongoose");
const Logger = require("@shared/utils/Logger").default;
const { connectDB, closeDB } = require("@services/database"); // Adjust the path as needed

// Mocking external dependencies
jest.mock("mongoose", () => ({
	connect: jest.fn(),
	connection: {
		close: jest.fn(),
	},
}));

jest.mock("@shared/utils/Logger", () => ({
	default: {
		info: jest.fn(),
		error: jest.fn(),
	},
}));

describe("Database Service", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("connectDB", () => {
		it("should successfully connect to the database", async () => {
			mongoose.connect.mockResolvedValue(true);

			const result = await connectDB();

			expect(result).toBe(true);
		});

		it("should fail to connect to the database", async () => {
			mongoose.connect.mockRejectedValue(new Error("Connection Error"));

			const result = await connectDB();

			expect(result).toBe(false);
			expect(Logger.error).toHaveBeenCalled();
		});
	});

	describe("closeDB", () => {
		it("should successfully close the database connection", async () => {
			mongoose.connection.close.mockResolvedValue(true);

			await closeDB();

			expect(mongoose.connection.close).toHaveBeenCalled();
		});

		it("should fail to close the database connection", async () => {
			mongoose.connection.close.mockRejectedValue(new Error("Close Error"));

			await closeDB();

			expect(Logger.error).toHaveBeenCalled();
		});
	});
});
