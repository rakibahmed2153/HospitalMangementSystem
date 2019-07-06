var express = require('express');
var user	= require.main.require('./models/user-model');
var doctor	= require.main.require('./models/doctor-model');
var nurse	= require.main.require('./models/nurse-model');
var patient  = require.main.require('./models/patient-model');
var router  = express.Router();


router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	//req.checkBody('uname', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
	//req.checkBody('password', 'Password must be between 8-60 characters long.').len(8, 60);
	req.checkBody("password", "Password field cannot be empty").notEmpty();

	const err = req.validationErrors();

	if(err){		
		res.render('login/index', {errors: err});
		//console.log(err);
	}else{
		
	var data = {
		//option: req.body.opt,
		username: req.body.username,
		password: req.body.password
	};

    if(req.body.opt == 'admin')
    {
	user.validate(data, function(status){
		if(status){
			req.session.un = req.body.username;
			res.redirect('/admin');
		}else{
			res.send('invalid username/password...');
		}
	});
		
	}	
	else if(req.body.opt == 'doctor')
    {
	doctor.validate(data, function(status){
		if(status){
			req.session.un = req.body.username;
			res.redirect('/doctor');
		}else{
			res.send('invalid username/password...');

		}
	});
		
	}
	else if(req.body.opt == 'nurse')
    {
	nurse.validate(data, function(status){
		if(status){
			req.session.un = req.body.username;
			res.redirect('/nurse');
		}else{
			res.send('invalid username/password...');
		}
	});
		
	}
	else if(req.body.opt == 'patient')
    {
	patient.validate(data, function(status){
		if(status){
			req.session.un = req.body.username;
			res.redirect('/patient');
		}else{
			res.send('invalid username/password...');
		}
	});
		
	}
    }
});


module.exports = router;