(function(){
	var oPayMode=getByClass(document,"pay-mode")[0];
	var aMode=oPayMode.getElementsByTagName("a");
	var aLabel=oPayMode.getElementsByTagName("label");
	var oCurMode=document.getElementById("curmode");
	var oPassword=document.getElementById("password");
	var oSubmit=document.getElementById("submit");
	oneMore(oPayMode,"label",function(obj){
		oCurMode.getElementsByTagName("img")[0].src="img/mode"+(obj.index+1)+".png";
	})
	for(var i=0; i<aMode.length; i++){
		aMode[i].index=i;
		aMode[i].onclick=function(){
			aLabel[this.index].click();
		}
	}
	if(navigator.userAgent.toLowerCase().indexOf("chrome")==-1){
		oPassword.style.letterSpacing=41+"px";
	}
	oPassword.onkeyup=function(){
		this.value=this.value.replace(/\D/g,"");
		if(this.value==""){
			this.style.color="#999";
		}
	}
	oPassword.onkeydown=function(){
		this.style.color="transparent";
	}
	oPassword.onfocus=function(){
		if(this.value==""){
			this.style.color="#999";
		}
	}
	oSubmit.onclick=function(){
		var	aInfo=getLocalStorage("order");
		if(oPassword.value.length!=6){alert("请先输入六位数密码");return false}
		if(confirm("是否成功?")){
			setLocalStorage("order-details",aInfo);
			window.localStorage.removeItem("order");
			window.location.href="pay-success.html";
		}else{
			window.location.href="pay-failure.html";
		}
		return false;
	}
	getByClass(document,"header")[0].getElementsByTagName("b")[0].innerHTML=getByClass(document,"middle")[0].getElementsByTagName("b")[0].innerHTML=getByClass(document,"middle")[0].getElementsByTagName("b")[1].innerHTML="￥"+getLocalStorage("info")[0];

}());
