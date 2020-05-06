var oSpan=document.getElementById("code");
var oI = document.getElementsByTagName("i")[0];
randomCode(oSpan,4);
oSpan.onclick = function(){randomCode(oSpan,4)};

oI.onclick = document.getElementsByTagName("span")[1].onclick = function () {
    if(oI.className!=="on"){
        oI.className="on";
    }else{
        oI.className="";
    }
};
var username = new CheckInput('username', { regexp: [testRegExp.email,testRegExp.tel], error: '请输入正确的手机号/邮箱' });
var vcode = new CheckInput('vcode', { code: () => oSpan.innerHTML, error: '验证码错误' });
var password = new CheckInput('password', { error: '请输入密码' });
var confirm = new CheckInput('confirm', { code: () => password.el.value, error: '密码不一致' });
document.getElementById('submit').onclick = function () {
    username.fnBlur();
    vcode.fnBlur();
    password.fnBlur();
    confirm.fnBlur();
    if(username.bool && vcode.bool && password.bool && confirm.bool){
        if(oI.className!=="on"){
            alert("请先勾选用户协议");
        }else{
            newAjax("POST","admin/handle.php","register="+JSON.stringify([username.el.value,confirm.el.value]),function(str){
                console.log(str);
                if(str==="2"){
                    alert("用户已存在");
                    username.el.value = '';
                    vcode.el.value = '';
                    password.el.value = '';
                    confirm.el.value = '';
                    oSpan.click();
                }else if (str === '1') {
                    alert("注册成功");
                    location.href="login.html";
                }
            });
        }
    }
    return false;
};