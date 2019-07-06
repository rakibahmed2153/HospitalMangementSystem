var express      = require('express');
var user         = require.main.require('./models/user-model');
var doctor       = require.main.require('./models/doctor-model');
var patient      = require.main.require('./models/patient-model');
var blood        = require.main.require('./models/blood-model');
var notice       = require.main.require('./models/notice-model');
var admin        = require.main.require('./models/admin-model');
var bed          = require.main.require('./models/bed-model');
var report       = require.main.require('./models/report-model');
var nurse        = require.main.require('./models/nurse-model');
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
			res.render('nurse/index');			
		
});

//patient

router.get('/addpatient', function(req, res){
	doctor.getAll(function(results){
		if(results != null){
			res.render('nurse/addPatient', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
	
});

router.post('/addpatient', function(req, res){
	
	var data = {
		pctname: req.body.pname,
		pctnum: req.body.pnumber,
		pctprob:req.body.pprob,
	    pctdoct:req.body.pdoct,
		pctaddress:req.body.paddress,
		pctpass:req.body.pass
	};
	if(req.body.pass == req.body.confirmpass)
	{
	patient.create(data, function(status){

		if(status){
			alert("Patient is Successfully Created");
			res.redirect('/nurse/addpatient');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/nurse/addpatient');
		}
	});
}
else{
	alert("Password And Confirm Password Did Not Matched");
			res.redirect('/nurse/addpatient');
		
}
});


router.get('/viewpct', function(req, res){

	patient.getAll(function(results){
		if(results != null){
			res.render('nurse/viewPatient', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/patientedit/:id', function(req, res){
    
	patient.getById(req.params.id, function(result){
		     if(result != null){
			res.render('nurse/patientEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/patientedit/:id', function(req, res){
	var data = {
		pctname: req.body.pname,
		pctnum: req.body.pnumber,
		pctprob:req.body.pprob,
	    pctdoct:req.body.pdoct,
		pctaddress:req.body.paddress,
		id:req.params.id
	};
	
	patient.update(data, function(status){

		if(status){
			res.redirect('/nurse/viewpct');			
		}else{
			res.redirect('/nurse/patientedit/'+req.params.id);
		}
	});
});

router.get('/patientdelete/:id', function(req, res){

	patient.delete(req.params.id, function(status){
		if(status){
			res.redirect('/nurse/viewpct');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


//Prescription

router.get('/vprescrip', function(req, res){

	prescription.getAll(function(results){
		if(results != null){
			res.render('nurse/viewPrescrip', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});



//bed



router.get('/addbed', function(req, res){
			patient.getAll(function(results){
			if(results != null){
				res.render('nurse/bedAllot', {userList: results});			
			}else{
				res.send('Error!.. try again...');
			}
		});
	});
	
		


router.post('/addbed', function(req, res){
	var data = {
		name: req.body.name,
		word: req.body.wname,
		bednum:req.body.bednum
	};
	bed.create(data, function(status){

		if(status){
			alert("Bed is Successfully Alloted");
			res.redirect('/nurse/addbed');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/nurse/addbed');
		}
	});
});


router.get('/vbed', function(req, res){

	bed.getAll(function(results){
		if(results != null){
			res.render('nurse/viewBed', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/bededit/:id', function(req, res){
    
	bed.getById(req.params.id, function(result){
		     if(result != null){
			res.render('nurse/bedEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/bededit/:id', function(req, res){
	var data = {
		name: req.body.name,
		word: req.body.word,
		bednum:req.body.bed,
        id:req.params.id
	};
	
	bed.update(data, function(status){

		if(status){
			res.redirect('/nurse/vbed');			
		}else{
			res.redirect('/nurse/bededit/'+req.params.id);
		}
	});
});

router.get('/beddelete/:id', function(req, res){

	bed.delete(req.params.id, function(status){
		if(status){
			res.redirect('/nurse/vbed');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//NoticeBoard

router.get('/vnotice', function(req, res){

	notice.getAll(function(results){
		if(results != null){
			res.render('nurse/viewNotice', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//Blood Bank
router.get('/addblood', function(req, res){
			
				res.render('nurse/addDoner');			
			
	});
	
		


router.post('/addblood', function(req, res){
	
	req.checkBody('name', 'Username field cannot be empty.').notEmpty();
	req.checkBody('number', 'Number field cannot be empty.').notEmpty();
	req.checkBody('email', 'Email field cannot be empty.').notEmpty();
	req.checkBody("address", "Address field cannot be empty").notEmpty();
	req.checkBody('group', 'Email field cannot be empty.').notEmpty();
	req.checkBody("amount", "Address field cannot be empty").notEmpty();
	req.checkBody("number", "Invalid Phone Number").matches(/^[0-9_-]+$/, 'i');
	req.checkBody("number", "Invalid Phone Number").len(11,11);
	
	const err = req.validationErrors();

	if(err){		
		res.render('nurse/addDoner', {errors: err});
		
	}else{
		
		var data = {
			name: req.body.name,
			number: req.body.number,
			email:req.body.email,
			group:req.body.group,
			amount:req.body.amount,
			address:req.body.address
		};
		blood.create(data, function(status){

			if(status){
				alert("Doner is Successfully Added");
				res.redirect('/nurse/addblood');			
			}else{
			    alert("Sorry..There Is Some Error Occur");
				res.redirect('/nurse/addblood');
			}
		});
	}
});

router.get('/vblood', function(req, res){

	blood.getAll(function(results){
		if(results != null){
			res.render('nurse/viewBloodbank', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.get('/doneredit/:id', function(req, res){
    
	blood.getById(req.params.id, function(result){
		     if(result != null){
			res.render('nurse/donerEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/doneredit/:id', function(req, res){
	var data = {
		    name: req.body.name,
			number: req.body.number,
			email:req.body.email,
			group:req.body.group,
			amount:req.body.amount,
			address:req.body.address,
            id:req.params.id
	};
	
	blood.update(data, function(status){

		if(status){
			res.redirect('/nurse/vblood');			
		}else{
			res.redirect('/nurse/doneredit/'+req.params.id);
		}
	});
});

router.get('/donerdelete/:id', function(req, res){

	blood.delete(req.params.id, function(status){
		if(status){
			res.redirect('/nurse/vblood');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


//Report


router.get('/vreport', function(req, res){

	report.getAll(function(results){
		if(results != null){
			res.render('nurse/viewReport', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


//profile
router.get('/managePro', function(req, res){
    var data ={
     unname:req.session.un
 }
	nurse.getByUn(data, function(result){
		if(result.length > 0){
			res.render('nurse/profileEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.post('/managePro', function(req, res){
    var data = {
		
		number: req.body.num,
		email: req.body.email,
		address: req.body.address,
        id:req.session.un
	};
	
	nurse.updatePro(data, function(status){

		if(status){
			res.redirect('/nurse/managePro');			
		}else{
			res.send("Error");
		}
	});
});

//Change Password

router.get('/cngPass', function(req, res){
    	res.render('nurse/acngpass');			
		
});
router.post('/cngPass', function(req, res){
    req.checkBody("new", "Password field cannot be empty").notEmpty();
	req.checkBody("confirm", "Confirm Password field cannot be empty").notEmpty();
    req.checkBody('confirm', 'Password and confirm password did not matched.').equals(req.body.new);
	req.checkBody('new', 'Password must be between 4-60 characters long.').len(4, 60);
    //req.checkBody("pass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	
	const err = req.validationErrors();

	if(err){		
		res.render('nurse/acngpass', {errors: err});
		//console.log(err);
	}else{
	var data = {
		password: req.body.new,
	    id:req.session.un
	};
	
	nurse.updatePass(data, function(status){

		if(status){
			res.redirect('/nurse/cngPass');
			alert("Password is Successfully Changed");
		}else{
			res.send("Error");
		}
	});
}
});

module.exports = router;