const express = require('express');
const router = express.Router();
const articleHandler = require('../router_handler/article_category');
// Middleware for importing validation data
const expressjoi = require('@escook/express-joi');
// Import schemas
const {
  add_cate_schema,
  cate_id_schema,
  update_cate_schema,
} = require('../schema/article_category');

// Get list of categories
router.get('/cates', articleHandler.getArticleCategory);

// Add category
router.post(
  '/addcates',
  expressjoi(add_cate_schema),
  articleHandler.addArticleCategory
);

// Delete category
router.get(
  '/deletecate/:id',
  expressjoi(cate_id_schema),
  articleHandler.deleteCategoryById
);

// Get category
router.get(
  '/cates/:id',
  expressjoi(cate_id_schema),
  articleHandler.getCategoryById
);

// Update category
router.post(
  '/updatecate',
  expressjoi(update_cate_schema),
  articleHandler.updateCategoryById
);
module.exports = router;