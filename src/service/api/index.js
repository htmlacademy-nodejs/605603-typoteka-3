'use strict';

const {Router} = (`express`);
const categories = require(`./categories`);
const search = require(`./search`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoriesService,
  SearchService
} = require(`../data-services`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categories(app, new CategoriesService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
