var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
	console.log("coming in get");
    res.render('index');
});


router.post('/dashboard', function (req, res, next) {
	
	if(req.body.username == 'admin' && req.body.pass == 'admin')
	{	
		console.log("Yesss");
		//res.send({ foo : 'bar' });	
		var name = 'hello';
    	res.render('dashboard',  {name:name});
	}
	else
	 res.render('index');	
});





module.exports = router;
