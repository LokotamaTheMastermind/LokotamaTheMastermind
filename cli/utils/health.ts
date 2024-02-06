import input from "@inquirer/input";
import { consola } from "consola";
import { existsSync } from "fs";
import { resolve } from "path";
import { readConfig, writeConfig, writePortfolio } from "./filesystem.js";

export interface Config {
  portfolio: { name: string; path: string };
}

export interface Portfolio {
  projects: Project[];
}

export interface Project {
  _id: string;
  description: string;
  isDraft: boolean;
  name: string;
  repository?: string;
}

/**
 * Run the health check before anything else
 */
export default async function () {
  const configPath = resolve(".portfolio-cli.json");
  const isConfigAvailable = existsSync(configPath);
  if (!isConfigAvailable) await _createConfig();

  const config = await readConfig();

  const portfolioPath = resolve(config.portfolio.path, config.portfolio.name);
  const isPortfolioAvailable = existsSync(portfolioPath);

  // Create a new portfolio if it doesn't exist
  if (!isPortfolioAvailable) await writePortfolio({ projects: [] });

  consola.success("Done running health check ...");
}

/**
 * Create a new `.portfolio-cli.json` if it doesn't exist
 */
async function _createConfig() {
  consola.warn("Couldn't find any config ...");

  const portfolio = {
    name: await input({
      default: "_portfolio.json",
      message: "What is the name of the portfolio file?",
    }),
    path: await input({
      default: "assets/",
      message: "Which folder do you want to save your portfolio information?",
    }),
  };

  // Convert absolute path to relative path
  if (portfolio.path.startsWith("/")) {
    consola.warn("Converting absolute path to relative path ...");
    portfolio.path = portfolio.path.slice(1);
  }

  // Finally, write configuration
  await writeConfig({
    portfolio: { name: portfolio.name, path: portfolio.path },
  });

  consola.success(`Created .portfolio-cli.json ...`);
}
