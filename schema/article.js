const joi = require('joi');

const title = joi.string().required();
const id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('');
const state = joi.string().valid('draft', 'published').required();

exports.articleIdSchema = {
  params: {
    id,
  },
};

exports.editArticleSchema = {
  body: {
    id,
    title,
    cate_id: id,
    content,
    state,
  },
};

exports.addArticleSchema = {
  body: {
    title,
    cate_id: id,
    content,
    state,
  },
};
