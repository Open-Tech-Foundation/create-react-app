import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import globby from 'globby';
import ejs from 'ejs';

import IOptions from './IOptions';

export default async function create(options: IOptions) {
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
    const outFile = path.join(options.projectName, f.replace('.ejs', ''));
    mkdirp.sync(path.dirname(outFile));
    writeFileSync(outFile, outStr);
  });
}
