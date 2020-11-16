const STATUS = require('http-status');

module.exports = (req, res, next) => {
  const info = req.body;

  if (info == null || Object.keys(info).length === 0 || Array.isArray(info)) {
    res.statusCode = STATUS.NO_CONTENT;
    res.send();
  } else {
    next();
  }
};
