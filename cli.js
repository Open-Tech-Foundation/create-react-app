#!/usr/bin/env node
const { run } = require("./dist");

const chalk = require("chalk");
const { version } = require("./package.json");

console.log(
  chalk`\n\t{bold.rgb(255, 136, 0) @open-tech-world/create-react-app} {gray [v${version}]} \n`
);

run();
