'use strict';

const {Router} = require(`express`);
const categories = require(`./categories`);
const search = require(`./search`);
const articles = require(`./articles`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoriesService,
  SearchService,
  ArticlesService,
  CommentsService
} = require(`../data-services`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categories(app, new CategoriesService(mockData));
  search(app, new SearchService(mockData));
  articles(app, new ArticlesService(mockData), new CommentsService());
})();

module.exports = app;
