'use strict';

const axios = require(`axios`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;

class API {

  constructor(baseUrl, timeout) {
    this._http = axios.create({
      baseUrl,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});

    return response.data;
  }

  async getArticles() {
    return this._load(`/articles`);
  }

  async getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  async getComments(id) {
    return this._load(`/articles/${id}/comments`);
  }
}

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
