import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import select from "@inquirer/select";
import { consola } from "consola";
import { readFromDatabase, writeToDatabase } from "../filesystem.js";
import { Project } from "../health.js";
import { prompts } from "../shared.js";

export default async () => {
  console.log();

  consola.info("Loading projects ...");
  const projects = await readFromDatabase();
  const selectedProjects = await consola
    .prompt("Which project do you want to update?", {
      type: "multiselect",
      options: projects.map((project) => ({
        label: project.name,
        value: JSON.stringify(project),
      })),
    })
    .then((projects) =>
      projects
        // @ts-expect-error
        .map((project) => JSON.parse(project) as Project)
    );

  console.log(selectedProjects);

  // Loop through the selected projects with edit options
  for (const project of selectedProjects) {
    console.log();
    consola.info(`Editing ${project.name} (${project._id}) ...\n`);

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
          consola.info(`Current: ${project.url}`);
          project.url = await input({
            message: prompts.projects.repository.url,
          });
        } else {
          consola.warn("Removing previously attached repository URL!");

          if (project.url) delete project["repository"];
        }
        break;

      case "status":
        project.isDraft = await confirm({ message: prompts.projects.isDraft });
    }

    // Get index of current project
    const projectIndex = projects.findIndex(
      (_project) => _project._id === project._id
    );

    // Override previously saved project information
    projects[projectIndex] = project;

    // Write changes
    await writeToDatabase(projects);

    console.log();
    consola.success(`Updated project ${project.name} (${project._id})!`);
  }
};
