(function(){
	var oCode=getByClass(document,"verification")[0].getElementsByTagName("span")[0];
	var oChange=getByClass(document,"change")[0];
	var oSubmit=getByClass(document,"submit")[0];
	var oName=getByClass(document,"name")[0].getElementsByTagName("input")[0];
	var oPassword=getByClass(document,"password")[0].getElementsByTagName("input")[0];
	var oVerification=getByClass(document,"verification")[0].getElementsByTagName("input")[0];
	inputText(oName,"name","4-20位字母数字");
	inputText(oVerification,"code","请输入4位验证码",oCode);
	passwordText(oPassword,null,"password");
	oChange.onclick=function(){
		var str="QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm123456789";
		oCode.style.textAlign="center";
		oCode.style.lineHeight="38px";
		oCode.style.fontSize="20px";
		oCode.style.color=randomColor(50,150);
		oCode.innerHTML=str[randomNum(0,34)]+str[randomNum(0,34)]+str[randomNum(0,34)]+str[randomNum(0,34)];
	}
	oChange.onclick();
	oSubmit.onclick=function(){
		if(!getLocalStorage("userInfo")){
			alert("请先注册");
			return false;
		}else if(!(oName.booleanValue&&oPassword.booleanValue&&oVerification.booleanValue)){
			alert("请先填写正确后再登陆");
			return false;
		}else if(oName.value!=getLocalStorage("userInfo")[0]||oPassword.value!=getLocalStorage("userInfo")[1]){
			alert("用户名或密码错误");
			return false;
		}else{
			alert("登陆成功");
			window.location.href="index.html";
		}
		return false;
	}
}());