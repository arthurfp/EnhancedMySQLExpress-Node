const express = require('express');
const joi = require('joi');

const expressJWT = require('express-jwt');
const cors = require('cors');
const config = require('./config');

// Instantiate express
const app = express();

// Configure cross-domain middleware
app.use(cors());

// Configure middleware for parsing form data
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Declare a global middleware and mount a res.cc() function for the
// res object to send error messages
app.use((_req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// Middleware for parsing tokens, those starting with /api are ignored
// After the parsing is successful, the user attribute (that is, the
// content of the token payload) will be automatically mounted on req
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }),
);

// Import user routing module and register as global middleware
const userRouter = require('./router/user');

app.use('/api', userRouter);

const userinfoRouter = require('./router/userinfo');

app.use('/my', userinfoRouter);

const categoryRouter = require('./router/article_category');

app.use('/my/artcate', categoryRouter);

const articleRouter = require('./router/article');

app.use('/my/article', articleRouter);

// middleware that defines the error level
app.use((err, _req, res) => {
  // Error caused by field validation failure
  if (err instanceof joi.ValidationError) {
    return res.cc(err);
  }
  // Error jwt for failed authentication
  if (err.name === 'UnauthorizedError') {
    return res.cc('Authentication failed!');
  }
  return res.cc(err);
});

// listening port
app.listen(5000, () => {
  console.log('server is running at port 5000...');
});
