import { resolve } from "path";

export const prompts = {
  healthCheck: {
    name: "What is the name of the portfolio file?",
    path: "Which folder do you want to save your portfolio information?",
  },
  projects: {
    description: "What is the description of the project?",
    isDraft: "Is this project still in progress?",
    name: "What is the name of the project?",
    repository: {
      confirm: "Does this project have a repository?",
      url: "What is the URL?",
    },
    website: {
      confirm: "Does this project have a website?",
      url: "What is the URL?",
    },
  },
};

export const configPath = resolve(".projects-cli.json");
