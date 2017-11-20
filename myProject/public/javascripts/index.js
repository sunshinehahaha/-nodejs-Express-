function regist(){
	$.ajax({
		url:'/users/regist',
		type:'post',
		data:{
			username:$('#username').val(),
			psw:$('#psw').val(),
			email:$('email').val()
		},
		dataType:'json',
		success:function(res){
			if(res.code != 1){
				alert(res.message);
				return;
			}
			$('#myModalRegist').modal('hide');
			$('#myModalLogin').modal('show');
			$('#usernamel').val($('#username').val());
			$('#pswl').val($('#psw').val());
		}
	})
}

function login(){
	$.ajax({
		url:'/users/login',
		type:'post',
		data:{
			username:$('#usernamel').val(),
			psw:$('#pswl').val()
		},
		dataType:'json',
		success:function(res){
			if(res.code != 1){
				alert(res.message);
				return;
			}

			$('#myModalLogin').modal('hide');
			location.href = 'main';

		}
	})
}

function jobInfo(){
	var options = { 
		dataType : "json", 
		beforeSubmit : function() { 
			console.log("将来设计一个loading效果"); 
		}, 
		success : function(result) { 
			if(result.code != 1) {
				alert(result.message);
				return;
			}
			location.reload(true);
		}, 
		error : function(result) { 
		  	console.log("失败");
		} 
	}; 
	$('#frm').ajaxSubmit(options); 
}

function edit(a,c,d,e,f,g,h){
	$('#job_id').val(a);
	$('#jobe').val(c);
	$('#companye').val(d);
	$('#experiencee').val(e);
	$('#jobtypee').val(f);
	$('#placee').val(g);
	$('#salarye').val(h);		
}	



function saveInfo(){
	
	var options = { 
		dataType : "json", 
		beforeSubmit : function() { 
			console.log("将来设计一个loading效果"); 
		}, 
		success : function(result) { 
			if(result.code != 1) {
				alert(result.message);
				return;
			}
			location.reload(true);
		}, 
		error : function(result) { 
		  	console.log("失败");
		} 
	}; 
	$('#frmEdit').ajaxSubmit(options); 

}


function delInfo(id){
	if(!confirm('真的要删除吗？')){
		return;
	}
	$.ajax({
		url:'/main/del',
		data:{
			id:id
		},
		type:'post',
		dataType:'json',
		success:function(res){
			if(res.code!==1){
				alert(res.message);
				return;
			}
			location.reload(true);
		}
	})
}

function prePage(){
	var pageNo = parseInt($('#pageNum').val());
	pageNo--;
	if(pageNo<1){
		pageNo = 1;
	}
	location.href ='/main?pageNo='+ pageNo;
}

function nextPage(){
	var pageNo = parseInt($('#pageNum').val());
	pageNo++;
	location.href ='/main?pageNo='+ pageNo;
}


function logout() {
	$.ajax({
		url:'/users/logout',
		type:'get',
		dataType:'json',
		success:function(res){
			if(res.code!==1){
				alert(res.message);
				return;
			}
			alert('注销成功');
			location.href = '/';
		}
	})
}