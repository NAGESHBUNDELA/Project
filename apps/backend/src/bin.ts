import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
const numCPUs = availableParallelism();
if (cluster.isPrimary) {
  console.log(`[Primary ${process.pid}] Starting ${numCPUs} workers...`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `[Primary] Worker ${worker.process.pid} exited (code: ${code}, signal: ${signal}). Restarting...`
    );
    cluster.fork();
  });
} else {
  // Each worker imports and boots the Express app
  import("./index.js");
  console.log(`[Worker ${process.pid}] Started`);
}