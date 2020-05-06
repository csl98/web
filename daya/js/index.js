(function(){
    var oNav=document.getElementById("nav");
    var oDropDown=getByClass(oNav,"drop-down")[0];
    var oMenu=getByClass(oDropDown,"menu")[0];
    var oI=oDropDown.getElementsByTagName("i")[0];
    var oP=oDropDown.getElementsByTagName("p")[0];
    oMenu.style.height=0;
    oMenu.style.top=51+"px";
    oI.style.bottom=0;
    oP.style.bottom=0;
    oDropDown.onmouseover=function(){
        startMove(oP,{bottom:-11})
        startMove(oI,{bottom:-18})
        startMove(oMenu,{height:383,top:62});
    }
    oDropDown.onmouseout=function(){
        startMove(oMenu,{height:0,top:51})
        startMove(oI,{bottom:0})
        startMove(oP,{bottom:0});
    }
}());


(function(){
    var oBanner=document.getElementById("banner");
    var oUl=oBanner.getElementsByTagName("ul")[0];
    var aLi=oUl.getElementsByTagName("li");
    var oBtnLeft=getByClass(oBanner,"left")[0];
    var oBtnRight=getByClass(oBanner,"right")[0];
    var oDot=getByClass(oBanner,"dot")[0];
    var aI=oDot.getElementsByTagName("i");
    var num=0;
    var cur=null;
    var timer=null;
    oDot.style.width=aLi.length*60-29+"px";
    oDot.style.marginLeft=-oDot.offsetWidth/2+"px";
    for(var i=0; i<aLi.length; i++){
        var oI=document.createElement("i");
        oDot.appendChild(oI);
    }
    aI[0].className="on";
    aI[aLi.length-1].style.marginRight=0;
    oBtnLeft.onclick=function(){
        if(num<1){num=aI.length};
        tab(--num);
        for(var i=0; i<aI.length; i++){
            aI[i].className="";
        }
        aI[num].className="on";
    }
    oBtnRight.onclick=function(){
        if(num>(aI.length-2)){num=-1}
        tab(++num);
        for(var i=0; i<aI.length; i++){
            aI[i].className="";
        }
        aI[num].className="on";
    }
    for(var i=0; i<aI.length; i++){
        aI[i].index=i;
        aI[i].onmouseover=function(){
            num=this.index;
            for(var i=0; i<aI.length; i++){
                aI[i].className="";
            }
            this.className="on";
            tab(num);
        }
    }
    function tab(val){
		clearInterval(timer);
		timer=setInterval(function(){
			cur=parseInt(oUl.style.left);
			if(cur>-100*val){
				oUl.style.left=(--cur)+"%";
			}
			else if(cur<-100*val){
				oUl.style.left=(++cur)+"%";
			}
			if(cur==-100*val){
				clearInterval(timer);
			}
		},1)
    }
    var autoTab=setInterval(oBtnRight.onclick,4000);
    oBanner.onmouseover=function(){clearInterval(autoTab)};
    oBanner.onmouseout=function(){autoTab=setInterval(oBtnRight.onclick,3000)};
}());


(function(){
    var oContent=getByClass(document,"content")[0];
    var oUl1=oContent.getElementsByTagName("ul")[0];
    var oUl2=oContent.getElementsByTagName("ul")[1];
    var aLi1=oUl1.getElementsByTagName("li");
    var aLi2=oUl2.getElementsByTagName("li");
    for(var i=0; i<aLi1.length; i++){
        if(i%4==3){aLi1[i].style.marginRight=0}
    }
    for(var i=0; i<aLi2.length; i++){
        if(i%3==2){aLi2[i].style.marginRight=0}
    }
}());