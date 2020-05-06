oneMore(document.getElementsByClassName("nav_left")[0],"li",function(obj){
	for( var i=0; i<document.getElementsByClassName("tab").length; i++){
		document.getElementsByClassName("tab")[i].className="products tab";
	}
	document.getElementsByClassName("tab")[obj.index].className="products tab on";
});
document.getElementsByClassName("nav_left")[0].addEventListener("touchmove",function(e){
	e.preventDefault();
})