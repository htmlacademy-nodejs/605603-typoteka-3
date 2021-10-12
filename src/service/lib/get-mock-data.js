'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const MOCKS_FILENAME = `mocks.json`;

let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const mocks = await fs.readFile(MOCKS_FILENAME);
    data = JSON.parse(mocks);
  } catch (err) {
    console.error(chalk.red(err));
    return err;
  }

  return data;
};

module.exports = getMockData;
