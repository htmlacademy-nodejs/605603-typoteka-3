'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

<<<<<<< HEAD
myRouter.get(`/`, (req, res) => res.render(`my`));
myRouter.get(`/comments`, (req, res) => res.render(`comments`));
=======
myRouter.get(`/`, (req, res) => res.send(`/my`));
myRouter.get(`/comments`, (req, res) => res.send(`/my/comments`));
>>>>>>> baf72b5471e7b3fc73513af2a4993074fa6945fa

module.exports = myRouter;
