function Gold(option) {
	this.config={
		goldId:"",/*有用*/
		pos:{x:0,y:0},
		width:24,
		height:24,
		className:"goldCoin",/*copperCoin,silverCoin,goldCoin,jewel*/
		score:6,
		goldSpeed:10,
		type:"normal",
		/*飞翔弧度*/
		flySpeed:10,
		radian1:-Math.PI.toFixed(3),
		radian2:2*Math.PI.toFixed(3),
		IntervalX:0,//废弃
		IntervalY:0//废弃

	}
	$.extend(this.config,option);
	this.gold=null;
}
Gold.prototype= {
	_init:function(){
		var gold = $("<div class='coin "+this.config.className+"'>");				
		gold.css({
			width:this.config.width,
			height:this.config.height,
			transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
		});
		this.gold=gold;
		return this;
	},
	_create:function(){
		GameConfig.gameBox.append(this.gold);
		return this;
	},
	_destroy:function(){
		this.gold.remove();
		delete GameConfig.golds[this.config.goldId];

	},
	_move:function(){
		this.config.pos.x-=this.config.goldSpeed;
		this.gold.css({
			transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
		});
		/*监听*/
		this._crashListener();
		/*超出边界删除*/
		if(this.config.pos.x<=(0-this.config.width)){
			this._destroy();
		}
	},
	/*碰撞监听*/
	_crashListener:function(){
		
		var goldCenter = this._getCenter(this);
		var playerCenter = this._getCenter(GameConfig.player);
		if(Math.abs(goldCenter.x-playerCenter.x)<=(goldCenter.halfW+playerCenter.halfW) && Math.abs(goldCenter.y-playerCenter.y)<=(goldCenter.halfH+playerCenter.halfH)){
			
			this._destroy();
			//得分
			GameConfig.player._playerScore(this.config.score);
		}
	},
	/*获取中心坐标点，通过pos判定碰撞*/
	_getCenter:function(obj){
		var thisObj = {
			x:obj.config.pos.x+obj.config.width/2,
			y:obj.config.pos.y+obj.config.height/2,
			halfW:obj.config.width/2,
			halfH:obj.config.height/2
		};
		return thisObj;
	},
	/*
	由于在css中添加c3动画碰撞监听有问题，所有添加fly方法
	单纯的添加class还是不行，待时时运动并且监听
	*/
	_fly:function(){
		//不同的时间飞翔的角度
		// var nTime = new Date().getTime();
		// var coinTime = this.config.goldId.substring(1);
		// if(nTime-coinTime<6000){

		// }else{

		// }
		var _that = this;
		//随机飞翔角度;
		var rDeg = (Math.random()*(this.config.radian1-0)).toFixed(3);
		//水平速度;求负的角度cos和sin和正的相反吗
		var _speedH = (this.config.flySpeed*Math.sin(rDeg)).toFixed(3);
		//垂直速度;
		var _speedV = (this.config.flySpeed*Math.cos(rDeg)).toFixed(3);
		
		this.config.pos.x=parseInt(this.config.pos.x)+parseInt(_speedH);
		this.config.pos.y=parseInt(this.config.pos.y)+parseInt(_speedV);
		//飞翔
		this.gold.css({
			transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
		});
		/*监听*/
		this._crashListener();
		/*超出边界删除*/
		//this.config.IntervalX<(-this.config.width)写了个“=”每次都使this.config.IntervalX=-this.config.width
		// if(this.config.pos.x<(-this.config.width) || this.config.pos.x>(GameConfig.gameBoxWidth+this.config.width) || this.config.pos.y>(GameConfig.gameBoxHeight+this.config.height) || this.config.pos.y<-(this.config.height)){
		// 	this._destroy();
		// }
		//console.log(this.config.pos.x+"***"+(GameConfig.gameBoxWidth)+"****"+(this.config.width));
		
		if(this.config.pos.x<(-this.config.width) || this.config.pos.y>(GameConfig.gameBoxHeight+this.config.height) || this.config.pos.y<-(this.config.height)){
			this._destroy();
		}
		//|| this.config.pos.x>(GameConfig.gameBoxWidth+this.config.width)有这个手机移动端不显示
		/*过6秒后删除*/
		// setTimeout(function(){
		// 	_that._destroy();
		// },12000)
	}

};
window.Gold = Gold