(function(){
	var aDel=getByClass(document,"del");
	var oUl=getByClass(document,"content")[0].getElementsByTagName("ul")[0];
	for( var i=0; i<aDel.length; i++){
		aDel[i].onclick=function(){
			oUl.removeChild(this.parentNode.parentNode)
		}
	}


	var aLi=oUl.getElementsByTagName("li");
	var aDiv=[];
	for( var i=0; i<aLi.length; i++){
		aDiv.push(aLi[i].getElementsByTagName("div")[0]);
	}
	for( var i=0; i<aDiv.length; i++){
		aDiv[i].onclick=function(event){
			e=window.event||event;
			e.cancelBubble=true;
		}
	}


	oneMore(oUl,"li");
}())