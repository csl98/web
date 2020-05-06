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

var aBtn=document.getElementsByClassName("content")[0].getElementsByTagName("input");
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

            var src = this.parentNode.parentNode.getElementsByTagName("img")[0].src,
                name = this.parentNode.parentNode.getElementsByTagName("h3")[0].innerHTML,
                price = this.parentNode.getElementsByTagName("i")[0].innerHTML.slice(1),
                obj = { src, name, price };

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