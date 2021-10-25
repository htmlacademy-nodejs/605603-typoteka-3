'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/comments`, route);

  route.get(`/`, (req, res) => {
    const comments = service.findAll();

    if (!comments) {
      res.status(HttpCode.NOT_FOUND)
        .send(`Comments not found`);
    }

    res.status(HttpCode.OK)
      .json(comments);
  });
};
