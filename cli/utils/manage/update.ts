import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import select from "@inquirer/select";
import { consola } from "consola";
import { readPortfolio, writePortfolio } from "../filesystem.js";
import { Project } from "../health.js";
import { prompts } from "../shared.js";

export default async () => {
  console.log();

  consola.info("Loading projects ...");

  /**
   * Render out each project in a list, then parse the JSON string
   * assign the parse JSON as a value and sort the array
   */
  const portfolio = await readPortfolio();
  const selectedProjects = await consola
    .prompt("Which project do you want to update?", {
      type: "multiselect",
      options: portfolio.projects.map((project) => ({
        label: project.name,
        value: JSON.stringify(project),
      })),
    })
    .then((projects) =>
      projects
        // @ts-expect-error
        .map((project) => JSON.parse(project) as Project)
        .sort((a, b) => a.name.localeCompare(b.name))
    );

  // Loop through the selected projects with edit options
  for (const project of selectedProjects) {
    console.log();
    consola.info(`Editing ${project.name} (${project._id})\n`);

    // Update choices
    const choice = (await select({
      choices: [
        {
          name: "Project description",
          value: "description",
        },
        { name: "Project name", value: "name" },
        { name: "Project status", value: "status" },
        { name: "Repository details", value: "repository" },
      ],
      message: "What do you want to edit?",
    })) as "description" | "status" | "name" | "repository";

    switch (choice) {
      case "description":
        consola.info(`Current: ${project.description}`);
        project.description = await input({
          message: prompts.projects.description,
        }).then((data) => data || project.description);
        break;

      case "name":
        consola.info(`Current: ${project.name}`);
        project.name = await input({
          message: prompts.projects.name,
        });
        break;

      case "repository":
        const projectHasRepository = await confirm({
          message: prompts.projects.repository.confirm,
        });

        if (projectHasRepository) {
          consola.info(`Current: ${project.repository}`);
          project.repository = await input({
            message: prompts.projects.repository.url,
          });
        } else {
          consola.warn("Removing previously attached repository URL!");

          if (project.repository) delete project["repository"];
        }
        break;

      case "status":
        project.isDraft = await confirm({ message: prompts.projects.isDraft });
    }

    // Get index of current project
    const index = portfolio.projects.findIndex(
      (_project) => _project._id === project._id
    );

    // Override previously saved project information
    portfolio.projects[index] = project;

    // Write changes
    await writePortfolio(portfolio);

    console.log();
    consola.success(`Updated project ${project.name} (${project._id})!`);
  }
};
