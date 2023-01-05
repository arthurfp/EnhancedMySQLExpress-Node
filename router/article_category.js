const express = require('express');

const router = express.Router();
const expressjoi = require('@escook/express-joi');
const articleHandler = require('../router_handler/article_category');
// Middleware for importing validation data
// Import schemas
const {
  addCateSchema,
  cateIdSchema,
  updateCateSchema,
} = require('../schema/article_category');

// Get list of categories
router.get('/cates', articleHandler.getArticleCategory);

// Add category
router.post(
  '/addcates',
  expressjoi(addCateSchema),
  articleHandler.addArticleCategory,
);

// Delete category
router.get(
  '/deletecate/:id',
  expressjoi(cateIdSchema),
  articleHandler.deleteCategoryById,
);

// Get category
router.get(
  '/cates/:id',
  expressjoi(cateIdSchema),
  articleHandler.getCategoryById,
);

// Update category
router.post(
  '/updatecate',
  expressjoi(updateCateSchema),
  articleHandler.updateCategoryById,
);
module.exports = router;
