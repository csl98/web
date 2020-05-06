
if (!getLocalStorage('curuser')) {
    location.href = "login.html";
} else {

    document.body.style.display="block";
    
    var curuser = getLocalStorage('curuser');

    var oUl=document.getElementsByTagName("ul")[0];

    newAjax('GET', 'admin/handle.php', 'cart=' + curuser['user_id'], function (response) {
        var arr = JSON.parse(response);
        console.log(arr);

        for( var i=0; i<arr.length; i++){//创建li
            var cLi = document.createElement("li"),
                sHtml="<label><i></i></label><a href='pro_details.html'><img src='"+arr[i].src+"'><p>"+arr[i].name+"</p><p>颜色：蓝色</p><p>价格：<i class='price'>￥"+arr[i].price+"</i></p></a><span><a href='javascript:;'>-</a><input type='text' value='1'><a href='javascript:;'>+</a></span>";
            cLi.innerHTML = sHtml;
            oUl.appendChild(cLi);
        }



        var aLabel=document.getElementsByTagName("label"),
            aInput=document.getElementsByTagName("input"),
            oTotal=document.getElementsByClassName("total")[0],
            aPrice=document.getElementsByClassName("price"),
            oEdit=document.getElementsByClassName("header")[0].getElementsByTagName("a")[1],
            aP=document.getElementsByClassName("bottom_bar")[0].getElementsByTagName("p"),
            oGo=document.getElementsByClassName("bottom_bar")[0].getElementsByTagName("a")[0],
            aLi=oUl.getElementsByTagName("li"),
            sPrice="this.parentNode.parentNode.getElementsByClassName('price')[0]";




        for( var i=0; i<aLabel.length-1; i++){
            aLi[i].index=i;
            aLabel[i].onclick = function(){//单选
                if(this.className==="on"){
                    this.className="";
                }else{
                    this.className="on";
                }
                for( var i=0; i<aLabel.length-1; i++){
                    if(aLabel[i].className!=="on"){
                        aLabel[aLabel.length-1].className="";
                    }
                }
                if(count().length===aLabel.length-1){
                    aLabel[aLabel.length-1].className="on";
                }
                count();
            };
        }
        aLabel[aLabel.length-1].onclick = function(){//全选
            if(aLi.length===0){
                return false;
            }
            if(this.className==="on"){
                this.className="";
            }else{
                this.className="on";
            }
            for( var i=0; i<aLabel.length-1; i++){
                if(this.className==="on"){
                    aLabel[i].className="on";
                }else{
                    aLabel[i].className="";
                }
            }
            count();
        };
        function count(){//计算
            var sum=0,
                arr=[];
            for( var i=0; i<aLabel.length-1; i++){
                if(aLabel[i].className==="on"){
                    arr.push(i);
                    sum+=Number(aPrice[i].total);
                }
            }
            oTotal.innerHTML="￥"+sum;
            oGo.innerHTML=oEdit.innerHTML==="编辑"?"去结算（"+arr.length+"）":"删除（"+arr.length+"）";
            return arr.reverse();//返回已选择的倒序
        }
        for( var i=0; i<aInput.length; i++){
            aInput[i].index=i;
            aPrice[i].total=aPrice[i].innerHTML.slice(1);
            aInput[i].parentNode.children[0].onclick = function(){//减
                this.parentNode.children[1].value--;
                if(this.parentNode.children[1].value<1){this.parentNode.children[1].value=1}
                eval(sPrice).total=this.parentNode.children[1].value*eval(sPrice).innerHTML.slice(1);
                count();
            };
            aInput[i].parentNode.children[2].onclick = function(){//加
                this.parentNode.children[1].value++;
                if(this.parentNode.children[1].value>10){this.parentNode.children[1].value=10}
                eval(sPrice).total=this.parentNode.children[1].value*eval(sPrice).innerHTML.slice(1);
                count();
            };
            aInput[i].onblur=function(){
                this.value=this.value.replace(/\D/g,"");
                if(this.value<1){this.value=1}
                if(this.value>10){this.value=10}
                eval(sPrice).total=this.value*eval(sPrice).innerHTML.slice(1);
                count();
            }
            aInput[i].onkeyup=function(){
                this.value=this.value.replace(/\D/g,"");
                if(/^0/.test(this.value)){this.value=this.value.replace(/^0/g,"")}
            }
        }




        oEdit.onclick = function () {//编辑
            if (this.innerHTML === "编辑") {
                this.innerHTML="取消";
                aP[0].style.display=aP[1].style.display="none";
                oGo.innerHTML="删除（"+count().length+"）";
                oGo.href="javascript:;";
            } else {
                this.innerHTML="编辑";
                aP[0].style.display=aP[1].style.display="block";
                oGo.innerHTML="去结算（"+count().length+"）";
                oGo.href="confirm_order.html";
            }
        };


        oGo.onclick = function () {//结算\删除
            var arr=count();

            if (arr.length ===0) {
                alert("请选择商品");
                return false;
            } else {

                if(oEdit.innerHTML === "取消"){
                    if(confirm("确认删除?")){
                        for( var i=0; i<arr.length; i++){
                            oUl.removeChild(aLi[arr[i]]);
                        }

                        newAjax("POST", "admin/handle.php", "remove="+JSON.stringify(arr) + "&user_id=" + curuser['user_id'], function (response) {
                            console.log(response);
                        });

                        count();
                        if(aLabel[aLabel.length-1].className==="on"){
                            aLabel[aLabel.length-1].className="";
                        }

                        oEdit.innerHTML="编辑";
                        aP[0].style.display=aP[1].style.display="block";
                        oGo.innerHTML="去结算（"+count().length+"）";
                        oGo.href="confirm_order.html";

                    }

                    return false;
                }else{
                    newAjax("POST", "admin/handle.php", "remove="+JSON.stringify(arr) + "&user_id=" + curuser['user_id'], function (response) {
                        console.log(response);
                    });
                }
            }
        }




    });



}


