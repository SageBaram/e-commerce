const startServer = require("@app/src/server");
const app = require("@app/app");
const Logger = require("@shared/utils/Logger").default;
const { connectDB, closeDB } = require("@services/database");

// Mocking external dependencies
jest.mock("@app/app", () => {
	const http = require("http");
	return {
		use: jest.fn(),
		listen: jest.fn().mockImplementation((port, callback) => {
			callback();
			return http.Server();
		}),
	};
});

jest.mock("@shared/utils/Logger", () => ({
	default: {
		info: jest.fn(),
		warn: jest.fn(),
		error: jest.fn(),
	},
}));

jest.mock("@services/database", () => ({
	closeDB: jest.fn().mockResolvedValue(true),
	connectDB: jest.fn().mockResolvedValue(true),
}));

describe("Run the server", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should start the server in development mode", async () => {
		process.env.NODE_ENV = "development";
		await startServer();
		expect(connectDB).toHaveBeenCalled();
		expect(app.use).toHaveBeenCalled();
		expect(Logger.info).toHaveBeenCalledWith(
			`Server is running on port ${process.env.PORT}`,
		);
	});

	it("should start the server in production mode", async () => {
		process.env.NODE_ENV = "production";
		await startServer();
		expect(connectDB).toHaveBeenCalled();
		expect(Logger.info).toHaveBeenCalledWith(
			`Server is running on port ${process.env.PORT}`,
		);
	});

	it("should handle server start errors", async () => {
		const mockError = new Error("Server Error");
		app.listen.mockImplementationOnce(() => {
			throw mockError;
		});
		await expect(startServer()).rejects.toThrow("Server Error");
		expect(Logger.error).toHaveBeenCalledWith(
			"Failed to start server due to DB connection error: Error: Server Error",
		);
	});

	it("should handle database connection errors", async () => {
		connectDB.mockRejectedValueOnce(new Error("DB Error"));
		await expect(startServer()).rejects.toThrow("DB Error");
		expect(Logger.error).toHaveBeenCalledWith(
			"Failed to start server due to DB connection error: Error: DB Error",
		);
	});
});

describe("Start server in production and resolve SIGTERM", () => {
	let originNodeEnv;
	let mockClose;
	let mockListen;
	let mockProcessOn;

	beforeAll(() => {
		originNodeEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "production";
	});

	afterAll(() => {
		process.env.NODE_ENV = originNodeEnv;
	});

	beforeEach(() => {
		mockClose = jest.fn();
		mockListen = jest.fn();
		mockProcessOn = jest
			.spyOn(process, "on")
			.mockImplementation((event, cb) => { });

		app.listen = mockListen.mockImplementation((port, callback) => {
			callback();
			return { close: mockClose };
		});
	});

	afterEach(() => {
		mockProcessOn.mockRestore();
	});

	it("should start server in production mode and handle SIGTERM", async () => {
		// Mock server.close to manually invoke its callback
		const mockServer = {
			close: jest.fn().mockImplementation((cb) => {
				cb();
			}),
		};
		app.listen.mockReturnValue(mockServer);

		await startServer();

		expect(mockListen).toHaveBeenCalled();

		// Trigger SIGTERM event
		const sigtermHandler = mockProcessOn.mock.calls.find(
			([event]) => event === "SIGTERM",
		)[1];
		sigtermHandler();

		// Ensure server.close was called
		expect(mockServer.close).toHaveBeenCalled();

		// Check the Logger and DB calls
		expect(Logger.warn).toHaveBeenCalledTimes(2);
		expect(Logger.warn).toHaveBeenCalledWith(
			"SIGTERM signal received: closing HTTP server",
		);
		expect(Logger.warn).toHaveBeenCalledWith("HTTP server closed");
		expect(closeDB).toHaveBeenCalled();
		expect(Logger.info).toHaveBeenCalledWith("MongoDB connection closed.\n");
	});
});
