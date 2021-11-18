'use strict';

const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../const`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_MOCKS_COUNT = 1;
const MOCKS_FILE_NAME = `fill-db.sql`;
const MAX_MOCKS_COUNT = 1000;
const CATEGORIES = `categories.txt`;
const SENTENCES = `sentences.txt`;
const TITLES = `titles.txt`;
const COMMENTS = `comments.txt`;

const users = [
  {
    email: `ivanov@example.com`,
    firstName: `Иван`,
    lastName: `Иванов`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    avatar: `avatar1.jpg`
  }, {
    email: `petrov@example.com`,
    firstName: `Пётр`,
    lastName: `Петров`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    avatar: `avatar2.jpg`
  }
];

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

const generateComments = (count, comments, userCount, articleId) => {
  return Array(count).fill({}).map(() => ({
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
    userId: getRandomInt(1, userCount),
    articleId,
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

const generateArticles = (count, sentences, categoryCount, userCount, titles, comments) => {
  if (count > MAX_MOCKS_COUNT) {
    console.error(chalk.red(`Не больше ${MAX_MOCKS_COUNT} публикаций`));
    process.exit(ExitCode.error);
  }

  return Array(count)
    .fill({})
    .map((_, index) => ({
      comments: generateComments(getRandomInt(1, 4), comments, userCount, index + 1),
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, 2).join(` `),
      fullText: shuffle(sentences).slice(1, 5).join(` `),
      category: [getRandomInt(1, categoryCount)],
      picture: getRandomPictureObj(),
      userId: getRandomInt(1, userCount)
    }));
};

module.exports = {
  name: `--fill`,
  async run(args) {
    const sentences = await readFromTxt(SENTENCES);
    const categories = await readFromTxt(CATEGORIES);
    const titles = await readFromTxt(TITLES);
    const commentSentences = await readFromTxt(COMMENTS);

    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_MOCKS_COUNT;
    const articles = generateArticles(
        countArticle, sentences, categories.length, users.length, titles, commentSentences
    );

    const comments = articles.flatMap((article) => article.comments);

    const articlesCategories = articles.map((article, index) => ({
      articleId: index + 1,
      categoryId: article.category[0],
    }));

    const userValues = users.map(
        ({email, firstName, lastName, passwordHash, avatar}) =>
          `('${email}', '${firstName}', '${lastName}', '${passwordHash}', '${avatar}')`
    ).join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const articleValues = articles.map(
        ({title, announce, fullText, picture, userId}) =>
          `('${title}', '${announce}', '${fullText}', '${picture}', ${userId})`
    ).join(`,\n`);

    const articlesCategoryValues = articlesCategories.map(
        ({articleId, categoryId}) =>
          `(${articleId}, ${categoryId})`
    ).join(`,\n`);

    const commentValues = comments.map(
        ({text, userId, articleId}) =>
          `('${text}', ${userId}, ${articleId})`
    ).join(`,\n`);

    const content = `
      INSERT INTO users(email, first_name, last_name, password_hash, avatar) VALUES
      ${userValues};
      INSERT INTO categories(category_name) VALUES
      ${categoryValues};
      ALTER TABLE articles DISABLE TRIGGER ALL;
      INSERT INTO articles(title, announce, full_text, picture, user_id) VALUES
      ${articleValues};
      ALTER TABLE articles ENABLE TRIGGER ALL;
      ALTER TABLE articles_categories DISABLE TRIGGER ALL;
      INSERT INTO articles_categories(article_id, category_id) VALUES
      ${articlesCategoryValues};
      ALTER TABLE articles_categories ENABLE TRIGGER ALL;
      ALTER TABLE comments DISABLE TRIGGER ALL;
      INSERT INTO comments(comment_text, user_id, article_id) VALUES
      ${commentValues};
      ALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await fs.writeFile(MOCKS_FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created`));
    } catch (err) {
      console.error(chalk.red(err));
    }
  }
};
