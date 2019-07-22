import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import globby from 'globby';
import ejs from 'ejs';

import IOptions from './IOptions';

export default async function create(projectPath: string, options: IOptions) {
  mkdirp.sync(projectPath);
  const templatesPath = path.join(__dirname, 'templates');
  const paths = globby.sync('*', { cwd: templatesPath });
  paths.forEach(f => {
    const str = readFileSync(path.join(templatesPath, f), 'utf8');
    const compiledStr = ejs.render(str, options);
    const outFile = path.join(projectPath, f.replace('.ejs', ''));
    writeFileSync(outFile, compiledStr);
  });
}
