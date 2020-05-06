(function(){
	getByClass(document,"right")[0].getElementsByTagName("i")[0].innerHTML="￥"+getLocalStorage("info")[0];
	getByClass(document,"address")[0].innerHTML="收货地址："+getLocalStorage("info")[1]+"&nbsp;&nbsp;"+getLocalStorage("info")[2]+"&nbsp;&nbsp;"+getLocalStorage("info")[3];
	var oTbody=document.getElementsByTagName("tbody")[0];
	var aInfo=getLocalStorage("order-details");
	if(aInfo){
		for( var i=0; i<aInfo.length; i++){
			if(aInfo[i]!="null"){
				var cTr=document.createElement("tr");
				var trInnerHtml="<td><a href='pro-details.html'><img style='width:67px; height:67px' src="+aInfo[i][0]+"><p>"+aInfo[i][1]+"</p></a></td><td><p>￥"+aInfo[i][3]+"</p></td><td><p>"+aInfo[i][4]+"</p></td><td><p>待发货</p></td><td><p>￥"+Number(aInfo[i][3]*aInfo[i][4]).toFixed(2)+"</p></td>";
				cTr.innerHTML=trInnerHtml;
				oTbody.appendChild(cTr);
			}
		}
	}
}());