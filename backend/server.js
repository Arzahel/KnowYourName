import models from "./models.js";

let express = require('express');
const router = express.Router();
const apiRouter = require('./api/index');

router.use('./routes.js', apiRouter);

let app = express();

app.use(express.static('./public'));

let server = app.listen(3000)