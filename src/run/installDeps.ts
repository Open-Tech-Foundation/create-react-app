import execa from 'execa';

export default async function installDeps(
  projectPath: string,
  npmClient: string
) {
  console.log('Installing npm packages...')
  const devDeps = [
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    'html-webpack-plugin',
    'clean-webpack-plugin',
    '@babel/core',
    'babel-loader',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    'style-loader',
    'css-loader',
    'file-loader',
  ];
  const devDepsCmd = npmClient === 'npm' ? `npm install --save-dev` : `yarn add --dev`;
  try {
    await execa(devDepsCmd, devDeps, { cwd: projectPath, shell: true });
  } catch (error) {
    console.error(error);
  }
  
  const deps = ['react', 'react-dom']
  const depsCmd = npmClient === 'npm' ? `npm install --save` : `yarn add`;
  try {
    await execa(depsCmd, deps, { cwd: projectPath, shell: true });
  } catch (error) {
    console.error(error);
  }
}
