import { consola } from "consola";
import { readFromDatabase, writeToDatabase } from "../filesystem.js";
import type { Project } from "../health.js";

export default async () => {
  console.log();

  consola.info("Loading projects ...");

  /**
   * Render out each project in a list, then parse the JSON string
   * and assign the parsed JSON as a value
   */
  let projects = await readFromDatabase();
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

  // Loop through the selected projects and delete from array
  for (const project of selectedProjects) {
    const index = projects.findIndex(
      (_project) => _project._id === project._id
    );
    delete projects[index];
  }

  // Filter out nullish values in array
  projects = projects.filter((project) => project);

  // Write changes
  await writeToDatabase(projects);

  consola.success(
    `Deleted project${selectedProjects.length > 1 ? "s" : ""} with ID${
      selectedProjects.length > 1 ? "s" : ""
    } [${selectedProjects.map((project) => project._id).join(", ")}]`
  );
};
