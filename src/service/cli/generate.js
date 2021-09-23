'use strict';

const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../const`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_MOCKS_COUNT = 1;
const MOCKS_FILE_NAME = `mocks.json`;
const MAX_MOCKS_COUNT = 1000;
const CATEGORIES = `categories.txt`;
const SENTENCES = `sentences.txt`;
const TITLES = `titles.txt`;

const readFromTxt = async (fileName) => {
  try {
    const filePath = `./data/${fileName}`;
    const content = await fs.readFile(filePath, `utf8`);

    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const randomPublicationDate = () => {
  const randomPastThreeMonths = -getRandomInt(1, 84);
  const timestamp = new Date().getTime();
  const dateCount = timestamp + ((1000 * 60 * 60 * 24 * randomPastThreeMonths));
  const date = new Date(dateCount);

  return date.toLocaleString(`ru-RU`, {
    dateStyle: `long`,
    timeStyle: `short`,
    hour12: false
  });
};

const generateOffers = (count, sentences, categories, titles) => {
  if (count > MAX_MOCKS_COUNT) {
    console.error(chalk.red(`Не больше ${MAX_MOCKS_COUNT} публикаций`));
    process.exit(ExitCode.error);
  }

  return Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences).slice(1, 5).join(` `),
      createdDate: randomPublicationDate(),
      category: [categories[getRandomInt(0, categories.length - 1)]],
    }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readFromTxt(SENTENCES);
    const categories = await readFromTxt(CATEGORIES);
    const titles = await readFromTxt(TITLES);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_MOCKS_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, sentences, categories, titles));

    try {
      await fs.writeFile(MOCKS_FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created`));
    } catch (err) {
      console.error(chalk.red(err));
    }
  }
};
