oneMore(document.getElementsByClassName("nav")[0],"li",function(obj){
    var aLi=document.getElementsByClassName("nav")[0].getElementsByTagName("li");
    for( var i=0; i<aLi.length; i++){
        if(aLi[i].getElementsByTagName("i")[0]){
            aLi[i].getElementsByTagName("i")[0].style.background="url(img/sort"+(i-2)+".png) no-repeat center/100%";
        }
    }
    if(obj.getElementsByTagName("i")[0]){
        obj.getElementsByTagName("i")[0].style.background="url(img/sort"+(obj.index-2)+"_on.png) no-repeat center/100%";
    }
});
var aBtn=document.getElementsByTagName("input");
for( var i=0; i<aBtn.length; i++){
    aBtn[i].onclick = function () {
        var curuser = getLocalStorage('curuser');

        if (!curuser) {
            location.href = 'login.html';
            return false;
        }

        if(this.value === "加入购物车"){
            var _this = this;
            _this.disabled = true;

            var src = this.parentNode.getElementsByTagName("img")[0].src,
                name = this.parentNode.getElementsByTagName("p")[0].innerHTML,
                price = this.parentNode.getElementsByTagName("i")[0].innerHTML.slice(1),
                obj = {src, name, price};
            newAjax("POST", "admin/handle.php","cart=" + JSON.stringify(obj) + "&user_id=" + curuser['user_id'], function (response) {
                console.log(response);
                if (response === '1') {
                    _this.value = "已加入购物车";
                    _this.style.background = "gray";
                } else {
                    _this.disabled = true;
                }
            });
        }
    }
}
(function(){//下拉菜单
    var oA=document.getElementsByClassName("header")[0].getElementsByTagName("a")[1],
        oMenu=document.getElementsByClassName("menu")[0];
    function none(){oMenu.style.display="none"}
    oA.onclick = function(){
        if(oMenu.style.display=="none"){
            oMenu.style.display="block";
        }else{
            none();
        }
    };
    document.addEventListener("touchstart",none);
    oA.addEventListener("touchstart",function(){document.removeEventListener("touchstart",none);});
    oA.addEventListener("touchend",function(){document.addEventListener("touchstart",none)});
    oMenu.addEventListener("touchstart",function(){document.removeEventListener("touchstart",none);});
    oMenu.addEventListener("touchend",function(){document.addEventListener("touchstart",none)});
}());
