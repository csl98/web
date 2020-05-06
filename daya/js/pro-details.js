var oReduce=document.getElementById("reduce");
var oAdd=document.getElementById("add");
var oNumber=document.getElementById("number");
var oStock=document.getElementById("stock");
oReduce.onclick=function(){
	if(oNumber.value>1){
		oNumber.value=--oNumber.value;
	}
}
oAdd.onclick=function(){
	if(oNumber.value<parseInt(oStock.innerHTML)){
		oNumber.value=++oNumber.value;
	}
}
oNumber.onkeyup=function(event){
	var e=event||window.event;
	var key=e.keycode||e.which||e.charcode;
	if(this.value>parseInt(oStock.innerHTML)){this.value=parseInt(oStock.innerHTML);}
	if(this.value<1){this.value=1;}
	if(key!=37&&key!=39){this.value=this.value.replace(/\D/g,"")}
	if(/^0/.test(this.value)){this.value=this.value.replace(/^0/g,"")}
}
oNumber.onblur=function(){
	this.value=this.value.replace(/\D/g,"");
}





var oPropic=getByClass(document,"propic")[0];
var oBigpic=oPropic.getElementsByTagName("img")[0];
var aLi=oPropic.getElementsByTagName("li");
var aTab=getByClass(document,"tab");
var aSmallpic=[];
for( var i=0; i<aLi.length; i++){
	aSmallpic.push(aLi[i].getElementsByTagName("img")[0]);
}
oneMore(oPropic,"li",function(obj){
	oBigBoxImg.src=oBigpic.src=aSmallpic[obj.index].src;
});
oneMore(getByClass(document,"type")[0],"a");
oneMore(getByClass(document,"onemore")[0],"a",function(obj){
	for( var i=0; i<aTab.length; i++){
		aTab[i].style.display="none";
	}
	aTab[obj.index].style.display="block";
});
oneMore(getByClass(document,"right")[1],"a");

var oBuy=getByClass(document,"buy")[0];
var oAddCart=getByClass(document,"add")[0];
var aInfo=getLocalStorage("cart")||[];
oAddCart.clickNum=1;
oAddCart.onclick=function(){
		var picPath=getByClass(document,"propic")[0].getElementsByTagName("img")[0].src;
		var tradeName=this.parentNode.getElementsByTagName("h2")[0].innerHTML;
		var price=this.parentNode.getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML.slice(1);
		var RMB=this.parentNode.getElementsByTagName("p")[1].getElementsByTagName("b")[0].innerHTML.slice(1);
		var NUM=document.getElementById("number").value;
		aInfo.push([picPath,tradeName,price,RMB,NUM]);
		setLocalStorage("cart",aInfo);
		cartNum();
		this.innerHTML="已加入购物车*"+this.clickNum++;
}
oBuy.onclick=function(){
	var picPath=getByClass(document,"propic")[0].getElementsByTagName("img")[0].src;
	var tradeName=this.parentNode.getElementsByTagName("h2")[0].innerHTML;
	var price=this.parentNode.getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML.slice(1);
	var RMB=this.parentNode.getElementsByTagName("p")[1].getElementsByTagName("b")[0].innerHTML.slice(1);
	var NUM=document.getElementById("number").value;
	setLocalStorage("order",[[picPath,tradeName,price,RMB,NUM]]);
	cartNum();
}


var oSmallBox=getByClass(document,"small-box")[0];
var oFloatBox=getByClass(document,"float-box")[0];
var oMark=getByClass(document,"mark")[0];
var oBigBox=getByClass(document,"big-box")[0];
var oBigBoxImg=oBigBox.getElementsByTagName("img")[0];
oMark.onmouseover=function(){
	oFloatBox.style.display="block";
	oBigBox.style.display="block";
	oSmallBox.getElementsByTagName("i")[0].style.display="none";
}
oMark.onmouseout=function(){
	oFloatBox.style.display="none";
	oBigBox.style.display="none";
	oSmallBox.getElementsByTagName("i")[0].style.display="block";
}
oMark.onmousemove=function(event){
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var e=window.event||event;
	var left=e.clientX-oPropic.offsetLeft-oSmallBox.offsetLeft-oFloatBox.offsetWidth/2;
	var top=e.clientY-oPropic.offsetTop-oSmallBox.offsetTop-oFloatBox.offsetHeight/2+scrollTop;
	if(left<0){left=0}else if(left>(oSmallBox.offsetWidth-oFloatBox.offsetWidth)){left=oSmallBox.offsetWidth-oFloatBox.offsetWidth};
	if(top<0){top=0}else if(top>(oSmallBox.offsetHeight-oFloatBox.offsetHeight)){top=oSmallBox.offsetHeight-oFloatBox.offsetHeight};
	oFloatBox.style.left=left+oSmallBox.offsetLeft+"px";
	oFloatBox.style.top=top+"px";
	var percentX=left/(oMark.offsetWidth-oFloatBox.offsetWidth);
	var percentY=top/(oMark.offsetHeight-oFloatBox.offsetHeight);
	oBigBoxImg.style.left=-percentX*(oBigBoxImg.offsetWidth-oBigBox.offsetWidth)+"px";
	oBigBoxImg.style.top=-percentY*(oBigBoxImg.offsetHeight-oBigBox.offsetHeight)+"px";
}