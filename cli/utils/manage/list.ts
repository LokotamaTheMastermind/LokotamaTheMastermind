import { consola } from "consola";
import { readPortfolio } from "../filesystem.js";

export default async () => {
  const portfolio = await readPortfolio();

  console.log();
  consola.info("Loading projects ...");
  console.table(
    portfolio.projects.map((project) => ({
      _id: project._id,
      name: project.name,
      isDraft: project.isDraft,
    }))
  );
};
