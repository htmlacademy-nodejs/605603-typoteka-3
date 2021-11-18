'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {ensureArray, formatDate, formatDateToISO} = require(`../../utils`);

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const api = require(`../api`).getAPI();
const articlesRouter = new Router();

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articlesRouter.get(`/add`, (req, res) => res.render(`articles/post`));

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;

  const articleData = {
    title: body.title,
    picture: file ? file.filename : ``,
    category: ensureArray(body.category),
    announce: body.announcement,
    fullText: body[`full-text`],
    createdDate: {
      iso: formatDateToISO(body.date),
      full: formatDate(body.date)
    }
  };
  try {
    await api.addArticle(articleData);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`back`);
  }
});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);

  res.render(`articles/post-detail`, {article});
});

articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);

  res.render(`articles/post-detail`, {article});
});

module.exports = articlesRouter;
