var banner = new Swiper('.banner', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.banner .swiper-pagination'
    }
});

oneMore(document.getElementsByClassName("color")[0],"a");
oneMore(document.getElementsByClassName("pro_nav")[0],"li",function(obj){
    var aTab=document.getElementsByClassName("tab")[0].getElementsByTagName("li");
    for( var i=0; i<aTab.length; i++){
        aTab[i].className="";
    }
    aTab[obj.index].className="on";
});

var oAddCart=document.getElementsByClassName("add_cart")[0],
    oBuyNow=document.getElementsByClassName("buy_now")[0];
oBuyNow.onclick = function(){
    location.href="confirm_order.html";
};
oAddCart.onclick = function () {
    var curuser = getLocalStorage('curuser');

    if (!curuser) {
        location.href = 'login.html';
        return false;
    }

    if(this.value === "加入购物车"){
        var _this = this;
        _this.disabled = true;

        var src = "img/pro_banner_02.jpg",
            name = document.getElementsByTagName("h3")[0].innerHTML,
            price = document.getElementsByClassName("pro_wrap")[0].getElementsByTagName("i")[0].innerHTML.slice(1),
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
};
(function(){//下拉菜单
    var oA=document.getElementsByClassName("header")[0].getElementsByTagName("a")[1],
        oMenu=document.getElementsByClassName("menu")[0];
    function none(){oMenu.style.display="none"}
    oA.onclick = function(){
        if(oMenu.style.display==="none"){
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
document.getElementsByClassName("bottom_bar")[0].getElementsByTagName("a")[1].onclick = function(){
    if(this.className==="on"){
        this.className="";
        this.children[0].style.background="url(img/fav.png) no-repeat center/100%";
    }else{
        this.className="on";
        this.children[0].style.background="url(img/fav_on.png) no-repeat center/100%";
    }
};
