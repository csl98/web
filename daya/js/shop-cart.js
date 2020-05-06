oneMore(getByClass(document,"onemore")[0],"a");
var oCart=document.getElementById("shopcart");
var oTbody=oCart.getElementsByTagName("tbody")[0];
var oBottom=getByClass(document,"bottom")[0];
fnCreate();
var aLabel=oTbody.getElementsByTagName("label");
var oLabelTop=oCart.getElementsByTagName("label")[0];
var oLabelBottom=oBottom.getElementsByTagName("label")[0];
var arr=[oLabelTop,oLabelBottom];
for( var i=0; i<aLabel.length; i++){
	arr.push(aLabel[i]);
}
for( var i=0; i<arr.length; i++){
	arr[i].chk=arr[i].parentNode.children[0];
	arr[i].onclick=function(){
		this.chk.click();
		for( var i=0; i<arr.length; i++){
			if(arr[i].chk.checked==true){
				arr[i].className="on";
			}else{
				arr[i].className="";
			}
		}
		count();
	}
}
oLabelTop.chk.onclick=oLabelBottom.chk.onclick=function(){
	for( var i=0; i<aLabel.length; i++){
		oLabelTop.chk.checked=oLabelBottom.chk.checked=aLabel[i].chk.checked=this.checked;
	}
}
for( var i=0; i<aLabel.length; i++){
	aLabel[i].chk.onclick=function(){
		if(!this.checked){
			oLabelTop.chk.checked=oLabelBottom.chk.checked=false;
		}
	}
	aLabel[i].addEventListener("click",function(){
		if(getByClass(oTbody,"on").length==aLabel.length){
			oLabelTop.chk.checked=oLabelBottom.chk.checked=true;
			oLabelTop.className=oLabelBottom.className="on";
		}
	})
}
function count(){
	var oSelectedTotal=oBottom.getElementsByTagName("i")[0];
	var oAmountTotalBottom=oBottom.getElementsByTagName("b")[0];
	var oAmountTotalTop=getByClass(document,"onemore")[0].getElementsByTagName("b")[0];
	var aMoney=oTbody.getElementsByTagName("em");
	var sum=0;
	var money=0;
	for( var i=0; i<aLabel.length; i++){
		if(aLabel[i].className=="on"){
			sum+=parseInt(fnNum()[i].value);
			money+=Number(aMoney[i].innerHTML.slice(1));
		}
		oSelectedTotal.innerHTML=sum;
		oAmountTotalTop.innerHTML=oAmountTotalBottom.innerHTML="￥"+money.toFixed(2);
	}
	if(aLabel.length==0){
		oSelectedTotal.innerHTML=0;
		oAmountTotalTop.innerHTML=oAmountTotalBottom.innerHTML="￥"+0+".00";
	}
}

