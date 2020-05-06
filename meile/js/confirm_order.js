var oPay=document.getElementsByClassName("pay")[0],
	oSettlement=document.getElementsByClassName("bottom_bar")[0].getElementsByTagName("a")[0],
	oBack=oPay.getElementsByTagName("h3")[0].getElementsByTagName("a")[0],
	oI=oPay.getElementsByTagName("i")[0],
	oPAY=document.getElementById("pay"),
	oAlert=document.getElementsByClassName("alert")[0],
	scrolltop=document.body.scrollTop;
document.addEventListener("scroll",function(){
	scrolltop=document.body.scrollTop;
})
oSettlement.onclick = function(){//结算
	oPay.style.transition="all .5s";
	oPay.style.zIndex=9;
	oPay.style.opacity=100;
	document.body.style.position="fixed";
	document.body.style.top=-scrolltop+"px";
	document.body.style.left="50%";
	document.body.style.marginLeft=-document.body.offsetWidth/2+"px";
}
oBack.onclick = function(){
	oPay.style.opacity=0;
	oPay.style.zIndex=-1;
	document.body.style.position="";
	document.body.style.marginLeft="auto";
	document.body.scrollTop=Math.abs(parseInt(document.body.style.top));
}
oI.onclick = function(){
	oPay.style.opacity=0;
	oPay.style.zIndex=-1;
	document.body.style.position="";
	document.body.style.marginLeft="auto";
	document.body.scrollTop=Math.abs(parseInt(document.body.style.top));
}
oPAY.onclick = function(){//付款
	oAlert.style.transition="opacity .5s";
	oAlert.style.zIndex=9;
	oAlert.style.opacity=100;
};