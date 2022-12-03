function Missile(option) {
	this.config={
		missileId:"",
		pos:{x:0,y:0},
		width:60,
		height:28,
		className:"bigMissile",
		missileSpeed:10,
		diming:5,/*碰撞模糊度*/
		type:"normal"/*没打算用，用继承的方式写其它类*/
	};
	$.extend(this.config,option);
	this.missile=null;
}
Missile.prototype._create = function() {
	var missile = $("<div class='missile "+this.config.className+"'>");
	var bigMissileBottom = $("<div class='bigMissileBottom'>");
	missile.append(bigMissileBottom);				
	missile.css({
		width:this.config.width,
		height:this.config.height,
		transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
	});
	this.missile=missile;
	GameConfig.gameBox.append(this.missile);
	return this;
};
Missile.prototype._move=function(){
	this.config.pos.x-=this.config.missileSpeed;
	this.missile.css({
		transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
	});
	/*监听*/
	this._crashListener();
	/*超出边界删除*/
	if(this.config.pos.x<=(0-this.config.width)){
		this._destroy();
	}
};
/*碰撞监听*/
Missile.prototype._crashListener=function(){
	
	var missileCenter = this._getCenter(this);
	var playerCenter = this._getCenter(GameConfig.player);
	if(Math.abs(missileCenter.x-playerCenter.x)<=(missileCenter.halfW+playerCenter.halfW-this.config.diming) && Math.abs(missileCenter.y-playerCenter.y)<=(missileCenter.halfH+playerCenter.halfH-this.config.diming)){
		this._gameOver();
	}
};
/*获取中心坐标点，通过pos判定碰撞*/
Missile.prototype._getCenter=function(obj){
	var thisObj = {
		x:obj.config.pos.x+obj.config.width/2,
		y:obj.config.pos.y+obj.config.height/2,
		halfW:obj.config.width/2,
		halfH:obj.config.height/2
	};
	return thisObj;
};
//游戏结束
Missile.prototype._gameOver=function(){
	 alert("GameOver");
};
//移出dom以及这个对象
Missile.prototype._destroy=function(){
	this.missile.remove();
	delete GameConfig.missiles[this.config.missileId];
};
window.Missile = Missile