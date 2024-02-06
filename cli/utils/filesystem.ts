import { ensureFile } from "fs-extra";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import type { Config, Portfolio } from "./health.js";

/**
 * Read the configurations in `.portfolio-cli.json`
 *
 *  @returns Config
 */
export async function readConfig() {
  const buffer = await readFile(resolve(".portfolio-cli.json"));
  return JSON.parse(buffer.toString()) as Config;
}

/**
 * Get portfolio data
 *
 * @returns Portfolio
 */
export async function readPortfolio() {
  const config = await readConfig();

  const buffer = await readFile(
    resolve(config.portfolio.path, config.portfolio.name)
  );
  return JSON.parse(buffer.toString()) as Portfolio;
}

/**
 * Write changes to the configurations
 * in `.portfolio-cli.json`
 *
 * @param payload What to override current state with?
 */
export async function writeConfig(payload: Config) {
  await writeFile(resolve(".portfolio-cli.json"), JSON.stringify(payload));
}

/**
 * Write portfolio data
 *
 * @param payload What to override current state with?
 */
export async function writePortfolio(payload: Portfolio) {
  const config = await readConfig();
  const path = resolve(config.portfolio.path, config.portfolio.name);

  // Ensure portfolio already exists
  await ensureFile(path);

  // Update portfolio
  await writeFile(path, JSON.stringify(payload));
}
