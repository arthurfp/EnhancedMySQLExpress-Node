const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/index');
const config = require('../config');

// Import the encryption module: encrypt the user password

// Import the module to generate jwt token

// Add user
exports.regUser = (req, res) => {
  const userInfo = req.body;

  if (!userInfo.username || !userInfo.password) {
    return res.cc('Empty username or password');
  }
  // Check if the user already exists in the database
  const sqlSelect = 'select * from ev_users where username = ?';
  return db.query(sqlSelect, userInfo.username, (err, result) => {
    if (err) return res.cc(err);

    if (result.length > 0) return res.cc('Username already exists');

    // Call bcryptjs to encrypt the password
    userInfo.password = bcrypt.hashSync(userInfo.password);
    const sqlInsert = 'insert into ev_users set ?';
    return db.query(
      sqlInsert,
      {
        username: userInfo.username,
        password: userInfo.password,
      },
      (_err, _result) => {
        if (_err) return res.cc(_err);
        if (_result.affectedRows !== 1) {
          return res.cc('User registration failed, please try again later!');
        }
        return res.cc('Successful registration!', 0);
      },
    );
  });
};

// Login handler
exports.login = (req, res) => {
  const userInfo = req.body;
  const sql = 'select * from ev_users where username = ?';
  db.query(sql, userInfo.username, (err, result) => {
    if (err) return res.cc(err);
    // Empty result
    if (result.length !== 1) return res.cc('Login failed');

    const compareResult = bcrypt.compareSync(
      userInfo.password,
      result[0].password,
    );
    if (!compareResult) return res.cc('Login failed, wrong password');

    // Generate a JWT token string on the server side
    const user = {
      ...result[0],
      password: '',
      user_pic: '',
    }; // Remove the user's password and avatar

    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expireIn,
    });

    return res.send({
      status: 0,
      message: 'Successfully Logged in',
      token: `Bearer ${tokenStr}`,
    });
  });
};
