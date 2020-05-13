import models from "./models.js"

let express = require('express')
let app = express()

app.use(express.static('./public'));

let server = app.listen(3000)