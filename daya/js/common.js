function getByClass(oParent,sClass){
	var aEle=oParent.getElementsByTagName("*");
	var aResult=[];
	var str=[];
	for(var i=0; i<aEle.length; i++){
		str.push(" "+aEle[i].className+" ");
	}
	for(var i=0; i<aEle.length; i++){
		if(str[i].search(eval("/ "+sClass+" /"))!=-1){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj)[attr];
	}
	else{
		return obj.currentStyle[attr];
	}
}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		for(var attr in json){
			var cur=0;
			if(attr=="opacity"){
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur!=json[attr]){
				bStop=false;
			}
			if(attr=="opacity"){
				obj.style.filter="alpha(opacity:"+(cur+speed)+")";
				obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[attr]=cur+speed+"px";
			}
			if(bStop){
				clearInterval(obj.timer);
				if(fn)fn();
			}
		}
	},30)
}
function oneMore(oParent,sTagName,fn){
	var arr=oParent.getElementsByTagName(sTagName);
	for( var i=0; i<arr.length; i++){
		arr[i].index=i;
		arr[i].onclick=function(){
			for( var i=0; i<arr.length; i++){
				arr[i].className="";
			}
			this.className="on";
			if(fn)fn(this);
		}
	}
}
function inputText(obj,sMode,sTip,oCode){
	obj.booleanValue=false;
	var val=obj.value;
	var oldColor=getStyle(obj,"color");
	obj.onfocus=function(){
		if(this.value==val||this.value==sTip||this.value=="验证码错误"){
			this.value="";
			this.style.color=oldColor;
		}
	}
	obj.onblur=function(){
		if(this.value==""){
			this.value=val;
			obj.booleanValue=false;
		}
		else if(sMode&&!testRegExp[sMode].test(this.value)){
			this.value=sTip;
			this.style.color="red";
			obj.booleanValue=false;
		}
		else if(oCode&&this.value.toUpperCase()!=oCode.innerHTML.toUpperCase()){
			this.value="验证码错误";
			this.style.color="red";
			obj.booleanValue=false;
		}
		else{
			obj.booleanValue=true;
		}
	}
}
function passwordText(one,two,sMode){
	var labelOne=one.parentNode.getElementsByTagName("label")[0];
	var oldColor=getStyle(labelOne,"color");
	one.booleanValue=false;
	one.num=0;
	one.onfocus=function(){
		if(this.value==""){
			labelOne.style.display="none";
			labelOne.innerHTML="请输入您的密码";
			labelOne.style.color=oldColor;
			one.booleanValue=false;
		}else{
			one.booleanValue=true;
		}
	}
	one.onblur=function(){
		if(this.value==""){
			labelOne.style.display="";
			one.booleanValue=false;
		}
		else if(sMode&&!testRegExp[sMode].test(this.value)){
			this.value="";
			labelOne.style.display="";
			labelOne.innerHTML="请输入8-16位字母数字";
			labelOne.style.color="red";
			one.booleanValue=false;
		}
		else{
			one.booleanValue=true;
		}
		this.num=this.value.length;
	}
	if(two){
		one.onkeyup=function(){
			if(this.value.length!=this.num){
				two.value="";
				labelTwo.style.display="";
				labelTwo.innerHTML="请再次输入密码";
				labelTwo.style.color=oldColor;
				two.booleanValue=false;
			}
		}
		two.booleanValue=false;
		var labelTwo=two.parentNode.getElementsByTagName("label")[0];
		two.onfocus=function(){
			if(this.value==""){
				labelTwo.style.display="none";
				labelTwo.innerHTML="请再次输入密码";
				labelTwo.style.color=oldColor;
				two.booleanValue=false;
			}
		}
		two.onblur=function(){
			if(this.value==""){
				labelTwo.style.display="";
				two.booleanValue=false;
			}
			else if(this.value!=one.value&&this.value!=""){
				this.value="";
				labelTwo.style.display="";
				labelTwo.innerHTML="两次输入的密码不一致";
				labelTwo.style.color="red";
				two.booleanValue=false;
			}
			else{
				two.booleanValue=true;
			}
		}
		two.onkeyup=function(){
			if(one.value==""){
				this.value=this.value.replace(/./g,"");
				labelTwo.style.display="";
				labelTwo.innerHTML="请先输入第一次密码";
				labelTwo.style.color="red";
				this.blur();
			}
		}
	}
}
function setTbodyInnerHTML(obj,sHtml){
	var cDiv=document.createElement("div");
	cDiv.innerHTML="<table>"+sHtml+"</table>";
	obj.appendChild(cDiv.firstChild.firstChild.firstChild);
}
function setLocalStorage(key,val){
	localStorage.setItem(key,JSON.stringify(val));
}
function getLocalStorage(key){
	return JSON.parse(localStorage.getItem(key));
}
function randomNum(min,max){
	return Math.round(Math.random()*(max-min)+min);
}
function randomColor(min,max){
	var R=randomNum(min,max);
	var G=randomNum(min,max);
	var B=randomNum(min,max);
	return "rgb("+R+","+G+","+B+")";
}
(function(){
	var aLabel=document.getElementsByTagName("label");
	var aCanvas=document.getElementsByTagName("canvas");
	for( var i=0; i<aLabel.length; i++){
		aLabel[i].onselectstart=function(){return false}
	}
	for( var i=0; i<aCanvas.length; i++){
		aCanvas[i].onselectstart=function(){return false}
	}
}());
function cartNum(){
	var oCart=getByClass(document,"cart")[0];
	var arr=getLocalStorage("cart");
	var arr1=[];
	if(arr){
		for( var i=0; i<arr.length; i++){
			if(arr[i]!="null"){
				arr1.push(arr[i]);
			}
		}
		if(oCart){
			oCart.innerHTML="购物车"+arr1.length+"件";
		}
	}
}
cartNum();
(function(){
	var aInfo=getLocalStorage("cart");
	var arr=[];
	if(aInfo){
		if(aInfo.length==0){
			localStorage.removeItem("cart");
		}
		for( var i=0; i<aInfo.length; i++){
			if(aInfo[i]=="null"){
				arr.push(i);
			}
		}
		arr=arr.reverse();
		for( var i=0; i<arr.length; i++){
			aInfo.splice(arr[i],1)
		}
		if(arr){
			setLocalStorage("cart",aInfo)
		}
	}
}());
var testRegExp={
	code:/^\w\w{2}\w$/,
	tel:/^[1][3,4,5,7,8][0-9]{9}$/,
	email:/^[0-9A-Za-z][\.-_0-9A-Za-z]*@(qq\.com$|163\.com$|126\.com$|263\.com$|sina\.com$|gmail\.com$|hotmail\.com$)/,
	name:/^\w\w{2,18}\w$/,
	password:/^\w\w{6,14}\w$/
};
(function(){
	var oSearchAll=getByClass(document,"search-all")[0];
	if(oSearchAll){
		var oUl=oSearchAll.parentNode.getElementsByTagName("ul")[0];
		var aAll=oSearchAll.parentNode.getElementsByTagName("a");
		oSearchAll.onselectstart=function(){return false}
		oSearchAll.onclick=function(event){
			e=window.event||event;
			if(oUl.style.display=="none"){
				oUl.style.display="block";
				document.onclick=function(){
					oUl.style.display="none";
				}
			}else{
				oUl.style.display="none";
				document.onclick=null;
			}
			e.cancelBubble=true;
		}
		oUl.onmouseover=function(){
			document.onclick=null;
		}
		oUl.onmouseout=function(){
			document.onclick=function(){
				oUl.style.display="none";
			}
		}
		for(var i=0; i<aAll.length; i++){
			aAll[i].onclick=function(event){
				e=window.event||event;
				oSearchAll.innerHTML=this.innerHTML;
				oUl.style.display="none";
				e.cancelBubble=true;
			}
		}
	}
}());
(function(){
	if(getByClass(document,"flip")[0]){
		var oInput=getByClass(document,"flip")[0].getElementsByTagName("input")[0];
		oInput.onkeyup=function(){
			this.value=this.value.replace(/\D/g,"");
		}
		oInput.onblur=function(){
			this.value=this.value.replace(/\D/g,"");
		}
	}
}());
(function(){
	if(getByClass(document,"all-pro")[0]){
		var oDropDown=getByClass(document,"all-pro")[0];
		var oMenu=getByClass(document,"menu")[0];
		oDropDown.onclick=function(event){
			e=window.event||event;
			if(getStyle(oMenu,"display")=="none"){
				oMenu.style.display="block";
				document.onclick=function(){
					oMenu.style.display="none";
				}
			}else{
				oMenu.style.display="none";
				document.onclick=null;
			}
			e.cancelBubble=true;
		}
		oDropDown.onselectstart=function(){return false}
		oMenu.onmouseover=function(){
			document.onclick=null;
		}
		oMenu.onmouseout=function(){
			document.onclick=function(){
				oMenu.style.display="none";
			}
		}
	}
}());
