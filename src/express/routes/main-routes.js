'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

<<<<<<< HEAD
mainRouter.get(`/`, (req, res) => res.render(`main`));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.render(`search`));
mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));
=======
mainRouter.get(`/`, (req, res) => res.send(`/`));
mainRouter.get(`/register`, (req, res) => res.send(`/register`));
mainRouter.get(`/login`, (req, res) => res.send(`/login`));
mainRouter.get(`/search`, (req, res) => res.send(`/search`));
mainRouter.get(`/categories`, (req, res) => res.send(`/categories`));
>>>>>>> baf72b5471e7b3fc73513af2a4993074fa6945fa

module.exports = mainRouter;
