const db = require('../db/index');

// Get the article list that has not been deleted (soft deleted)
exports.getArticleCategory = (req, res) => {
  const sql =
    'select * from ev_article_cate where is_delete = 0 order by id asc';
  db.query(sql, (err, result) => {
    if (err) res.cc(err);
    res.send({
      status: 0,
      message: 'Sucess',
      data: result,
    });
  });
};

// Add interface processing function for article classification
exports.addArticleCategory = (req, res) => {
  const sqlSelect = 'select * from ev_article_cate where name = ? or alias = ?';
  db.query(sqlSelect, [req.body.name, req.body.alias], (err, result) => {
    if (err) return res.cc(err);
    if (result.length === 0) {
      const sql = 'insert into ev_article_cate set ?';
      db.query(
        sql, {
          name: req.body.name,
          alias: req.body.alias
        },
        (err, result) => {
          if (err) return res.cc(err);
          if (result.affectedRows !== 1) return res.cc('Failed to add, please try again');
          res.cc('Add data successfully', 0);
        }
      );
    } else {
      if (
        result.length === 1 &&
        result[0].name === req.body.name &&
        result[0].alias === req.body.alias
      )
        return res.cc('Category name and alias already exists');
      if (result.length === 1 && result[0].name === req.body.name)
        return res.cc('Category name already exists');
      if (result.length === 1 && result[0].alias === req.body.alias)
        return res.cc('Category alias already exists');
    }
  });
};

// Delete the route of the article classification according to the id (soft delete)
exports.deleteCategoryById = (req, res) => {
  // const sql = 'delete from ev_article_cate where id = ?'
  const sql = 'update ev_article_cate set is_delete = 1 where id = ?';
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc('Delete failed, please try again');
    res.cc('Successfully deleted', 0);
  });
};

// Get article category list according to id
exports.getCategoryById = (req, res) => {
  const sql = 'select * from ev_article_cate where id = ? and is_delete = 0';
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc('Failed to get article categories, please try again');
    res.cc({
      status: 0,
      message: 'Get article classification success',
      data: result[0],
    });
  });
};

// Update the article classification list according to the id
exports.updateCategoryById = (req, res) => {
  // Check first: whether the name and alias to be updated by the user already exist
  const sqlSelect =
    'select * from ev_article_cate where id <> ? and (name = ? or alias = ?)';
  db.query(
    sqlSelect,
    [req.body.id, req.body.name, req.body.alias],
    (err, result) => {
      if (err) return res.cc(err);
      if (result.length === 0) {
        // Can be updated, now checks if the id exists
        const sqlSelectId =
          'select * from ev_article_cate where id = ? and is_delete = 0';
        db.query(sqlSelectId, req.body.id, (err, result) => {
          if (err) return res.cc(err);
          if (result.length !== 1) return res.cc('Article category does not exist');
        });
        // Category already exists
        const sqlUpdate = 'update ev_article_cate set ? where id = ?';
        db.query(sqlUpdate, [req.body, req.body.id], (err, result) => {
          if (err) return res.cc(err);
          if (result.affectedRows !== 1) return res.cc('Update failed, please try again');
          res.cc('Successfully updated', 0);
        });
      } else {
        // Can NOT be updated
        if (
          result.length === 1 &&
          result[0].name === req.body.name &&
          result[0].alias === req.body.alias
        )
          return res.cc('Category name and alias already exists');
        if (result.length === 1 && result[0].name === req.body.name)
          return res.cc('Category name already exists');
        if (result.length === 1 && result[0].alias === req.body.alias)
          return res.cc('Category alias already exists');
      }
      res.send({
        status: 0,
        message: 'Update failed',
      });
    }
  );
};