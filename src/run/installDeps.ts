import path from 'path';
import execa from 'execa';
import IOptions from './IOptions';

function getDevDeps(options: IOptions) {
  const deps = [
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    'html-webpack-plugin',
    'clean-webpack-plugin',
    'error-overlay-webpack-plugin',
    '@babel/core',
    'babel-loader',
    '@babel/preset-env',
    '@babel/preset-react',
    'style-loader',
    'css-loader',
    'file-loader',
  ];
  if (options.typescript) {
    return deps.concat([
      '@babel/preset-typescript',
      '@types/react',
      '@types/react-dom',
      'tslint',
      'tslint-plugin-prettier',
      'tslint-config-prettier',
    ]);
  }
  return deps;
}

export default async function installDeps(options: IOptions) {
  console.log('Installing packages...');
  const cwd = path.join(process.cwd(), options.projectName);
  const devDeps = getDevDeps(options);
  const devDepsCmd =
    options.npmClient === 'npm' ? `npm install --save-dev` : `yarn add --dev`;
  try {
    await execa(devDepsCmd, devDeps, { cwd, shell: true });
  } catch (error) {
    console.error(error);
  }

  const deps = ['react', 'react-dom'];
  const depsCmd =
    options.npmClient === 'npm' ? `npm install --save` : `yarn add`;
  try {
    await execa(depsCmd, deps, { cwd, shell: true });
  } catch (error) {
    console.error(error);
  }
}
