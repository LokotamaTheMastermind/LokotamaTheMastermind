import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import { consola } from "consola";
import { nanoid } from "nanoid";
import { readPortfolio, writePortfolio } from "../filesystem.js";
import type { Project } from "../health.js";
import { prompts } from "../shared.js";

export default async () => {
  console.log();

  const isCreatingMoreThanOne = await confirm({
    message: "Are you creating more than one project?",
  });

  if (isCreatingMoreThanOne) {
    const repetitions = Number(
      await input({ message: "How many projects are you creating?" })
    );

    for (let index = 0; index < repetitions; index++) {
      console.log();
      await main();
    }
  } else {
    consola.info("Creating project ...");

    await main();
  }
};

async function main() {
  const project: Project = {
    _id: nanoid(16),
    name: await input({ message: prompts.projects.name }),
    description: await input({
      message: prompts.projects.description,
    }),
    isDraft: await confirm({ message: prompts.projects.isDraft }),
  };

  const projectHasRepository = await confirm({
    message: prompts.projects.repository.confirm,
  });
  if (projectHasRepository)
    project.repository = await input({
      message: prompts.projects.repository.url,
    });

  const portfolio = await readPortfolio();
  portfolio.projects.push(project);

  portfolio.projects = portfolio.projects.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  await writePortfolio(portfolio);

  console.log();
  consola.success(
    `Added project ${project.name} (${project._id}) to your portfolio!`
  );
}
