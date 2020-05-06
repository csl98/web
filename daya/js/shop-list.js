(function(){
	var aLi=getByClass(document,"middle")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
	for( var i=0; i<aLi.length; i++){
		if(i%4==0){
			aLi[i].style.marginLeft=0;
		}
	}
	var aP=getByClass(document,"screen")[0].getElementsByTagName("p");
	for( var i=0; i<aP.length; i++){
		oneMore(aP[i],"a");
	}
	inputText(getByClass(document,"sort")[0].getElementsByTagName("input")[0]);
}());





var aLi=getByClass(document,"middle")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
var arr=[];
var aInfo=getLocalStorage("cart")||[];
for( var i=0; i<aLi.length; i++){
	arr.push(aLi[i].getElementsByTagName("a")[0]);
}
for( var i=0; i<arr.length; i++){
	arr[i].clickNum=1;
	arr[i].onclick=function(){
		if(this.clickNum==1){
			var picPath=this.parentNode.getElementsByTagName("img")[0].src;
			var tradeName=this.parentNode.getElementsByTagName("p")[0].innerHTML;
			var price=this.parentNode.getElementsByTagName("em")[0].innerHTML.slice(1);
			var integer=this.parentNode.getElementsByTagName("b")[0].innerHTML;
			var decimal=this.parentNode.getElementsByTagName("b")[0].getElementsByTagName("i")[0].innerHTML;
			var RMB=parseInt(integer.slice(1))+"."+parseInt(decimal);
			aInfo.push([picPath,tradeName,price,RMB,this.clickNum]);
			setLocalStorage("cart",aInfo);
		}
		this.clickNum++;
		cartNum();
	}
}