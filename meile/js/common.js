

function getStyle(obj,attr){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[attr];
    }
    else{
        return obj.currentStyle[attr];
    }
}
function oneMore(oParent,sTagName,fn){
    var arr=oParent.getElementsByTagName(sTagName);
    for( var i=0; i<arr.length; i++){
        arr[i].index=i;
        arr[i].onclick = function(){
            for( var i=0; i<arr.length; i++){
                arr[i].className="";
            }
            this.className="on";
            if(fn)fn(this);
        }
    }
}


function setLocalStorage(key,val){
    localStorage.setItem(key,JSON.stringify(val));
}
function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}


function CheckInput(id, options) {
    var _this = this;
    this.el = document.getElementById(id);
    this.oldType = this.el.type;
    this.bool = false;
    this.oldColor = getStyle(this.el, 'color');
    this.option = {
        code: undefined,
        regexp: undefined,
        error: ''
    };
    for (var i in options) {
        this.option[i] = options[i];
    }
    this.el.onfocus = function () {
        _this.fnFocus();
    };
    this.el.onblur = function () {
        _this.fnBlur();
    };
}
CheckInput.prototype = {
    fnFocus: function () {
        if (!this.bool) {
            this.el.type = this.oldType;
            this.el.value = '';
            this.el.style.color = this.oldColor;
        }
    },
    fnBlur: function () {
        var val = this.el.value;
        if (this.option.code) {
            var code = this.option.code();
            this.bool = val.toUpperCase() === code.toUpperCase();
        } else if (this.option.regexp) {
            var reg = this.option.regexp;
            if (!reg.length) {
                this. bool = reg.test(val);
            } else {
                for (var i=0; i<reg.length; i++) {
                    if (reg[i].test(val)) {
                        this.bool = true;
                        break;
                    }
                    this.bool = false;
                }
            }
        } else {
            this.bool = Boolean(val && val !== this.option.error);
        }
        if (!this.bool) this.fnError();
        //console.log(this.bool);
    },
    fnError: function () {
        this.el.type = 'text';
        this.el.value = this.option.error;
        this.el.style.color = 'red';
    }
};

function newAjax(method,url,val,fnSucc,fnFail){
    var oAjax=new XMLHttpRequest();
    oAjax.withCredentials=true;//跨域
    oAjax.open(method,method==="POST"?url+"?t="+new Date().getTime():url+"?t="+new Date().getTime()+"&"+val,true);
    if(method==="POST")oAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset-UTF-8");//请求头
    oAjax.send(method==="POST"?val:"");
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState===4){
            if(oAjax.status===200){
                if(fnSucc)fnSucc(oAjax.responseText);
            }else{
                if(fnFail)fnFail(oAjax.status);
            }
        }
    }
}
function randomNum(min,max){
    return Math.round(Math.random()*(max-min)+min);
}
function randomCode(obj,num){
    var str="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789";
    obj.innerHTML=null;
    for( var i=0; i<num; i++){
        var text=str[randomNum(0,str.length-1)];
        obj.innerHTML+=text;
    }
}
var testRegExp={
    code:/^\w\w{2}\w$/,
    tel:/^[1][3,4,5,7,8][0-9]{9}$/,
    email:/^[0-9A-Za-z][\.-_0-9A-Za-z]*@(qq\.com$|163\.com$|126\.com$|263\.com$|sina\.com$|gmail\.com$|hotmail\.com$)/,
    name:/^\w\w{2,18}\w$/,
    password:/^\w\w{6,14}\w$/
};
(function(designWidth, maxWidth) {
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width>maxWidth && (width=maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "0px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "0px";
        }, false);
    }
})(750, 750);
(function(){
    if(document.getElementById("search")){
        var oDel=document.getElementsByClassName("header")[0].getElementsByTagName("label")[0];
        var oInput=document.getElementById("search");
        oInput.addEventListener("focus",function(){
            if(location.href.search(/pro_search.html/)==-1){
                location.href="pro_search.html";
            }
        });
        oDel.onclick = function () {oInput.value=""};
    }
}());