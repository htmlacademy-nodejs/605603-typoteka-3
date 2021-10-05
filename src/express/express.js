'use strict';

const express = require(`express`);
const path = require(`path`);
const mainRoutes = require(`./routes/main-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use((req, res) => res.status(404).render(`errors/404`));
app.use((req, res) => res.status(500).render(`errors/505`));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
