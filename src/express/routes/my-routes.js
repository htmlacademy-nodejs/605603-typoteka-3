'use strict';

const {Router} = require(`express`);

const myRouter = new Router();
const api = require(`../api`).getAPI();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const {id} = req.params;
  const comments = await api.getComments(id);

  res.render(`comments`, {comments});
});

module.exports = myRouter;
