import input from "@inquirer/input";
import { consola } from "consola";
import { existsSync } from "fs";
import { resolve } from "path";
import { readConfig, writeConfig, writeToDatabase } from "./filesystem.js";
import { configPath, prompts } from "./shared.js";

export interface Config {
  name: string;
  path: string;
}

export interface Project {
  _id: string;
  description: string;
  isDraft: boolean;
  name: string;
  url?: string;
}

export default async function () {
  const doesConfigExist = existsSync(configPath);
  if (!doesConfigExist) {
    consola.warn("Couldn't find any config!");

    const database = {
      name: await input({
        default: "_database.json",
        message: prompts.healthCheck.name,
      }),
      path: await input({
        default: "assets/",
        message: prompts.healthCheck.path,
      }),
    };
    if (database.path.startsWith("/")) {
      consola.warn("Avoid using absolute paths!");
      database.path = database.path.slice(1);
    }
    await writeConfig({
      name: database.name,
      path: database.path,
    });

    consola.success(`Created .projects-cli.json!`);
  }

  const config = await readConfig();
  const pathToDatabase = resolve(config.path, config.name);
  const doesDatabaseExist = existsSync(pathToDatabase);
  if (!doesDatabaseExist) await writeToDatabase([]);

  consola.success("Done running health check!");
}
