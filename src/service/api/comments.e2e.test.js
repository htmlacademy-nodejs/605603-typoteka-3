"use strict";

const express = require(`express`);
const request = require(`supertest`);
const comments = require(`./comments`);

const {HttpCode} = require(`../../const.js`);
const DataService = require(`../data-services/comments`);

const mockData = [
  {
    "id": `-tGdzy`,
    "comments": [
      {
        "id": `U3k2PG`,
        "text": `Совсем немного... Это где ж такие красоты Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`
      },
      {
        "id": `O0TP6C`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `k6b0aZ`,
        "text": `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!`
      }
    ],
    "title": `Рок — это протест`,
    "announce": `Достичь успеха помогут ежедневные повторения. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете.`,
    "createdDate": `19.08.2021, 07:56`,
    "category": [`Деревья`],
    "picture": ``
  },
  {
    "id": `iokECK`,
    "comments": [
      {"id": `agQNEV`, "text": `Мне кажется или я уже читал это где-то?`},
      {"id": `V8tzxZ`, "text": `Совсем немного...`},
      {
        "id": `t_RWor`,
        "text": `Планируете записать видосик на эту тему? Это где ж такие красоты Плюсую, но слишком много буквы! Согласен с автором!`
      },
      {"id": `uVWjXW`, "text": `Согласен с автором!`}
    ],
    "title": `Ёлки. История деревьев`,
    "announce": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Собрать камни бесконечности легко если вы прирожденный герой. Золотое сечение — соотношение двух величин гармоническая пропорция. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "createdDate": `20.10.2021, 07:56`,
    "category": [`Железо`],
    "picture": ``
  },
  {
    "id": `PzzNsn`,
    "comments": [
      {
        "id": `G2ZxtR`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то? Это где ж такие красоты`
      },
      {"id": `YspHu3`, "text": `Хочу такую же футболку :-)`},
      {
        "id": `N1kW1A`,
        "text": `Совсем немного... Это где ж такие красоты Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?`
      },
      {
        "id": `G0Aisr`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Совсем немного...`
      },
      {
        "id": `EQeGC5`,
        "text": `Хочу такую же футболку :-) Совсем немного... Это где ж такие красоты`
      },
      {
        "id": `HW7XP6`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему?`
      }
    ],
    "title": `Ёлки. История деревьев`,
    "announce": `Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Программировать не настолько сложно как об этом говорят.`,
    "createdDate": `19.10.2021, 07:56`,
    "category": [`Кино`],
    "picture": {"name": `sea`, "alt": `Фотография моря`}
  }
];

const mockDataNoComment = [
  {
    "id": `-tGdzy`,
    "comments": [],
    "title": `Рок — это протест`,
    "announce": `Достичь успеха помогут ежедневные повторения. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете.`,
    "createdDate": `19.08.2021, 07:56`,
    "category": [`Деревья`],
    "picture": ``
  },
  {
    "id": `iokECK`,
    "comments": [],
    "title": `Ёлки. История деревьев`,
    "announce": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Собрать камни бесконечности легко если вы прирожденный герой. Золотое сечение — соотношение двух величин гармоническая пропорция. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "createdDate": `20.10.2021, 07:56`,
    "category": [`Железо`],
    "picture": ``
  },
  {
    "id": `PzzNsn`,
    "comments": [],
    "title": `Ёлки. История деревьев`,
    "announce": `Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Программировать не настолько сложно как об этом говорят.`,
    "createdDate": `19.10.2021, 07:56`,
    "category": [`Кино`],
    "picture": {"name": `sea`, "alt": `Фотография моря`}
  }
];

const createAPI = (mocks) => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mocks));

  app.use(express.json());
  comments(app, new DataService(cloneData));

  return app;
};

describe(`API returns all comments list`, () => {
  const app = createAPI(mockData);

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 comment objects`, () => expect(response.body.length).toBe(3));

  test(`First comment id is '_8f1LF'`, () => expect(response.body[0].comments[0].id).toEqual(`U3k2PG`));

  test(`Last comment id is 'BGU_kC'`, () => expect(response.body[2].comments[0].id).toEqual(`G2ZxtR`));
});

describe(`Zero comments, no errors`, () => {
  const app = createAPI(mockDataNoComment);

  test(`Comments array length is 0`, () => {
    request(app)
      .get(`/comments`)
      .expect((res) => expect(res.body.length).toBe(0));
  });
});
