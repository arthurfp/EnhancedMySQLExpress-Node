const db = require('../db/index');
const path = require('path');

// Get the article list data of the the current user (current user is the author of the article)
exports.getArticleList = (req, res) => {
  const sql = 'select * from ev_articles where author_id = ? and is_delete = 0';
  db.query(sql, req.user.id, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: 'Success',
      data: result,
    });
  });
};

// Obtain the detailed data of the article according to the id
exports.getArticleById = (req, res) => {
  const sql = 'select * from ev_articles where id = ? and is_delete = 0';
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: 'Success',
      data: result,
    });
  });
};

// Delete the article according to the id (soft delete)
exports.deleteArticleById = (req, res) => {
  const sql = 'update ev_articles set is_delete = 1 where id = ?';
  const sqlSelect = 'select * from ev_articles where id = ?';
  db.query(sqlSelect, req.params.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length === 0) return res.cc('The article does not exist');
    db.query(sql, req.params.id, (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc('Delete failed, please try again');
      res.cc('Successfully deleted', 0);
    });
  });
};

// Edit the article according to the id
exports.editArticleById = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') {
    return res.cc('Article cover must be selected');
  }
  const sql = 'update ev_articles set ? where id = ?';
  const articleInfo = {
    ...req.body,
    pub_date: new Date(),
    cover_img: path.join('/uploads', req.file.fieldname),
  };
  db.query(sql, [articleInfo, req.body.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc('Update failed');
    res.cc('Successfully updated', 0);
  });
};

// Publish a new article (the author is the id of the currently logged in user)
exports.addArticle = (req, res) => {
  // Manually verify uploaded files
  if (!req.file || req.file.fieldname !== 'cover_img') {
    return res.cc('Please upload the cover of the article');
  }
  const articleInfo = {
    ...req.body,
    pub_date: new Date(),
    author_id: req.user.id,
    cover_img: path.join('/uploads', req.file.filename),
  };
  const sql = 'insert into ev_articles set ?';
  db.query(sql, articleInfo, (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc('Failed to publish article');
    res.cc('Article published successfully', 0);
  });
};