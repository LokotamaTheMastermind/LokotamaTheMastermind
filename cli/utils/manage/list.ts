import { consola } from "consola";
import { readFromDatabase } from "../filesystem.js";

export default async () => {
  const projects = await readFromDatabase();

  console.log();
  consola.info("Loading projects ...");
  console.table(
    projects.map((project) => ({
      _id: project._id,
      isDraft: project.isDraft,
      name: project.name,
      url: project.url ?? "N/A",
    }))
  );
};
