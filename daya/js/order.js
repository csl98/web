(function(){
	var aTab=getByClass(document,"tab");
	var oTab=document.getElementById("tab");
	oneMore(oTab,"li",function(obj){
		for( var i=0; i<aTab.length; i++){
			aTab[i].style.display="none";
		}
		aTab[obj.index].style.display="block";
	});

	var aSpan=oTab.getElementsByTagName("span");
	var aNum=[];
	for( var i=0; i<aSpan.length; i++){
		aNum.push(parseInt(aSpan[i].innerHTML.slice(1)));
	}
	for( var i=0; i<aNum.length; i++){
		if(aNum[i]>0){
			aSpan[i].style.color="#ca2821";
		}
	}
}());