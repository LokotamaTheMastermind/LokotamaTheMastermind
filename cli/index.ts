import { consola } from "consola";
import meta from "./package.json" assert { type: "json" };
import runHealthCheck from "./utils/health.js";
import manage from "./utils/manage/index.js";

async function main() {
  consola.start(`Using portfolio-cli v${meta.version}`);
  consola.info(meta.description);

  consola.info("Running health check ...");
  await runHealthCheck();

  console.log();

  await manage();
}

main();
