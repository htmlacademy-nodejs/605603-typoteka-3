'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();
const api = require(`../api`).getAPI();

articlesRouter.get(`/add`, (req, res) => res.render(`articles/post`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);

  res.render(`articles/post-detail`, {article});
});
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post-detail`));

module.exports = articlesRouter;
