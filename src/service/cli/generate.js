'use strict';

const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../const`);
const fs = require(`fs`);

const DEFAULT_MOCKS_COUNT = 1;
const MOCKS_FILE_NAME = `mocks.json`;
const MAX_MOCKS_COUNT = 1000;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Рок — это протест`,
  `Борьба с прокрастинацией`,
  `Самый лучший музыкальный альбом этого года`,
];

const DESCRIPTIONS = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Программирование`,
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Железо`,
];

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

const generateOffers = (count) => {
  if (count > MAX_MOCKS_COUNT) {
    console.error(`Не больше ${MAX_MOCKS_COUNT} публикаций`);
    process.exit(ExitCode.error);
  }

  return Array(count)
    .fill({})
    .map(() => ({
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      announce: shuffle(DESCRIPTIONS).slice(1, 5).join(` `),
      fullText: shuffle(DESCRIPTIONS).slice(1, 5).join(` `),
      createdDate: randomPublicationDate(),
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_MOCKS_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(MOCKS_FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created`);
    });
  }
};
