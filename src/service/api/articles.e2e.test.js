"use strict";

const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);
const ArticlesService = require(`../data-services/articles`);
const CommentsService = require(`../data-services/comments`);

const {HttpCode} = require(`../../const`);

const mockData = [
  {
    id: `C_aW3m`,
    comments: [
      {
        id: `Xr2WMI`,
        text: `Согласен с автором! Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему?`,
      },
      {
        id: `kdf4nZ`,
        text: `Совсем немного... Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-)`,
      },
      {
        id: `kjn4_N`,
        text: `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!`,
      },
      {
        id: `heOr9A`,
        text: `Это где ж такие красоты Согласен с автором! Плюсую, но слишком много буквы!`,
      },
      {
        id: `5tRene`,
        text: `Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Хочу такую же футболку :-)`,
      },
      {
        id: `62GlLj`,
        text: `Это где ж такие красоты Совсем немного... Согласен с автором! Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
    ],
    title: `Борьба с прокрастинацией`,
    announce:
      `Первая большая ёлка была установлена только в 1938 году. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Достичь успеха помогут ежедневные повторения. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    fullText:
      `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Из под его пера вышло 8 платиновых альбомов.`,
    createdDate: `2 сентября 2021 г., 16:13`,
    category: [`Без рамки`],
  },
  {
    id: `RJtp3-`,
    comments: [
      {
        id: `Xr2WMI`,
        text: `Согласен с автором! Мне кажется или я уже читал это где-то? Хочу такую же футболку :-) Это где ж такие красоты`,
      },
      {
        id: `udyA_S`,
        text: `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Совсем немного...`,
      },
      {
        id: `13rImJ`,
        text: `Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?`,
      },
      {
        id: `M3BGnV`,
        text: `Плюсую, но слишком много буквы! Согласен с автором! Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        id: `aLcP3a`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты`,
      },
    ],
    title: `Как достигнуть успеха не вставая с кресла`,
    announce:
      `Собрать камни бесконечности легко если вы прирожденный герой. Программировать не настолько сложно как об этом говорят. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Достичь успеха помогут ежедневные повторения.`,
    fullText:
      `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Как начать действовать? Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов.`,
    createdDate: `7 октября 2021 г., 16:13`,
    category: [`Железо`],
  },
  {
    id: `C5jE7v`,
    comments: [
      {
        id: `_Rv5oE`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        id: `Md3dYB`,
        text: `Планируете записать видосик на эту тему? Хочу такую же футболку :-) Плюсую, но слишком много буквы! Совсем немного...`,
      },
      {
        id: `yMgjwS`,
        text: `Это где ж такие красоты Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором!`,
      },
      {
        id: `NevCks`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
      {
        id: `n3VXHu`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то?`,
      },
    ],
    title: `Лучшие рок-музыканты 20-века`,
    announce:
      `Программировать не настолько сложно как об этом говорят. Золотое сечение — соотношение двух величин гармоническая пропорция. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    fullText:
      `Как начать действовать? Для начала просто соберитесь. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    createdDate: `3 октября 2021 г., 16:13`,
    category: [`Программирование`],
  },
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new ArticlesService(cloneData), new CommentsService());
  return app;
};

describe(`API returns all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 3 articles`, () => expect(response.body.length).toBe(3));

  test(`First article id equals 'C_aW3m'`, () => expect(response.body[0].id).toBe(`C_aW3m`));
});

describe(`API returns article with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/C_aW3m`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article title is 'Борьба с прокрастинацией'`, () => {
    expect(response.body.title).toBe(`Борьба с прокрастинацией`);
  });
});

describe(`Create new article in API`, () => {

  const newArticle = {
    title: `Ёлки. История деревьев`,
    announce: `Этот смартфон`,
    fullText: `Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете.`,
    createdDate: `22 сентября 2021 г., 20:27`,
    category: [`Деревья`]
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns created article`, () => {
    expect(response.body).toEqual(expect.objectContaining(newArticle));
  });

  test(`Articles count changed`, () => {
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(4));
  });
});

describe(`API refuse create article if data are incorrect`, () => {
  const newArticle = {
    title: `Ёлки. История деревьев`,
    announce: `Этот смартфон`,
    fullText: `Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете.`,
    createdDate: `22 сентября 2021 г., 20:27`,
    category: [`Деревья`]
  };

  const app = createAPI();

  test(`Without any of required keys return status 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API change existing article`, () => {
  const newArticle = {
    title: `Ёлки. История деревьев`,
    announce: `Этот смартфон`,
    fullText: `Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете.`,
    createdDate: `22 сентября 2021 г., 20:27`,
    category: [`Деревья`]
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/C_aW3m`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => {
    expect(response.body).toEqual(expect.objectContaining(newArticle));
  });

  test(`Article with id 'C_aW3m' is changed to 'newArticle'`, () => {
    request(app)
      .get(`/articles/C_aW3m`)
      .expect((res) => expect(res.body).toEqual(newArticle));
  });
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    title: `Ёлки. История деревьев`,
    announce: `Этот смартфон`,
    fullText: `Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете.`,
    createdDate: `22 сентября 2021 г., 20:27`,
    category: [`Деревья`]
  };

  test(`Without any of required keys return status 400`, async () => {
    const app = createAPI();

    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`API returns status code 404 when trying to change non-existent article`, () => {
    const app = createAPI();

    const validArticle = {
      title: `it's`,
      announce: `valid`,
      fullText: `article`,
      createdDate: `22 сентября 2021 г., 20:27`,
      category: [`category`]
    };

    return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
  });

  test(`API returns status code 400 when trying to change an article with invalid data`, () => {
    const app = createAPI();

    const invalidArticle = {
      title: `it's`,
      announce: `invalid`,
      fullText: `article`,
      category: [`no date`]
    };

    return request(app)
      .put(`/articles/C_aW3m`)
      .send(invalidArticle)
      .expect(HttpCode.BAD_REQUEST);
  });
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/C_aW3m`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`C_aW3m`));

  test(`Articles count are 2`, () => {
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(2));
  });
});

test(`Refuses to delet non-existing article`, () => {
  const app = createAPI();

  request(app)
    .delete(`/articles/NONEXIST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/RJtp3-/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 6 comments`, () => expect(response.body.length).toBe(6));

  test(`First comment's id is "Xr2WMI"`, () => expect(response.body[0].id).toBe(`Xr2WMI`));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Valid comment`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/RJtp3-/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/RJtp3-/comments`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Whatever`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/RJtp3-/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/RJtp3-/comments/Xr2WMI`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`Xr2WMI`));

  test(`Comments count is 4 now`, () => request(app)
    .get(`/articles/RJtp3-/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/RJtp3-/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST/comments/Xr2WMI`)
    .expect(HttpCode.NOT_FOUND);

});
