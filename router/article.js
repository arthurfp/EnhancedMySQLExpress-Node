const express = require('express');

const router = express.Router();
const expressjoi = require('@escook/express-joi');

// Parse the form-data (binary file needs to be uploaded)
// After Multer parses the request body, it will add a body object and a file or object
// with multiple files to the Request object
// The body object contains the text fields in the submitted form, and the file object
// contains the files uploaded via the form.

const multer = require('multer');
const path = require('path');
const articleHandler = require('../router_handler/article');
const {
  articleIdSchema,
  editArticleSchema,
  addArticleSchema,
} = require('../schema/article');

const upload = multer({
  dest: path.join(__dirname, '../uploads'),
});

// Get the list of articles
router.get('/list', articleHandler.getArticleList);

// Get article details
router.get(
  '/:id',

  expressjoi(articleIdSchema),
  articleHandler.getArticleById,
);

// Delete rticle
router.get(
  '/delete/:id',
  expressjoi(articleIdSchema),
  articleHandler.deleteArticleById,
);

// Update article
router.post(
  '/edit',
  upload.single('cover_img'),
  expressjoi(editArticleSchema),
  articleHandler.editArticleById,
);

// Add article
router.post(
  '/add',
  upload.single('cover_img'),
  expressjoi(addArticleSchema),
  articleHandler.addArticle,
);

module.exports = router;
