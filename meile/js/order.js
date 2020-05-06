oneMore(document.getElementsByClassName("onemore")[0],"li",function(obj){
	for( var i=0; i<document.getElementsByClassName("tab").length; i++){
		document.getElementsByClassName("tab")[i].className="tab";
	}
	document.getElementsByClassName("tab")[obj.index].className="tab on";
});