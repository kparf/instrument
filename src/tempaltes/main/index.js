const fs = require('fs').promises;
const ejs = require('ejs');


async function main() {
  const content = await fs.readFile(`${__dirname}/main.ejs`, 'utf8');
  return ejs.compile(content);
}

module.exports = main;