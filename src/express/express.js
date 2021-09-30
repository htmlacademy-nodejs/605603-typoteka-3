'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/main-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
