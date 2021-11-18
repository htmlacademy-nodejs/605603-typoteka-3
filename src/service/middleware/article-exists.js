'use strict';

const {HttpCode} = require(`../../const`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const article = service.findOne(articleId);

  if (!article) {
    res.status(HttpCode.NOT_FOUND)
      .json({error: `Article with id: ${articleId} doesn't exist`});
  }

  res.locals.article = article;
  return next();
};
