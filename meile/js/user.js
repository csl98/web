/*
newAjax("GET","admin/handle.php","check=user.txt",function(str){
	if(str!=1){
		alert("请先注册");
		location.href="register.html";
	}else{
		newAjax("GET","admin/handle.php","check=curuser.txt",function(str){
			if(str==1){
				newAjax("GET","admin/curuser.txt",null,function(str){
					document.getElementById("curuser").innerHTML=str;
				});
				document.body.style.display="block";
			}else{
				//alert("请先登录");
				location.href="login.html";
			}
		});
	}
});
*/
if (!getLocalStorage('curuser')) {
    location.href = "login.html";
} else {
    var curuser = getLocalStorage('curuser');
    document.body.style.display="block";
    document.getElementById("curuser").innerHTML = curuser['user_name'];

    var oLogOut=document.getElementsByClassName("user_head")[0].getElementsByTagName("img")[0];
    oLogOut.onclick = function () {
        if(confirm("是否注销？")){
            localStorage.removeItem('curuser');
            location.href="login.html";
        }
    };

}
