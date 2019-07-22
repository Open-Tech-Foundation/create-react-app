import path from 'path';
import inquirer from 'inquirer';

import questions from './questions';
import create from './create';

export default async function run() {
  const projectPath = process.argv.slice(2)[0];
  const projectName: string = path.basename(projectPath);
  const options = await inquirer.prompt(questions(projectName));
  create(projectPath, options);
}
