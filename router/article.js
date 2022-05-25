const express = require('express');
const router = express.Router();
const articleHandler = require('../router_handler/article');
const expressjoi = require('@escook/express-joi');
const {
  article_id_schema,
  edit_article_schema,
  add_article_schema,
} = require('../schema/article');

// Parse the form-data (binary file needs to be uploaded)
// After Multer parses the request body, it will add a body object and a file or object with multiple files to the Request object
// The body object contains the text fields in the submitted form, and the file object contains the files uploaded via the form.

const multer = require('multer');
const path = require('path');
const upload = multer({
  dest: path.join(__dirname, '../uploads')
});

// Get the list of articles
router.get('/list', articleHandler.getArticleList);

// Get article details
router.get(
  '/:id',

  expressjoi(article_id_schema),
  articleHandler.getArticleById
);

// Delete rticle
router.get(
  '/delete/:id',
  expressjoi(article_id_schema),
  articleHandler.deleteArticleById
);

// Update article
router.post(
  '/edit',
  upload.single('cover_img'),
  expressjoi(edit_article_schema),
  articleHandler.editArticleById
);

// Add article
router.post(
  '/add',
  upload.single('cover_img'),
  expressjoi(add_article_schema),
  articleHandler.addArticle
);

module.exports = router;