'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

<<<<<<< HEAD
articlesRouter.get(`/add`, (req, res) => res.render(`articles/post`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`articles/post-detail`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post-detail`));
=======
articlesRouter.get(`/add`, (req, res) => res.send(`/articles/add`));
articlesRouter.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
articlesRouter.get(`/:id`, (req, res) => res.send(`articles/:id`));
>>>>>>> baf72b5471e7b3fc73513af2a4993074fa6945fa

module.exports = articlesRouter;
