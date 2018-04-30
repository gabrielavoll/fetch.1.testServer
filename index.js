const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001

express()
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('visual'))
  .get('/api', (req, res) => {
  	res.send({ name: "Heather", age: "40" })
  })
  .listen(PORT, () => { console.log(`Listening on ${ PORT }`) })