var express      = require('express');
var user         = require.main.require('./models/user-model');
var doctor       = require.main.require('./models/doctor-model');
var patient      = require.main.require('./models/patient-model');
var blood        = require.main.require('./models/blood-model');
var notice       = require.main.require('./models/notice-model');
var admin        = require.main.require('./models/admin-model');
var bed          = require.main.require('./models/bed-model');
var report       = require.main.require('./models/report-model');
var prescription = require.main.require('./models/prescription-model');
var alert        = require('alert-node');
var router       = express.Router();


router.get('*', function(req, res, next){

	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	
			res.render('patient/index');			
});

//appointment
router.get('/vappoint', function(req, res){
	
	var data={
    	uname:req.session.un
    }
	patient.getByUn1(data, function(results){
		if(results != null){
			res.render('patient/viewAppoint', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
//Prescription

router.get('/vprescrip', function(req, res){

    var data={
    	uname:req.session.un
    }
	prescription.getByUn(data, function(results){
		if(results != null){
			res.render('patient/viewPrescrip', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//doctor
router.get('/vdoctor', function(req, res){

	doctor.getAll(function(results){
		if(results != null){
			res.render('patient/viewDoctor', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


//notice
router.get('/vnotice', function(req, res){

	notice.getAll(function(results){
		if(results != null){
			res.render('patient/viewNotice', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
//Bed

router.get('/vbed', function(req, res){

    var data={
    	uname:req.session.un
    }
	bed.getByUn(data, function(results){
		if(results != null){
			res.render('patient/viewBed', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


//Blood Bank

router.get('/vblood', function(req, res){

	blood.getAll(function(results){
		if(results != null){
			res.render('patient/viewBloodbank', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//report

router.get('/vreport', function(req, res){
     var data={
    	uname:req.session.un
    }

	report.getByUn1(data, function(results){
		if(results != null){
			res.render('patient/viewReport', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//profile
router.get('/managePro', function(req, res){
    var data ={
     uname:req.session.un
 }
	patient.getByUn1(data, function(result){
		if(result.length > 0){
			res.render('patient/profileEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.post('/managePro', function(req, res){
    var data = {
		number: req.body.num,
		doctor: req.body.doctor,
		address: req.body.address,
        id:req.session.un
	};
	
	patient.updatePro(data, function(status){

		if(status){
			res.redirect('/patient/managePro');			
		}else{
			res.send("Error");
		}
	});
});

//Change Password

router.get('/cngPass', function(req, res){
    	res.render('patient/acngpass');			
		
});
router.post('/cngPass', function(req, res){
    req.checkBody("new", "Password field cannot be empty").notEmpty();
	req.checkBody("confirm", "Confirm Password field cannot be empty").notEmpty();
    req.checkBody('confirm', 'Password and confirm password did not matched.').equals(req.body.new);
	req.checkBody('new', 'Password must be between 4-60 characters long.').len(4, 60);
    //req.checkBody("pass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	
	const err = req.validationErrors();

	if(err){		
		res.render('patient/acngpass', {errors: err});
		//console.log(err);
	}else{
	var data = {
		password: req.body.new,
	    id:req.session.un
	};
	
	patient.updatePass(data, function(status){

		if(status){
			res.redirect('/patient/cngPass');
			alert("Password is Successfully Changed");
		}else{
			res.send("Error");
		}
	});
}
});


module.exports = router;