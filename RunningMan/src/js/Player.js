function Player(option){
	this.config={
		runClassName:"player01_run",/*玩家奔跑类名*/
		jumpClassName:"player01_jump",/*跳跃类名*/
		squatClassName:"player01_squat",/*下蹲类名*/
		state:"run",/*当前状态：run，jump ,squat*/
		width:66,
		height:60,
		pos:{x:0,y:0},
		jumpStartSpeed:660,/*起跳的初始速度*/
		jumpSetIntervalV:660,
		aDown:2000,/*向下加速度*/
		sumScore:0,	/*当前玩家的总分*/
		sumDistance:0,/*当前玩家的奔跑距离*/
		runSpeed:1,	
		jumpPower:100,/*跳跃力*/
		gravity:-80,/*重力*/
		friction:-20,/*与空气的摩擦力*/
		fSum:-20,/*向下的总阻力*/
		maxJumpHeight:0,
		jumpHeight:0
		
	}
	$.extend(this.config,option);
	this.player = null;
}
Player.prototype = {
	/*初始化玩家*/
	_init:function(){
		var player = $("<div class='player "+this.config.runClassName+"'>");
		player.css({
			width:this.config.width,
			height:this.config.height,
			transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
		});
		this.player=player;

		return this;
	},
	/*创建玩家*/
	_create:function(){
		GameConfig.gameBox.append(this.player);
	},
	/*玩家死亡*/
	_destroy:function(){

	},
	/*玩家跳跃*/
	_playerJump:function(){
		var runY = GameConfig.runY;
		var gf=(GameConfig.gameFrequency)/1000;/*ms*/
		this.player
            .removeClass(GameConfig.player.config.runClassName)
            .removeClass(GameConfig.player.config.squatClassName)
            .addClass(GameConfig.player.config.jumpClassName);
		var jumpSetIntervalHeight = (this.config.jumpSetIntervalV)*gf+0.5*-(this.config.aDown)*gf*gf;
		this.config.pos.y-=jumpSetIntervalHeight;
		this.config.jumpSetIntervalV=this.config.jumpSetIntervalV-(this.config.aDown)*gf;
		this.player.css({
			width:56,
			height:66,
			transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
		});
		if(this.config.pos.y>=runY){
			this.config.pos.y=runY;
			this.config.state="run";
			this.player.removeClass(this.config.jumpClassName).addClass(this.config.runClassName);
			this.player.css({
				width:this.config.width,
				height:this.config.height,
				transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
			});
			this.config.jumpSetIntervalV=this.config.jumpStartSpeed;
		};
		

	},
	/*玩家下蹲*/
	_playerSquat:function(){
		//如果不更改config中的位置，碰撞检测将不起效
		this.config.pos.y=parseInt(this.config.pos.y)+18;
		this.player.css({
			width:86,
			height:42,
			transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
		});
		this.player.removeClass(this.config.runClassName)
				   .removeClass(this.config.jumpClassName)
				   .addClass(this.config.squatClassName)
	},
	_playerRun:function(){
		var runY = GameConfig.runY;
		if(this.config.pos.y != runY){
			this.config.pos.y=runY;
		}
		this.player.css({
			width:this.config.width,
			height:this.config.height,
			transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
		});
		this.player.removeClass(this.config.squatClassName)
				   .removeClass(this.config.jumpClassName)
				   .addClass(this.config.runClassName);
	},
	/*玩家得分*/
	_playerScore:function(score){
		this.config.sumScore+=score;
	},
	/*玩家得分*/
	_playerDistance:function(){
		this.config.sumDistance+=this.config.runSpeed;
	},
	_jumpHeight:function(){
		// var vStart = this.config.jumpStartSpeed;
		// var aDown = this.config.aDown;
		// var jumpHeight = this.config.jumpHeight;
		// var jumpSetIntervalHeight = this.config.jumpSetIntervalHeight;
		// var jumpSetIntervalV = this.config.jumpSetIntervalV;
		// //var timer = Math.floor(vStart/aDown);
		// var gf=GameConfig.gameFrequency/1000;/*ms*/
		// jumpSetIntervalHeight = vStart*gf+0.5*aDown*gf*gf;
		// jumpSetIntervalV = vStart-aDown*gf;
	}



};
window.Player = Player