import { createServer } from "./server";
import { env } from "./config/env.config";

const PORT = parseInt(env.PORT);

const server = createServer().listen(PORT, () => {
  console.log(`🐼 server ready at: http://localhost:${PORT}`);
});

// ensures proper exit code
const exitHandler = () => {
  if (server) {
    // force exit after 5s
    const timeout = setTimeout(() => process.exit(1), 5000);
    server.close(() => {
      clearTimeout(timeout);
      console.log("server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error(error);
  exitHandler();
};

// global error handling
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// graceful shutdown -> prevents requests from being cutoff abruptly
process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
});

// cleaner shutdown in local dev / terminal use
process.on("SIGINT", () => {
  console.info("SIGINT received");
  exitHandler();
});
