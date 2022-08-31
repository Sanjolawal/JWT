const express = require(`express`);
const app = express();
const path = require(`path`);
const defaultErrorHandler = require(`./defaultError`);

app.listen(3000, () => {
  console.log(`Listening to Client side`);
});

app.use(`/`, express.static(`public`));
app.use(express.json());
const router = require(`./controllers/route`);
app.use(router);
app.use(defaultErrorHandler);
