'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  const comments = await api.getAllComments();

  if (articles.length === 0) {
    res.render(`main-empty`);
  } else {
    res.render(`main`, {articles, comments});
  }

});

mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));

mainRouter.get(`/login`, (req, res) => res.render(`login`));

mainRouter.get(`/search`, async (req, res) => {
  try {
    const {query} = req.query;

    const results = await api.search(query);

    res.render(`search-result`, {results});
  } catch (err) {
    res.render(`search-result`, {results: []});
  }
});

mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRouter;
