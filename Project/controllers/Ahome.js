var express = require('express');
var user = require.main.require('./models/user-model');
var doctor = require.main.require('./models/doctor-model');
var patient = require.main.require('./models/patient-model');
var nurse = require.main.require('./models/nurse-model');
var notice = require.main.require('./models/notice-model');
var admin = require.main.require('./models/admin-model');
var alert = require('alert-node');
var router = express.Router();


router.get('*', function(req, res, next){

	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	res.render('home/index');
});

router.get('/adddept', function(req, res){
	res.render('home/addDept');
});


router.post('/adddept', function(req, res){
	
	req.checkBody('dname', 'Name field cannot be empty.').notEmpty();
	req.checkBody('message', 'Message field cannot be empty.').notEmpty();

	
	const err = req.validationErrors();

	if(err){		
		res.render('home/addDept', {errors: err});
		//console.log(err);
	}else{
	
	var data = {
		deptname: req.body.dname,
		description: req.body.message,
	};
	user.create(data, function(status){

		if(status){
			alert("Department Successfully Created");
			res.redirect('/admin/adddept');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/admin/adddept');
		}
	});
}
});



//Department:
router.get('/vdept', function(req, res){

	user.getAll(function(results){
		if(results != null){
			res.render('home/viewDept', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.get('/edit/:id', function(req, res){

	user.getById(req.params.id, function(result){
		if(result != null){
			res.render('home/deptEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.post('/edit/:id', function(req, res){
	
	var data = {
		deptname: req.body.dname,
		description: req.body.description,
		id: req.params.id
	};

	user.update(data, function(status){

		if(status){
			res.redirect('/admin/vdept');			
		}else{
			res.redirect('/admin/edit/'+req.params.id);
		}
	});
});




router.get('/delete/:id', function(req, res){

	user.delete(req.params.id, function(status){
		if(status){
			res.redirect('/admin/vdept');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//Doctor:

router.get('/addDoct', function(req, res){
	user.getAll(function(results){
		if(results != null){
			res.render('home/addDoctor', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
	
});


router.post('/addDoct', function(req, res){
	
	
	var data = {
		docname: req.body.doctname,
		docnum: req.body.doctnumber,
		docemail:req.body.doctmail,
		docdepartment:req.body.doctdept,
		docaddress:req.body.doctaddress,
		docpass: req.body.pass
	};
	if(req.body.pass == req.body.confirmpass)
	{
	doctor.create(data, function(status){

		if(status){
			alert("Doctor is Successfully Created");
			res.redirect('/admin/addDoct');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/admin/addDoct');
		}
	});
}
else
{
	alert("Password And Confirm Password Did Not Matched");
			res.redirect('/admin/addDoct');
}

});


router.get('/vdoct', function(req, res){

	doctor.getAll(function(results){
		if(results != null){
			res.render('home/viewDoctor', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/doctedit/:id', function(req, res){
    
	doctor.getById(req.params.id, function(result){
		     if(result != null){
			res.render('home/doctorEdit', {doctor: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/doctedit/:id', function(req, res){
	var data = {
		docname: req.body.doctname,
		docnum: req.body.doctnumber,
		docemail:req.body.doctmail,
		docdepartment:req.body.doctdept,
		docaddress:req.body.doctaddress,
		id:req.params.id
	};

	doctor.update(data, function(status){

		if(status){
			res.redirect('/admin/vdoct');			
		}else{
			res.redirect('/admin/doctedit/'+req.params.id);
		}
	});
});

router.get('/doctdelete/:id', function(req, res){

	doctor.delete(req.params.id, function(status){
		if(status){
			res.redirect('/admin/vdoct');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//patient



router.get('/addPatient', function(req, res){
	doctor.getAll(function(results){
		if(results != null){
			res.render('home/addPatient', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
	
});

router.post('/addPatient', function(req, res){
	
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
			res.redirect('/admin/addPatient');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/admin/addPatient');
		}
	});
}
else{
	alert("Password And Confirm Password Did Not Matched");
			res.redirect('/admin/addPatient');
		
}
});


router.get('/vpct', function(req, res){

	patient.getAll(function(results){
		if(results != null){
			res.render('home/viewPatient', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/pctedit/:id', function(req, res){
    
	patient.getById(req.params.id, function(result){
		     if(result != null){
			res.render('home/patientEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/pctedit/:id', function(req, res){
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
			res.redirect('/admin/vpct');			
		}else{
			res.redirect('/admin/pctedit/'+req.params.id);
		}
	});
});

router.get('/pctdelete/:id', function(req, res){

	patient.delete(req.params.id, function(status){
		if(status){
			res.redirect('/admin/vpct');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//Nurse



router.get('/addNurse', function(req, res){
	
			res.render('home/addNurse');			
		
	
});

router.post('/addNurse', function(req, res){
	req.checkBody('nname', 'Username field cannot be empty.').notEmpty();
	req.checkBody('nnumber', 'Number field cannot be empty.').notEmpty();
	req.checkBody('nemail', 'Email field cannot be empty.').notEmpty();
	req.checkBody("naddress", "Address field cannot be empty").notEmpty();
	req.checkBody("pass", "Password field cannot be empty").notEmpty();
	req.checkBody("confirmpass", "Confirm Password field cannot be empty").notEmpty();
    req.checkBody('confirmpass', 'Password and confirm password did not matched.').equals(req.body.pass);
	req.checkBody('pass', 'Password must be between 4-60 characters long.').len(4, 60);
    //req.checkBody("pass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody("nnumber", "Invalid Phone Number").matches(/^[0-9_-]+$/, 'i');
	req.checkBody("nnumber", "Invalid Phone Number").len(11,11);
	
	const err = req.validationErrors();

	if(err){		
		res.render('home/addNurse', {errors: err});
		//console.log(err);
	}else{
	var data = {
		nrname: req.body.nname,
		nrnum: req.body.nnumber,
		nremail:req.body.nemail,
		nraddress:req.body.naddress,
		nrpassword:req.body.pass
	};
	nurse.create(data, function(status){

		if(status){
			alert("Nurse is Successfully Created");
			res.redirect('/admin/addNurse');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/admin/addNurse');
		}
	});
}
});


router.get('/vnurse', function(req, res){

	nurse.getAll(function(results){
		if(results != null){
			res.render('home/viewNurse', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/nurseedit/:id', function(req, res){
    
	nurse.getById(req.params.id, function(result){
		     if(result != null){
			res.render('home/nurseEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/nurseedit/:id', function(req, res){
	var data = {
		nrname: req.body.nname,
		nrnum: req.body.nnumber,
		nremail:req.body.nemail,
		nraddress:req.body.naddress,
        id:req.params.id
	};
	
	nurse.update(data, function(status){

		if(status){
			res.redirect('/admin/vnurse');			
		}else{
			res.redirect('/admin/nurseedit/'+req.params.id);
		}
	});
});

router.get('/nursedelete/:id', function(req, res){

	nurse.delete(req.params.id, function(status){
		if(status){
			res.redirect('/admin/vnurse');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//NoticeBoard



router.get('/addNotice', function(req, res){
	
			res.render('home/addNotice');			
		
	
});

router.post('/addNotice', function(req, res){
	
	req.checkBody('title', 'Title field cannot be empty.').notEmpty();
	req.checkBody('message', 'Message field cannot be empty.').notEmpty();

	
	const err = req.validationErrors();

	if(err){		
		res.render('home/addNotice', {errors: err});
		//console.log(err);
	}else{
	var data = {
		tname: req.body.title,
		tmess: req.body.message,

	};
	notice.create(data, function(status){

		if(status){
			alert("Notice is Successfully Created");
			res.redirect('/admin/addNotice');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/admin/addNotice');
		}
	});
}
});


router.get('/vnotice', function(req, res){

	notice.getAll(function(results){
		if(results != null){
			res.render('home/viewNotice', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/noticeedit/:id', function(req, res){
    
	notice.getById(req.params.id, function(result){
		     if(result != null){
			res.render('home/noticeEdit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/noticeedit/:id', function(req, res){
	var data = {
		tname: req.body.title,
		tmess: req.body.message,
        id:req.params.id
	};
	
	notice.update(data, function(status){

		if(status){
			res.redirect('/admin/vnotice');			
		}else{
			res.redirect('/admin/noticeedit/'+req.params.id);
		}
	});
});

router.get('/noticedelete/:id', function(req, res){

	notice.delete(req.params.id, function(status){
		if(status){
			res.redirect('/admin/vnotice');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

//Admin



router.get('/addAdmin', function(req, res){
	
			res.render('home/addAdmin');			
		
	
});

router.post('/addAdmin', function(req, res){
	
	req.checkBody('aname', 'Username field cannot be empty.').notEmpty();
	req.checkBody('num', 'Number field cannot be empty.').notEmpty();
	req.checkBody('email', 'Email field cannot be empty.').notEmpty();
	req.checkBody("address", "Address field cannot be empty").notEmpty();
	req.checkBody("pass", "Password field cannot be empty").notEmpty();
	req.checkBody("confirmpass", "Confirm Password field cannot be empty").notEmpty();
    req.checkBody('confirmpass', 'Password and confirm password did not matched.').equals(req.body.pass);
	req.checkBody('pass', 'Password must be between 4-60 characters long.').len(4, 60);
    //req.checkBody("pass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody("num", "Invalid Phone Number").matches(/^[0-9_-]+$/, 'i');
	req.checkBody("num", "Invalid Phone Number").len(11,11);
	
	const err = req.validationErrors();

	if(err){		
		res.render('home/addAdmin', {errors: err});
		//console.log(err);
	}else{
	var data = {
		name: req.body.aname,
		number: req.body.num,
		email: req.body.email,
		password: req.body.pass,
		address: req.body.address,

	};
	admin.create(data, function(status){

		if(status){
			alert("Admin is Successfully Created");
			res.redirect('/admin/addAdmin');			
		}else{
		    alert("Sorry..There Is Some Error Occur");
			res.redirect('/admin/addAdmin');
		}
	});
}
});


router.get('/vadmin', function(req, res){

	admin.getAll(function(results){
		if(results != null){
			res.render('home/viewAdmin', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});


router.get('/adminedit/:id', function(req, res){
    
	admin.getById(req.params.id, function(result){
		     if(result != null){
			res.render('home/adminEdit', {doctor: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});		

	
});

router.post('/adminedit/:id', function(req, res){
	var data = {
		name: req.body.aname,
		number: req.body.num,
		email: req.body.email,
		address: req.body.address,
        id:req.params.id
	};
	
	admin.update(data, function(status){

		if(status){
			res.redirect('/admin/vadmin');			
		}else{
			res.redirect('/admin/adminedit/'+req.params.id);
		}
	});
});

router.get('/admindelete/:id', function(req, res){

	admin.delete(req.params.id, function(status){
		if(status){
			res.redirect('/admin/vadmin');			
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
	admin.validate(data, function(result){
		if(result.length > 0){
			res.render('home/profileEdit', {user: result[0]});			
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
	
	admin.updatePro(data, function(status){

		if(status){
			res.redirect('/admin/managePro');			
		}else{
			res.send("Error");
		}
	});
});
//Change Password

router.get('/cngPass', function(req, res){
    	res.render('home/acngpass');			
		
});
router.post('/cngPass', function(req, res){
    req.checkBody("new", "Password field cannot be empty").notEmpty();
	req.checkBody("confirm", "Confirm Password field cannot be empty").notEmpty();
    req.checkBody('confirm', 'Password and confirm password did not matched.').equals(req.body.new);
	req.checkBody('new', 'Password must be between 4-60 characters long.').len(4, 60);
    //req.checkBody("pass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	
	const err = req.validationErrors();

	if(err){		
		res.render('home/acngpass', {errors: err});
		//console.log(err);
	}else{
	var data = {
		password: req.body.new,
	    id:req.session.un
	};
	
	admin.updatePass(data, function(status){

		if(status){
			res.redirect('/admin/cngPass');
			alert("Password is Successfully Changed");
		}else{
			res.send("Error");
		}
	});
}
});

module.exports = router;