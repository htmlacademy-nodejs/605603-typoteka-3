'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {HttpCode, API_PREFIX} = require(`../../const`);
const routes = require(`../api`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const app = express();

app.use(express.json());

app.use(API_PREFIX, routes);

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mock = JSON.parse(fileContent);
    res.send(mock);
  } catch (err) {
    console.error(chalk.red(err));
    res.send([]);
  }
});

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Error during server creation: `, err));
      }

      return console.info(chalk.green(`App listening port ${port}`));
    });
  }
};
