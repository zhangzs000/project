function Sky(option) {
	this.config={
		skyClass:"sky_01",
		skyLength:1136,
		skySpeed:6,
		skyHeight:74,
		sumDistance:0
	}
	$.extend(this.config,option);
	this.sky=null;
}
Sky.prototype = {
	_init:function(){
		var sky = $("<div class='sky "+this.config.skyClass+"'></div>");
		this.sky=sky;
		return this;
	},
	_create:function(){
		GameConfig.gameBox.append(this.sky);
		return this;
	},
	_destroy:function(){

	},
	_move:function(){
		//console.log("sky:"+this.config.skySpeed);
		this.config.sumDistance-=this.config.skySpeed;
		this.sky.css("backgroundPositionX",this.config.sumDistance);
		if (this.config.sumDistance<=-this.config.skyLength) {
			this.config.sumDistance=0;
			this.sky.css("backgroundPositionX",0);
		}
	}
};
window.Sky = Sky