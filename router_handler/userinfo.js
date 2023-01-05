const bcrypt = require('bcryptjs');
const db = require('../db/index');

// Get user information
exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?';
  db.query(sql, req.user.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc('Failed to get user information');

    return res.send({
      status: 0,
      message: 'Success',
      data: result[0],
    });
  });
};

// Update user information
exports.updateUserInfo = (req, res) => {
  const sql = 'update ev_users set ? where id = ?';
  db.query(sql, [req.body, req.user.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc('Failed to update user information');
    return res.cc('User information has been updated', 0);
  });
};

// Reset user password
exports.updatePassword = (req, res) => {
  // Query whether the user exists according to the id (safe-check)
  const sql = 'select * from ev_users where id = ?';
  db.query(sql, req.user.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc('User does not exist');

    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      result[0].password,
    );
    if (!compareResult) return res.cc('Wrong Password!');
    // Update password
    const updateSql = 'update ev_users set password = ? where id = ?';
    return db.query(
      updateSql,
      [bcrypt.hashSync(req.body.newPwd), req.user.id],
      (_err, _result) => {
        if (_err) res.cc(_err);
        if (_result.affectedRows !== 1) return res.cc('Update failed, please try again');
        return res.cc('Successfully updated password', 0);
      },
    );
  });
};

// Update user avatar
exports.updateAvatar = (req, res) => {
  const sql = 'update ev_users set user_pic = ? where id = ?';
  db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc('Update failed, please try again');
    return res.cc('Successfully updated avatar', 0);
  });
};
