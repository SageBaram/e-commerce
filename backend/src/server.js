// NOTE: Look at package.json for aliases.
require("module-alias/register");

const app = require("@app/app");

/** Services */
const Logger = require("@shared/utils/Logger").default;
const { connectDB, closeDB } = require("@services/database");

/** Middlewares */
const { loggerMiddleware } = require("@middlewares/loggerMiddleware");

/** Configurations */
const config = require("@config/config");

/** Routes */
const healthRoutes = require("@routes/healthRoutes");
const productRoutes = require("@routes/productRoutes");

async function startServer() {
  let server;

  try {
    // Connect to database
    await connectDB();

    if (process.env.NODE_ENV === "development") {
      /** Development Middlewares */
      app.use(loggerMiddleware);
      /** Development Routes */
      app.use("/api/health", healthRoutes);
    }

    /** Middlewares */

    /** Routes */
    app.use("/api/products", productRoutes);

    /** Graceful shutdown */
    if (process.env.NODE_ENV === "production") {
      server = app.listen(config.port, () =>
        Logger.info(`Server is running on port ${config.port}`),
      );
      process.on("SIGTERM", () => {
        Logger.warn("SIGTERM signal received: closing HTTP server");

        server.close(() => {
          Logger.warn("HTTP server closed");
          closeDB(); // Close the MongoDB Connection
          Logger.info("MongoDB connection closed.\n");
        });
      });
    } else {
      // In non-production environments, just start the server without graceful shutdown
      if (process.env.NODE_ENV !== "test") {
        server = app.listen(config.port, () => {
          Logger.info(`Server is running on port ${config.port}`);
        });
      }
    }

    return app;
  } catch (error) {
    Logger.error(`Failed to start server due to DB connection error: ${error}`);
    throw error;
  }
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = startServer;
