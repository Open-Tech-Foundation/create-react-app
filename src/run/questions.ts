import { Questions } from 'inquirer';

export default (projectName: string): Questions => {
  return [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name: ',
      default: projectName,
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Typescript support(.ts, .tsx)',
      default: true,
    },
    {
      type: 'list',
      name: 'npmClient',
      message: 'Npm client: ',
      choices: ['npm', 'yarn'],
      default: 'yarn',
    },
  ];
};
