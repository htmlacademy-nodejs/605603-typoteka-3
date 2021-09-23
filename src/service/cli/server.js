'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);
const {HttpCode} = require(`../../const`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundText = `Not Found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((mock) => `<li>${mock.title}</li>`).join(``);

        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundText);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundText);
      break;
  }
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, () => {
      console.info(chalk.green(`Connected on port ${port}`));
    })
    .on(`error`, ({message}) => {
      console.error(chalk.red(`Error during server creation: ${message}`));
    });
  }
};
