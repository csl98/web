
document.getElementById("search").focus();

var oRemove=document.getElementsByClassName("remove")[0].getElementsByTagName("a")[0],
    oHis=document.getElementsByClassName("hst_search")[0].getElementsByTagName("dl")[0],
    oSearchBtn=document.getElementsByClassName("header")[0].getElementsByTagName("a")[1],
    oSearch=document.getElementById("search"),
    aDd=oHis.getElementsByTagName("dd");

var histories = getLocalStorage('history');
if (histories) {
    histories = JSON.parse(histories);

    for( var i=0; i<histories.length; i++){
        var cDd=document.createElement("dd"),
            sHtml="<a href='pro_list.html'>"+histories[i]+"</a>";
        cDd.innerHTML=sHtml;
        oHis.appendChild(cDd);
    }
    oRemove.onclick = function () {
        for( var i=aDd.length-1; i>=0; i--){//倒着删
            oHis.removeChild(aDd[i]);
        }
        setLocalStorage('history', '[]');
    }

} else {
    setLocalStorage('history', '[]');
}

oSearch.addEventListener("keyup",function(e){
    if(e.keyCode === 13)oSearchBtn.click();
});

oSearchBtn.onclick = function(){
    clearTimeout(this.timer);
    if(oSearch.value !== "" && oSearch.value !== "请输入内容" && /[^ ]/.test(oSearch.value)){
        histories = JSON.parse(getLocalStorage('history'));
        histories.unshift(oSearch.value);
        setLocalStorage('history', JSON.stringify(histories));
        oSearch.value = '';
    }else{
        oSearch.value="请输入内容";
        oSearch.style.color="red";
        this.timer=setTimeout(function(){
            oSearch.value="";
            oSearch.style.color="#fff";
        },500);
        return false;
    }
};
