(function(){
	var oP1=getByClass(document,"middle")[0].getElementsByTagName("form")[0].getElementsByTagName("p")[0];
	var oP2=getByClass(document,"middle")[0].getElementsByTagName("form")[0].getElementsByTagName("p")[1];
	var oP3=getByClass(document,"middle")[0].getElementsByTagName("form")[0].getElementsByTagName("p")[2];
	var aStar1=oP1.getElementsByTagName("em");
	var aStar2=oP2.getElementsByTagName("em");
	var aStar3=oP3.getElementsByTagName("em");
	function score(arr){
		for( var i=0; i<arr.length; i++){
			arr[i].index=i;
			arr[i].onmouseover=function(){
				for( var i=0; i<arr.length; i++){
					arr[i].className="";
				}
				for( var i=0; i<this.index; i++){
					arr[i].className="on";
				}
				this.className="on";
				this.onclick=function(){
					for( var i=0; i<arr.length; i++){
						arr[i].onmouseover=null;
						arr[i].onmouseout=null;
						arr[i].onclick=function(){
							for( var i=0; i<arr.length; i++){
								arr[i].className="";
							}
							for( var i=0; i<this.index; i++){
								arr[i].className="on";
							}
							this.className="on";
						}
					}
				}
				arr[i].onmouseout=function(){
					for( var i=0; i<arr.length; i++){
						arr[i].className="";
					}
				}
			}
		}
	}
	score(aStar1);
	score(aStar2);
	score(aStar3);
	inputText(getByClass(document,"middle")[0].getElementsByTagName("textarea")[0]);
}())