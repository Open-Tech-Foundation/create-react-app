import path from "path";
import inquirer from "inquirer";

import questions from "./questions";

export async function run() {
  const pathToProject = process.argv.slice(2)[0];
  const projectName: string = path.basename(pathToProject);
  const options = await inquirer.prompt(questions(projectName));
  console.log(options);
}
