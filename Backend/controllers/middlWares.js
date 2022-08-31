const displayDashBoard = (req, res) => {
  res.status(200).json({
    data: `Accessed allowed, thanks for complying with us.<br> Token number is ${6577848}`,
  });
};

const onRecieve = async (req, res) => {
  res.status(200).json({ Message: res.locals.token });
};

module.exports = { displayDashBoard, onRecieve };
