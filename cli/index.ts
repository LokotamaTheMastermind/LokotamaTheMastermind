import { consola } from "consola";
import runHealthCheck from "./utils/health.js";
import manage from "./utils/manage/index.js";

(async () => {
  consola.start("Starting database");

  consola.info("Running health check ...");
  await runHealthCheck();

  console.log();
  await manage();
})();
