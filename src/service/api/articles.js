'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);

const articleValidator = require(`../middleware/article-validator`);
const commentValidator = require(`../middleware/comment-validator`);
const articleExists = require(`../middleware/article-exists`);

const route = new Router();

module.exports = (app, articleService, commentsService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();

    return res.status(HttpCode.OK)
      .json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found article with id ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.createArticle(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Article with id: ${articleId}, doesn't exist`);
    }

    const updatedArticle = articleService.update(articleId, req.body);

    return res.status(HttpCode.OK)
      .json(updatedArticle);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.delete(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Article with id: ${articleId}, doesn't exist`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentsService.findAll(article);

    return res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deleteComment = commentsService.deleteComment(article, commentId);

    if (!deleteComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Comment with id: ${commentId} doesn't exist`);
    }

    return res.status(HttpCode.OK)
      .json(deleteComment);
  });

  route.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const createdComment = commentsService.createComment(article, req.body);

    return res.status(HttpCode.CREATED)
      .json(createdComment);
  });
};
