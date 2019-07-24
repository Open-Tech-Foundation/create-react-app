import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import globby from 'globby';
import ejs from 'ejs';

import IOptions from './IOptions';

function copyFiles(templatesPath: string, paths: string[], options: IOptions) {
  const copyOnlyFiles = ['index.html'];
  paths.forEach(f => {
    const str = readFileSync(path.join(templatesPath, f), 'utf8');
    let outStr = '';
    if (copyOnlyFiles.includes(f)) {
      outStr = str;
    } else {
      outStr = ejs.render(str, options);
    }
    const outFile = path.join(options.projectName, f.replace('.ejs', ''));
    mkdirp.sync(path.dirname(outFile));
    writeFileSync(outFile, outStr);
  });
}

export default async function create(options: IOptions) {
  const templatesPath = path.join(__dirname, 'templates');
  const commonTemplatesPath = path.join(templatesPath, 'common');
  const commonPaths = globby.sync('**', {
    cwd: commonTemplatesPath,
  });
  copyFiles(commonTemplatesPath, commonPaths, options);
  const lang = options.typescript ? 'typescript' : 'javascript';
  const langTemplatesPath = path.join(templatesPath, lang);
  const langPaths = globby.sync('**', {
    cwd: langTemplatesPath,
  });
  copyFiles(langTemplatesPath, langPaths, options);
}
