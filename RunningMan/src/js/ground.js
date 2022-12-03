function Ground(option) {
	this.config={
		groundClass:"ground_01",
		groundLength:1425,
		groundSpeed:10,
		groundHeight:74,
		sumDistance:0,
		groundHole:0
	}
	$.extend(this.config,option);
	this.ground=null;
}
Ground.prototype = {
	_init:function(){
		var ground = $("<div class='ground "+this.config.groundClass+"'></div>");
		this.ground=ground;
		return this;
	},
	_create:function(){
		GameConfig.gameBox.append(this.ground);
		return this;
	},
	_destroy:function(){

	},
	_move:function(){
		//console.log("ground:"+this.config.groundSpeed);
		this.config.sumDistance-=this.config.groundSpeed;
		this.ground.css("backgroundPositionX",this.config.sumDistance);
		if (this.config.sumDistance<=-this.config.groundLength) {
			this.config.sumDistance=0;
			this.ground.css("backgroundPositionX",0);
		}
	}
};
window.Ground = Ground