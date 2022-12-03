function Dialog(option){
	this.config={
		text:"",
		type:1,
		confirmCallback:function(){			
		},
		closeCallback:function(){			
		}
	};
	$.extend(this.config,option);
	this.dialog=null;
}
Dialog.prototype =  {
	_create:function(){
		var screen = document.createElement("div");
		var dialogBox=document.createElement("div");
		var title=document.createElement("div");
		var titleTipsImg=document.createElement("div");
		var btn1=document.createElement("div");
		var btn2=document.createElement("div");
		var btn3=document.createElement("div");
		var titleTips = document.createElement("div");


		//内容
		titleTips.innerHTML=this.config.text;
		titleTips.setAttribute("class", "fontClass");

		//样式
		screen.style.position="absolute";
		screen.style.left="0px";
		screen.style.top="0px";
		screen.style.zIndex=9;
		screen.style.width="100%";
		screen.style.height="100%";
		screen.style.backgroundColor="rgba(0,0,0,0.5)";
		

		dialogBox.style.position="absolute";
		dialogBox.style.left="50%";
		dialogBox.style.top="50%";
		dialogBox.style.zIndex=10;
		dialogBox.style.width="380px";
		dialogBox.style.height="184px";
		dialogBox.style.marginLeft="-190px";
		dialogBox.style.marginTop="-92px";
		dialogBox.style.backgroundColor="rgba(0,0,0,0)";
		//dialogBox.style.backgroundSize="100% 100%";



		title.style.position="absolute";
		title.style.left="0px";
		title.style.top="-30px";
		title.style.width="100%";
		title.style.height="31px";
		//title.style.background="";
		title.style.backgroundSize="100% 100%";
		title.style.color="#fff";
		

		titleTips.style.position="absolute";
		titleTips.style.left="170px";
		titleTips.style.top="0px";
		titleTips.style.width="70px";
		titleTips.style.height="100%";
		titleTips.style.lineHeight="31px";
		titleTips.style.textAlign="center";
		titleTips.style.fontSize="20px";
		titleTips.style.fontWeight="bold";
		titleTips.style.fontFamily="impact";

		titleTipsImg.style.position="absolute";
		titleTipsImg.style.left="55px";
		titleTipsImg.style.top="0px";
		titleTipsImg.style.zIndex=11;
		titleTipsImg.style.width="270px";
		titleTipsImg.style.height="73px";
		titleTipsImg.style.background="url(images/poker/tan1.png) no-repeat";
		titleTipsImg.style.backgroundSize="100% 100%";
		

		//三个按钮
		btn1.style.position="absolute";
		btn1.style.left="113px";
		btn1.style.bottom="10px";
		btn1.style.zIndex=10;
		btn1.style.width="154px";
		btn1.style.height="40px";
		btn1.style.background="url(images/poker/tan2.png) no-repeat";
		btn1.style.backgroundSize="100% 100%";

		btn2.style.position="absolute";
		btn2.style.left="136px";
		btn2.style.bottom="55px";
		btn2.style.zIndex=10;
		btn2.style.width="110px";
		btn2.style.height="102px";
		btn2.style.background="url(images/poker/tan3.gif) no-repeat";
		btn2.style.backgroundSize="100% 100%";

		btn3.style.position="absolute";
		btn3.style.left="110px";
		btn3.style.top="125px";
		btn3.style.width="164px";
		btn3.style.height="40px";
		btn3.style.background="url(images/tan3.png) no-repeat";
		btn3.style.backgroundSize="100% 100%";
		
		

		if(this.config.type==1){
			title.appendChild(titleTipsImg);	
			titleTips.removeAttribute("class")
		}else if(this.config.type==0){
			//隐藏小图标
			titleTipsImg.style.display="none";
			//移动顶部文字
		
			titleTips.style.left="121px";
			titleTips.style.width="140px";	
			titleTips.style.fontSize="32px";
			
		}else if(this.config.type==2){
			btn3.style.display="none";
			titleTips.style.display="none";

		}
		
		title.appendChild(titleTipsImg);
		title.appendChild(titleTips);

		dialogBox.appendChild(title);
		dialogBox.appendChild(btn1);
		dialogBox.appendChild(btn2);
		dialogBox.appendChild(btn3);
		screen.appendChild(dialogBox);
		this.dialog=screen;

		var pokerBox = document.getElementById("pokerBox")
		document.getElementById("gameBox").insertBefore(screen,pokerBox);
		btn1.onclick=function(){
			document.getElementById("gameBox").removeChild(screen);
			location.reload(true)
		}
		btn2.onclick=function(){
			//document.getElementById("gameBox").removeChild(screen);
		}
		btn3.onclick=function(){
			document.getElementById("gameBox").removeChild(screen);
		}
	},
	_destroy:function(){
		this.dialog.remove();
		this.config.closeCallback();
	}
}; 
;(function($){
	/**
	两个参数:
	option(text:XXX,type:xxx)
	*/
	$.fn.mydialog=function(option){
		// var config={
		// 	text:"",
		// 	type:1
		// }
		// $.extend(config,option);
		this.bind("click",function(){
			var mydialog=new Dialog({
				text:option.text,
				type:option.type
			})
			mydialog._create();
		})
	}

})(jQuery)
