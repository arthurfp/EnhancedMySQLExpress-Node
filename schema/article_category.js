const joi = require('joi');

// article name and alias validation rules
const name = joi.string().required();
// string of alphanumeric type
const alias = joi.string().alphanum().required();

// id validation rules
const id = joi.number().integer().min(1).required();

exports.addCateSchema = {
  body: {
    name,
    alias,
  },
};

// id is on the url, obtained through req.params
// /:id
exports.cateIdSchema = {
  params: {
    id,
  },
};

// Update the validation rules of the article classification according to the id
exports.updateCateSchema = {
  body: {
    id,
    name,
    alias,
  },
};
