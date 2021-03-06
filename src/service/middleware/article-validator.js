'use strict';

const {HttpCode} = require(`../../const`);

const articleKeys = [`title`, `announce`, `fullText`, `createdDate`, `category`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
        .json({error: `Bad request`});
  }

  next();
};
