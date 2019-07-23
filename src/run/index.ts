import inquirer from 'inquirer';

import questions from './questions';
import create from './create';
import installDeps from './installDeps';
import IOptions from './IOptions';

export default async function run() {
  const projectName: string = process.argv.slice(2)[0];
  const options = (await inquirer.prompt(questions(projectName))) as IOptions;
  await create(options);
  await installDeps(options);
  console.log('Done!');
}
