(function(){
	var oMine=getByClass(document,"mine")[0];
	var oMineP=oMine.getElementsByTagName("p")[0];
	var aSpan=oMineP.getElementsByTagName("span");
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