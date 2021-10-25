'use strict';

const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode, MAX_ID_LENGTH} = require(`../../const`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const DEFAULT_MOCKS_COUNT = 1;
const MOCKS_FILE_NAME = `mocks.json`;
const MAX_MOCKS_COUNT = 1000;
const CATEGORIES = `categories.txt`;
const SENTENCES = `sentences.txt`;
const TITLES = `titles.txt`;
const COMMENTS = `comments.txt`;

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

  return {
    iso: new Date().toISOString(),
    full: date.toLocaleString(`ru-RU`, {
      dateStyle: `short`,
      timeStyle: `short`,
      hour12: false
    })
  };
};

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }));
};

const getRandomPictureObj = () => {
  const pictures = [`forest`, `sea`, `skyscraper`];
  if (Math.random() < 0.5) {
    return ``;
  } else {
    return pictures[getRandomInt(0, pictures.length - 1)];
  }
};

const generateOffers = (count, sentences, categories, titles, comments) => {
  if (count > MAX_MOCKS_COUNT) {
    console.error(chalk.red(`Не больше ${MAX_MOCKS_COUNT} публикаций`));
    process.exit(ExitCode.error);
  }

  return Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      comments: generateComments(getRandomInt(1, 4), comments),
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences).slice(1, 5).join(` `),
      createdDate: randomPublicationDate(),
      category: [categories[getRandomInt(0, categories.length - 1)]],
      picture: getRandomPictureObj(),
    }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readFromTxt(SENTENCES);
    const categories = await readFromTxt(CATEGORIES);
    const titles = await readFromTxt(TITLES);
    const comments = await readFromTxt(COMMENTS);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_MOCKS_COUNT;
    const content = JSON.stringify(
        generateOffers(
            countOffer, sentences, categories, titles, comments
        )
    );

    try {
      await fs.writeFile(MOCKS_FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created`));
    } catch (err) {
      console.error(chalk.red(err));
    }
  }
};
