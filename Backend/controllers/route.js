const router = require(`express`).Router();
const { displayDashBoard, onRecieve } = require(`./middlWares`);
const { authentication, Signature } = require(`../auth`);

router.route(`/dashboard`).get(authentication, displayDashBoard);

router.route(`/login`).post(Signature, onRecieve);

module.exports = router;
