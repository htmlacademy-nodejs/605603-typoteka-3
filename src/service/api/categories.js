'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    console.log(`1works`);
    const categories = await service.findAll();
    res.status(HttpCode.OK)
      .json(categories);
  });
};
