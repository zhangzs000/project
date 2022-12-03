$(function(){
	landscape();
	initPokers();
})

function initPokers(){
	var myPokers=new Poker({
		pokers:[{
			backClass:"pokerBack_01",
			faceClass:"pokerFace_01",
			val:1,
			noChoise:true
		},
		{
			backClass:"pokerBack_01",
			faceClass:"pokerFace_02",
			val:2,
			noChoise:true
		},
		{
			backClass:"pokerBack_01",
			faceClass:"pokerFace_03",
			val:3,
			noChoise:true
		},
		{
			backClass:"pokerBack_01",
			faceClass:"pokerFace_04",
			val:4,
			noChoise:false
			
		}],
		targetEl:".pokerBox",
		targetFaceClass:"pokerFace_04",
		onlyOnce:true
	});
}

function Poker(option){
	this.config={
		pokers:[{ 
			backClass:"pokerBack_01",/*背面样式，ba,bb,bc,bd*/
			faceClass:"pokerFace_01",/**/
			val:""
		}],/*用户传入扑克数据*/
		targetEl:".pokerBox",
		targetFaceClass:"pokerFace_04",
		onlyOnce:true
	}
	$.extend(this.config,option);
	this.targetBox=$(this.config.targetEl);
	//this.pokerBox = $(this.config.pokerBox);
	this._init();
}
Poker.prototype = {
	_init:function(){
		var _that = this;
		$.each(this.config.pokers,function(i,r){
			_that._createPoker(i,r);
		})
		//this.targetBox.addClass("myclearfix");
	},
	_createPoker:function(i,r){
		var _that=this;
		var poker=$("<div class='poker'>");
		//为了避免遮罩层出现，移出类导致的冗余动画，去掉了toBack
		var pokerBack=$("<div class='pokerBack "+r.backClass+"'>");
		var pokerFace=$("<div class='pokerFace toFace "+r.faceClass+"'>");
		//pokerFace.append(r.faceClass);
		poker.append(pokerBack);
		poker.append(pokerFace);
		this.targetBox.append(poker);
		/*通过定时器，定义延时翻转动画*/
		setTimeout(function(){
			/*扑克反转*/
			_that._rotateAnim(poker);
			/*通过定时器，等在背面向上时，将扑克打乱顺序*/
			setTimeout(function(){
				_that._outOfOrder();
			},500);
			/*扑克元素添加点击事件*/
			poker.bind("click",function(){
				/*记录，当前点击下标，目的，记录当前点击位置*/
				//除了牌还有个头部导致，一直bug
				var i=$(this).index(".poker");
				var arr = [0,1,2,3];
				
				/*判断用户是否只允许点击一次*/
				if(_that.config.onlyOnce){
					/*清除所有扑克点击事件*/
					_that.targetBox.children().unbind("click");
				}
				/*判断当前被选扑克，是否不允许被抽中的*/
				if(r.noChoise){
					/*出千*/
					_that._tazza(this);
				}
				/*调用扑克翻转动画，并指定当前点击位置的扑克*/
				_that._rotateAnim(_that.targetBox.children(".poker").eq(i));
				for (var j = 0; j < arr.length; j++){
					if(arr[j]==i){
						arr.splice(j,1);
						j--;
					}
				}
				for (var k = 0; k < arr.length;k++) {
					_that._rotateAnim(_that.targetBox.children(".poker").eq(arr[k]));
				}
				//封装出去调用，竟然避免了_tazza的clone元素，放在setTimeout里面，会出现
				//类没移出完，就显示遮罩（仅在手机上测试出现）
				_that._removeClass();

				setTimeout(function(){
					$(_that.targetBox).mydialog({
				        text:"",
				        type:2
				  });
					$(_that.targetBox).trigger("click");
				},700);
				// $(_that.targetBox).bind("webkitTransitionEnd",function(){
				// 	$(_that.targetBox).mydialog({
				//         text:"",
				//         type:2
				//   	});
				// 	$(_that.targetBox).trigger("click");
				// })
				
			})
		},1000);
	},
	_rotateAnim:function(poker){
		var thisChilds=poker.children();
		thisChilds.each(function(){
			if($(this).hasClass("toBack")){
				$(this).removeClass("toBack");
				$(this).addClass("toFace");
			}else if($(this).hasClass("toFace")){
				$(this).removeClass("toFace");
				$(this).addClass("toBack");
			}	
		});
	},
	/*打乱扑克现有顺序*/
	_outOfOrder:function(){
		var pokers=this.targetBox.children();
		pokers.sort(function(){
			return Math.random()*10>5?1:-1;
		});
		this.targetBox.append(pokers);
	},
	
	_tazza:function(poker){
		var pokers=this.targetBox.children();
		var i=$(poker).index();
		//由于要交换的是div所以该怎么办
		var arr = [];
		var mi = 0
		arr.push($(pokers[i]).clone());
		for(var j=0; j<pokers.length;j++){
			if($(pokers[j]).children(1).hasClass(this.config.targetFaceClass)){
				arr.push($(pokers[j]).clone());
				mi = j;
			}
		}
		$(pokers[i]).replaceWith(arr[1]);
		$(pokers[mi]).replaceWith(arr[0]);
	},
	_removeClass:function(){
		var childs = $(this.targetBox).find("div");
		//移出rolate(),				
		childs.each(function(){
			if($(this).hasClass("toBack") || $(this).hasClass("toFace")){
				$(this).removeClass("toFace");
				$(this).removeClass("toBack");
				
			}
		})
	}


};