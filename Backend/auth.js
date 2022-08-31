const jwt = require(`jsonwebtoken`);

const authentication = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith(`Bearer `)) {
    return res.status(401).json({
      data: `Cannot access route, request lacks valid authentication credentials`,
    });
  }
  try {
    const decoded = jwt.verify(authorization.split(` `)[1], `urrhrhryrt`);
    next();
  } catch (error) {
    return res.status(401).json({
      data: `Cannot access route, request lacks valid authentication credentials`,
    });
  }
};

const Signature = (req, res, next) => {
  try {
    const token = jwt.sign(req.body, `urrhrhryrt`, { expiresIn: `30d` });
    res.locals.token = token;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: `Internal Server Error, data sent, but unable to process`,
    });
  }
};

module.exports = { authentication, Signature };
