import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import globby from 'globby';
import ejs from 'ejs';

export default async function create(projectPath: string, options: object) {
  mkdirp.sync(projectPath);
  const templatesPath = path.join(__dirname, 'templates');
  const paths = globby.sync('**', { cwd: templatesPath });
  const copyFiles = ['index.html'];
  paths.forEach(f => {
    const str = readFileSync(path.join(templatesPath, f), 'utf8');
    let outStr = '';
    if (copyFiles.includes(f)) {
      outStr = str;
    } else {
      outStr = ejs.render(str, options);
    }
    const outFile = path.join(projectPath, f.replace('.ejs', ''));
    mkdirp.sync(path.dirname(outFile));
    writeFileSync(outFile, outStr);
  });
}
