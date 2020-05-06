/*
newAjax("GET","admin/handle.php","check=curuser.txt",function(str){
	if(str==1){
		if(confirm("已登录，是否注销？")){
			newAjax("GET","admin/handle.php","logout=1");
			document.body.style.display="block";
		}else{
			history.go(-1);
		}
	}else{
		newAjax("GET","admin/handle.php","check=user.txt",function(str){
			if(str==1){
				document.body.style.display="block";
			}else{
				alert("请先注册");
				location.href="register.html";
			}
		});
	}
});
*/


var oSpan=document.getElementById("code");
randomCode(oSpan,4);
oSpan.onclick = function(){randomCode(oSpan,4)};


var username = new CheckInput('username', {
    regexp: [testRegExp.tel, testRegExp.email],
    error: '请输入正确的手机号/邮箱'
});
var vcode = new CheckInput('vcode', {
    code: () => document.getElementById('code').innerHTML,
    error: '验证码错误'
});
var password = new CheckInput('password', {
    error: '请输入密码'
});

document.getElementById('submit').onclick = function () {
    username.fnBlur();
    vcode.fnBlur();
    password.fnBlur();
    if(username.bool && vcode.bool && password.bool){
        newAjax('POST', 'admin/handle.php', 'login=' + JSON.stringify([username.el.value, password.el.value]), function (val) {
            console.log(val);
            if (parseInt(val) > 0) {
                setLocalStorage('curuser', { user_id: val, user_name: username.el.value });
                location.href = 'user.html';
            } else if (val === '密码错误') {
                alert('密码错误');
                vcode.el.value = '';
                password.el.value = '';
                oSpan.click();
            } else if (val === '用户不存在') {
                alert('用户不存在');
                username.el.value = '';
                vcode.el.value = '';
                password.el.value = '';
                oSpan.click();
            }
        });
    }
    return false;
};