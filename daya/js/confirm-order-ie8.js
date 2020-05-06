oneMore(getByClass(document,"address")[0],"li",function(obj){
	var addRessee=getByClass(document,"submit")[0].getElementsByTagName("span")[1];
	addRessee.innerHTML="收件人："+obj.children[0].innerText.slice(5).split(" ")[0];
});
inputText(getByClass(document,"message")[0].getElementsByTagName("input")[0]);
createOrder();
function createOrder(){
	var oAmountTotalTop=getByClass(document,"header")[0].getElementsByTagName("p")[0].getElementsByTagName("b")[0];
	var oAmountTotalBottom=getByClass(document,"submit")[0].getElementsByTagName("span")[0];
	var oTbody=getByClass(document,"confirm-order")[0].getElementsByTagName("tbody")[0];
	var aInfo=getLocalStorage("order");
	var num=0;
	if(aInfo){
		for( var i=0; i<aInfo.length; i++){
			if(aInfo[i]!="null"){
				var trInnerHtml="<tr><td style='text-align:left'><a href='pro-details.html'><img style='width:101px; height:101px' src="+aInfo[i][0]+"><p>"+aInfo[i][1]+"</p></a></td><td>20mm</td><td><i>￥"+aInfo[i][2]+"</i><b>￥"+aInfo[i][3]+"</b></td><td><b>"+aInfo[i][4]+"</b></td><td><em>￥"+Number(aInfo[i][3]*aInfo[i][4]).toFixed(2)+"</em></td></tr>";
				setTbodyInnerHTML(oTbody,trInnerHtml);
				num+=Number(aInfo[i][3]*aInfo[i][4]);
			}
		}
		oAmountTotalTop.innerHTML=oAmountTotalBottom.innerHTML="￥"+num.toFixed(2);
	}
}

var oSubmit=getByClass(document,"submit")[0].getElementsByTagName("a")[0];
oSubmit.onclick=function(){
	var amount=getByClass(document,"submit")[0].getElementsByTagName("span")[0].innerHTML.slice(1);
	var addRess=getByClass(document,"submit")[0].getElementsByTagName("p")[1].innerHTML.slice(4);
	var addRessee=getByClass(document,"submit")[0].getElementsByTagName("span")[1].innerHTML.slice(4);
	var tel=getByClass(document,"submit")[0].getElementsByTagName("span")[2].innerHTML.slice(3);
	var orderInfo=[amount,addRess,addRessee,tel];
	setLocalStorage("info",orderInfo);
}