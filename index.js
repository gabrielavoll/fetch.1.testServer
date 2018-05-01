const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const bodyParserJSON = bodyParser.json();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;

function cookieCreator( x, req, res){
	var cookieVal = parseInt(req['cookies'][x]);
	if(typeof cookieVal !== "number" || isNaN(cookieVal) || cookieVal > 99) cookieVal = 1;
	else cookieVal++;
	res.cookie(x, cookieVal, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false })
  if(req.body) res.send(req.body);
	else res.send();
}

express()
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('visual'))
  .use(cookieParser())
  .get('/api/do-nothing', (req, res) => res.send())
  .get('/api', (req, res) => cookieCreator('getCookie', req, res))
  .put('/api', bodyParserJSON, (req, res) => cookieCreator('putCookie', req, res))
  .post('/api', bodyParserJSON, (req, res) => cookieCreator('postCookie', req, res))
  .listen(PORT, () => {
  	console.log(`Listening on ${ PORT }`)
  });
