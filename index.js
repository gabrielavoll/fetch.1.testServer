const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 1010

express()
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('visual'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))