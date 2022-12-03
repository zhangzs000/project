/*
*组合式继承实现MasterBall这个类
*/
function MstBall(option){
	//经典继承
	Missile.call(this,option);
}
//原型继承
MstBall.prototype = new Missile();
//重写create方法
MstBall.prototype._create = function() {
	var mstBall = $("<div class='missile "+this.config.className+"'>");
	mstBall.css({
		width:this.config.width,
		height:this.config.height,
		transform:"translate("+this.config.pos.x+"px,"+this.config.pos.y+"px)"
	});
	this.missile=mstBall;
	//console.log(this.missile)
	GameConfig.gameBox.append(this.missile);
	return this;
};
window.MstBall = MstBall