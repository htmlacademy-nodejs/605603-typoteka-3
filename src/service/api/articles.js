'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);

const articleValidator = require(`../middlewares/article-validator`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpCode.OK)
      .json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      res.status(HttpCode.NOT_FOUND)
        .send(`Not found article with id ${articleId}`);
    }

    res.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.createArticle(req.body);

    res.status(HttpCode.CREATED)
      .json(article);
  });
};
