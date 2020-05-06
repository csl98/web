(function(){
	var oUsername=getByClass(document,"username")[0].getElementsByTagName("input")[0];
	var oPasswordOne=getByClass(document,"password")[0].getElementsByTagName("input")[0];
	var oPasswordTwo=getByClass(document,"password")[1].getElementsByTagName("input")[0];
	var oEmail=getByClass(document,"email")[0].getElementsByTagName("input")[0];
	var oTel=getByClass(document,"tel")[0].getElementsByTagName("input")[0];
	var oVerification=getByClass(document,"verification")[0].getElementsByTagName("input")[0];
	var oLabel=getByClass(document,"checkdiv")[0].getElementsByTagName("label")[0];
	var oSubmit=getByClass(document,"submit")[0];
	var oCode=getByClass(document,"verification")[0].getElementsByTagName("i")[0];
	inputText(oUsername,"name","4-20位字母数字");
	inputText(oEmail,"email","请输入正确的邮箱");
	inputText(oTel,"tel","请输入11位手机号码");
	inputText(oVerification,"code","请输入4位验证码",oCode);
	passwordText(oPasswordOne,oPasswordTwo,"password");
	var clickNum=0;
	oLabel.booleanValue=false;
	oLabel.onclick=function(){
		document.getElementById("check").click();
		if(clickNum%2==0){this.style.backgroundImage="url(img/checked.png)";oLabel.booleanValue=true;}
		else{this.style.backgroundImage="url(img/nocheck.png)";oLabel.booleanValue=false;}
		clickNum++;
	}
	oCode.onselectstart=function(){return false}
	oCode.onclick=function(){
		var str="QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm123456789";
		oCode.style.textAlign="center";
		oCode.style.lineHeight="37px";
		oCode.style.fontSize="18px";
		oCode.style.color=randomColor(100,150);
		oCode.innerHTML=str[randomNum(0,34)]+str[randomNum(0,34)]+str[randomNum(0,34)]+str[randomNum(0,34)];
	}
	oCode.onclick();
	oSubmit.onclick=function(){
		if(!(oUsername.booleanValue&&oPasswordOne.booleanValue&&oPasswordTwo.booleanValue&&oEmail.booleanValue&&oTel.booleanValue&&oVerification.booleanValue)){
			alert("请先填写正确后再注册");
			return false;
		}else{
			if(!oLabel.booleanValue){
				alert("请先勾选用户协议");
				return false;
			}
			var sName=oUsername.value;
			var sPassword=oPasswordTwo.value;
			var sEmail=oEmail.value;
			var sTel=oTel.value;
			setLocalStorage("userInfo",[sName,sPassword,sEmail,sTel]);
		}
		if(confirm("注册成功，是否跳到登陆页？")){
			window.location.href="login.html";
		}
		return false;
	}
}());