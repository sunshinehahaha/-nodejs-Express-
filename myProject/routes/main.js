var express = require('express');
var router = express.Router();
var JobModel = require('../model/JobModel');
var multiparty = require('multiparty');
var perPage =3;
/* GET home page. */
router.get('/', function(req, res, next) {
	var result ={
		code:1
	}
	if(!req.session.username){
		res.send('请登录！！');
		return;
	}
	JobModel.find({flag:1},(err,docs)=>{
		if(err || docs.length===0){
			result.code = -30;
			result.message = "服务器错误";
			res.render('main',{jobs:[]});
		}else{

			var pageNo = req.query.pageNo ? req.query.pageNo : 1;
			if(pageNo){
			    docs = docs.slice((pageNo-1)*perPage,perPage+(pageNo-1)*perPage);
			}

			res.render('main', {jobs:docs,pageNo:pageNo,username:req.session.username});
		}

	})
  	
});


router.post('/upload', function(req, res, next) {
	var result ={
		code:1
	}
	var form = new multiparty.Form({uploadDir:"./public/images/"});
	form.parse(req, function(err, fields, files) {
	    if(err){
	        result.code = -100;
	        result.message = "错误错误";
	        console.log(err);
      	}	
	    
      	let jobmodel = new JobModel();
      	jobmodel.logo = files.logo[0].path.replace('public',"");
      	jobmodel.job = fields.job[0];
      	jobmodel.company = fields.company[0];
      	jobmodel.experience = fields.experience[0];
      	jobmodel.jobtype = fields.jobtype[0];
      	jobmodel.place = fields.place[0];
      	jobmodel.salary = fields.salary[0];
      	jobmodel.save((err)=>{
        if(err){
          result.code = -112;
          result.message ="保存失败";
        }
        res.send(JSON.stringify(result));
    })	
   })
})


router.post('/edit', function(req, res, next) {
	var result ={
		code:1
	}
	var form = new multiparty.Form({uploadDir:"./public/images/"});
	form.parse(req, function(err, fields, files) {
	    if(err){
	        result.code = -100;
	        result.message = "错误错误";
	        console.log(err);
      	}	

	    console.log(files);
	    console.log(fields);
	    console.log(fields.job_id[0]);

	    JobModel.find({_id:fields.job_id[0]},(err,docs)=>{

	    	if(!err && docs.length > 0) {
    			var j = docs[0];
    			if(files.logo && files.logo.length > 0) {
		    		j.logo=files.logo[0].path.replace("public", "");
    			}

	      	    // j.logo = files.logo[0].path.replace('public','');
	      	    j.job = fields.job[0];
	      	    j.company = fields.company[0];
	      	    j.experience = fields.experience[0];
	      	    j.jobtype = fields.jobtype[0];
	      	    j.place = fields.place[0];
	      	    j.salary = fields.salary[0];
	      	    j.save((err)=>{
	      	    	if(err){
			          result.code = -112;
			          result.message ="保存失败";
			        }
	      	    })
	    
	            res.send(JSON.stringify(result));
            }

	    })
   })
})


router.post('/del', function(req, res, next) {
	var result ={
		code:1
	}
	// if(!req.session || !req.session.username){
	// 	res.redirect('/users/login');
	// 	return;
	// }
	JobModel.update({_id:req.body.id},{flag:0},(err)=>{
		if(err){
			result.code = -30;
			result.message = "服务器错误";
		}

		res.send(JSON.stringify(result));

	})
  	
});


module.exports = router;
