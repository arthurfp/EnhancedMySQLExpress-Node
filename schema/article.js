const joi = require('joi');

const title = joi.string().required();
const id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('');
const state = joi.string().valid('draft', 'published').required();

const pagenum = joi.number().integer().min(0).required();
const pagesize = joi.number().integer().min(1).required();
const cate_id_optional = joi.number().integer().min(1).optional();
const state_optional = joi.string().valid('draft', 'published').optional();

exports.article_id_schema = {
  params: {
    id,
  },
};

exports.edit_article_schema = {
  body: {
    id,
    title,
    cate_id: id,
    content,
    state,
  },
};

exports.add_article_schema = {
  body: {
    title,
    cate_id: id,
    content,
    state,
  },
};