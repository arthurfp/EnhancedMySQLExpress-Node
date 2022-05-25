const joi = require('joi');

// article name and alias validation rules
const name = joi.string().required();
// string of alphanumeric type
const alias = joi.string().alphanum().required();

// id validation rules
const id = joi.number().integer().min(1).required();

exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
};

// id is on the url, obtained through req.params
// /:id
exports.cate_id_schema = {
  params: {
    id,
  },
};

// Update the validation rules of the article classification according to the id
exports.update_cate_schema = {
  body: {
    id,
    name,
    alias,
  },
};
