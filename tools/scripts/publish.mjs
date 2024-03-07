/**
 * This is a minimal script to publish your package to "npm".
 * This is meant to be used as-is or customize as you see fit.
 *
 * You might need to authenticate with NPM before running this script.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

import devkit from '@nx/devkit';
const { readCachedProjectGraph} = devkit;

function invariant(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
function absolute(...paths){
  return  join(
    fileURLToPath(import.meta.url),
      '../../../',
      ...paths
    )
}

// Executing publish script: node path/to/publish.mjs {name} --tag {tag}
const graph = readCachedProjectGraph();
const [, , name, version, tag = 'latest'] = process.argv;

const project = graph.nodes[name];

invariant(
  project,
  `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`
);

const outputPath = project.data?.targets?.build?.options?.outputPath;
invariant(
  outputPath,
  `Could not find "build.options.outputPath" of project "${name}". Is project.json configured  correctly?`
);
// version 便于发布指定版本
if(version){
  process.chdir(outputPath);
  // Updating the version in "package.json" before publishing
  try {
    const json = JSON.parse(readFileSync(`package.json`).toString());
    json.version = version;
    writeFileSync(`package.json`, JSON.stringify(json, null, 2));
  } catch (e) {
    console.error(
      chalk.bold.red(`Error reading package.json file from library build output.`)
    );
  }
}
// 进入到项目目录
const project_dir =  absolute(join(project.data.root))
process.chdir(project_dir);

execSync(`pnpm publish  --tag ${tag}`,{
  stdio: 'inherit',
});


