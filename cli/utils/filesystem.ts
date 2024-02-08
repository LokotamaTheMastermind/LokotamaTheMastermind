import { ensureFile } from "fs-extra";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import type { Config, Project } from "./health.js";
import { configPath } from "./shared.js";

declare global {
  interface JSON {
    parse<T>(payload: string): T;
  }
}

export async function readConfig() {
  const configAsString = await readFile(configPath).then((buffer) =>
    buffer.toString()
  );

  return JSON.parse<Config>(configAsString);
}

export async function readFromDatabase() {
  const configAsString = await readFile(configPath).then((buffer) =>
    buffer.toString()
  );
  const config = JSON.parse<Config>(configAsString);

  const path = resolve(config.path, config.name);
  const projects = await readFile(path).then((buffer) => buffer.toString());

  return JSON.parse<Project[]>(projects);
}

export async function writeConfig(payload: Config) {
  await writeFile(configPath, JSON.stringify(payload));
}

export async function writeToDatabase(payload: Project[]) {
  const configAsString = await readFile(configPath).then((buffer) =>
    buffer.toString()
  );
  const config = JSON.parse<Config>(configAsString);
  const path = resolve(config.path, config.name);

  await ensureFile(path);
  await writeFile(path, JSON.stringify(payload));
}
