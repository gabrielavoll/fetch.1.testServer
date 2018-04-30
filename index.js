const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001

function cookieCreator( x, req, res){
	var cookieVal = parseInt(req['cookies'][x]);
	if(typeof cookieVal !== "number" || isNaN(cookieVal) || cookieVal > 99) cookieVal = 1;
	else cookieVal++;
	res.cookie(x, cookieVal, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false })
	res.send()
}

express()
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('visual'))
  .use(cookieParser())
  .get('/api', (req, res) => cookieCreator('getCookie', req, res))
  .put('/api', (req, res) => cookieCreator('putCookie', req, res))
  .post('/api', (req, res) => cookieCreator('postCookie', req, res))
  .listen(PORT, () => {
  	console.log(`Listening on ${ PORT }`)
  });
