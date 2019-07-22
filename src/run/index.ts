import path from "path";
import inquirer from "inquirer";

import questions from "./questions";
import create from "./create";

import IOptions from "./IOptions";

export default async function run() {
  const projectPath = process.argv.slice(2)[0];
  const projectName: string = path.basename(projectPath);
  const options = (await inquirer.prompt(questions(projectName))) as IOptions;
  console.log(options);
  create(projectPath, options);
}
