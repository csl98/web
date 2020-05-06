(function(){
	getByClass(document,"s-left")[0].getElementsByTagName("b")[0].innerHTML=getLocalStorage("info")[0];
	getByClass(document,"s-left")[0].getElementsByTagName("p")[0].innerHTML="寄送至："+getLocalStorage("info")[1];
	getByClass(document,"s-left")[0].getElementsByTagName("p")[1].innerHTML="电话："+getLocalStorage("info")[3];
	getByClass(document,"s-left")[0].getElementsByTagName("p")[2].innerHTML="收件人："+getLocalStorage("info")[2];
}());