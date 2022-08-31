const defaultErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: err.message });
};

module.exports = defaultErrorHandler;
