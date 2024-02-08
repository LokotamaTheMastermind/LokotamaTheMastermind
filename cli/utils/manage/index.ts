import select from "@inquirer/select";
import createProject from "./create.js";
import deleteProject from "./delete.js";
import listProject from "./list.js";
import updateProject from "./update.js";

export default async () => {
  const choice = (await select({
    message: "What action do you want to perform?",
    choices: [
      {
        name: "Create project",
        value: "create",
      },
      {
        name: "Delete project(s)",
        value: "delete",
      },
      { name: "List projects", value: "list" },
      {
        name: "Update project(s)",
        value: "update",
      },
    ],
  })) as "create" | "delete" | "list" | "update";

  switch (choice) {
    case "create":
      await createProject();
      break;
    case "delete":
      await deleteProject();
      break;
    case "list":
      await listProject();
      break;
    case "update":
      await updateProject();
  }
};