function fnNum(){
	var aNum=getByClass(document,"num");
	var aUP=oTbody.getElementsByTagName("b");
	var aMoney=oTbody.getElementsByTagName("em");
	var aReduce=[];
	var aAdd=[];
	var aInput=[];
	for( var i=0; i<aNum.length; i++){
		aReduce.push(aNum[i].getElementsByTagName("a")[0]);
		aAdd.push(aNum[i].getElementsByTagName("a")[1]);
		aInput.push(aNum[i].getElementsByTagName("input")[0]);
	}
	for( var i=0; i<aNum.length; i++){
		aInput[i].index=aReduce[i].index=aAdd[i].index=i;
		aReduce[i].onclick=function(){
			if(aInput[this.index].value<2){
				aInput[this.index].value=1
			}else{
				aInput[this.index].value=parseInt(aInput[this.index].value)-1;
			}
			aMoney[this.index].innerHTML="￥"+(parseInt(aInput[this.index].value)*Number(aUP[this.index].innerHTML.slice(1))).toFixed(2);
			count();
		}
		aAdd[i].onclick=function(){
			if(aInput[this.index].value>9){
				aInput[this.index].value=10;
			}else{
				aInput[this.index].value=parseInt(aInput[this.index].value)+1;
			}
			aMoney[this.index].innerHTML="￥"+(parseInt(aInput[this.index].value)*Number(aUP[this.index].innerHTML.slice(1))).toFixed(2);
			count();
		}
		aInput[i].onkeyup=function(event){
			var e=event||window.event;
			var key=e.keycode||e.which||e.charcode;
			if(key!=37&&key!=39){
				this.value=this.value.replace(/\D/g,"");
			}
			if(this.value<1){
				this.value=1;
			}else if(this.value>9){
				this.value=10;
			}
		}
		aInput[i].onfocus=function(event){
			this.value="";
		}
		aInput[i].onblur=function(event){
			this.value=this.value.replace(/\D/g,"");
			if(this.value==""){this.value=1;}
			aMoney[this.index].innerHTML="￥"+parseInt(this.value)*parseInt(aUP[this.index].innerHTML.slice(1))+".00";
			count();
		}

	}
	return aInput;
}
fnNum();
var aOperation=getByClass(document,"operation");
var aMoveIn=[];
var aDel=[];
for( var i=0; i<aOperation.length; i++){
	aMoveIn.push(aOperation[i].getElementsByTagName("a")[0]);
	aDel.push(aOperation[i].getElementsByTagName("a")[1]);
}
for( var i=0; i<aOperation.length; i++){
	aDel[i].index=i;
	aDel[i].onclick=function(){
		if(confirm("确认删除？")){
			oTbody.removeChild(this.parentNode.parentNode);
			aInfo.splice(this.index,1,"null");
			setLocalStorage("cart",aInfo);
			fnNum();
			count();
			if(aLabel.length==0){
				oLabelTop.chk.checked=oLabelBottom.chk.checked=false;
				oLabelTop.className=oLabelBottom.className="";
				oLabelTop.onclick=oLabelBottom.onclick=null;
			}
			if(getByClass(oTbody,"on").length==aLabel.length){
				oLabelTop.chk.checked=oLabelBottom.chk.checked=true;
				oLabelTop.className=oLabelBottom.className="on";
			}
		}
	}
}
if(aLabel.length==0){
	oLabelTop.chk.checked=oLabelBottom.chk.checked=false;
	oLabelTop.className=oLabelBottom.className="";
	oLabelTop.onclick=oLabelBottom.onclick=null;
}
var oDel=oBottom.getElementsByTagName("a")[0];
var aInfo=getLocalStorage("cart");
oDel.onclick=function(){
	var aTr=oTbody.getElementsByTagName("tr");
	var arr=[];
	for( var i=0; i<aLabel.length; i++){
		if(aLabel[i].className=="on"){
			arr.push(aLabel[i].parentNode.parentNode)
		}
	}
	if(arr.length!=0){
		if(confirm("确认删除？")){
			for( var i=0; i<arr.length; i++){
				oTbody.removeChild(arr[i]);
				aInfo.splice(arr[i].index,1,"null");
			}
			setLocalStorage("cart",aInfo);
			count();
			if(aLabel.length==0){
				oLabelTop.chk.checked=oLabelBottom.chk.checked=false;
				oLabelTop.className=oLabelBottom.className="";
				oLabelTop.onclick=oLabelBottom.onclick=null;
			}
		}
	}else{
		alert("请先选择商品")
	}
}

function fnCreate(){
	var aInfo=getLocalStorage("cart");
	if(aInfo){
		for( var i=0; i<aInfo.length; i++){
			if(aInfo[i]!="null"){
				var cTr=document.createElement("tr");
				var trInnerHtml="<td style='text-align:left; padding-left:20px;'><input type='checkbox'><a href='pro-details.html'><img style='width:105px; height:105px' src="+aInfo[i][0]+"></a><label></label></td><td style='text-align:left;'><a href='pro-details.html'>"+aInfo[i][1]+"</a></td><td>20mm</td><td><span>￥"+aInfo[i][2]+"</span><b>￥"+aInfo[i][3]+"</b></td><td class='num'><a href='javascript:;'>-</a><input type='text' value='"+aInfo[i][4]+"'><a href='javascript:;'>+</a></td><td><em>￥"+Number(aInfo[i][3]*aInfo[i][4]).toFixed(2)+"</em></td><td class='operation'><a href='javascript:;'>移入收藏夹</a><a href='javascript:;'>删除</a></td>";
				cTr.innerHTML=trInnerHtml;
				cTr.index=i;
				oTbody.appendChild(cTr);
			}
		}
	}
}

var arr2=[];
if(aInfo){
	for( var i=0; i<aInfo.length; i++){
		arr2.push(aInfo[i])
	}
}
getByClass(document,"submit")[0].onclick=getByClass(document,"submit")[1].onclick=function(){
	var oSelectedTotal=oBottom.getElementsByTagName("i")[0];
	var arr=[];
	if(oSelectedTotal.innerHTML==0){
		alert("请先选择商品");
		return false;
	}else{
		for( var i=0; i<aLabel.length; i++){
			if(aLabel[i].className=="on"){
				aInfo[aLabel[i].parentNode.parentNode.index].splice(4,1,getByClass(aLabel[i].parentNode.parentNode,"num")[0].getElementsByTagName("input")[0].value);
				arr.push(aInfo[aLabel[i].parentNode.parentNode.index]);
				arr2.splice(i,1,"null");
			}
		}
		setLocalStorage("order",arr);
		setLocalStorage("cart",arr2);
	}
}