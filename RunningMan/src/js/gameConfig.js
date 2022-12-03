$(function(){
	window.GameConfig={
		GameCount:0,/*计时器*/				
		gameBox:$("#gameBox"),	
		gameBoxWidth:$("#gameBox").width(),
		gameBoxHeight:$("#gameBox").height(),	
		globalTimer:0,
		fps:30,/*帧数,单位是HZ,每秒几张图*/	
		gameFrequency:30,//Math.floor(1000/this.GameConfig.fps),/*动画频率*/
		gameCoinFrequency:15,
		gameMissileFrequency:150,
		gameMstBallFrequency:50,
		groundInit:{x:0,y:0},
		scoreBox:$("#score"),/*当前玩家得分*/
		distanceBox:$("#distance"),/*当前玩家得分*/
		btnPause:$("#pause"),/*节流一下会减少卡顿,或换事件;似乎移动端没mouseup/down*/
		btnSquat:$("#squat"),
		btnJump:$("#jump"),
		//配置游戏图片；
		gameimg:["images/player01.gif","images/player01_dun.png","images/player01_jump.png","images/ceil01.png","images/copperCoin.png","images/distance.png",
				 "images/dun.png","images/floor00.png","images/goldCoin.png","images/jewel.png","images/jump.png","images/keng01.png",	
				 "images/pause.png","images/score.png","images/silverCoin.png","images/tan0.png","images/tan1.png","images/tan2.png",
				 "images/tan3.png","images/tan6.png","images/tan7.png"
				],
		/*地面*/
		ground:null,
		groundType:[
				{
					groundClass:"ground_01",
					groundLength:1136,
					groundSpeed:2,
					groundHeight:74,
					sumDistance:0,
					groundHole:0
				},
				{

				}
			],
		/*天空*/
		sky:null,
		skyType:[
				{
					skyClass:"sky_01",
					skyLength:1136,
					skySpeed:2,
					skyHeight:74,
					sumDistance:0
				},
				{

				}
			],
		/*金币*/		
		//goldCount:0,/*金币计数器*/
		goldY:[],
		golds:{},
		goldType:[
			{
				className:"jewel",
				score:8,
				width:26,
				height:26,
				type:"normal"
			},
			{
				className:"goldCoin",
				score:6,
				width:26,
				height:24,
				type:"normal"
			},
			{
				className:"silverCoin",
				score:4,
				width:28,
				height:24,
				type:"normal"
			},
			{
				className:"copperCoin",
				score:2,
				width:26,
				height:24,
				type:"normal"
			},
			{
				className:"silverCoinFly",
				score:4,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"copperCoinFly",
				score:2,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"silverCoinFly",
				score:4,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"copperCoinFly",
				score:2,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"silverCoinFly",
				score:4,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"copperCoinFly",
				score:2,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"silverCoinFly",
				score:4,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"copperCoinFly",
				score:2,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"silverCoinFly",
				score:4,
				width:52,
				height:32,
				type:"fly"
			},
			{
				className:"copperCoinFly",
				score:2,
				width:52,
				height:32,
				type:"fly"
			}
		],
		/*玩家*/
		player:null,
		runY:0,/*奔跑的左上角y坐标*/
		roles:[
			{
				runClassName:"player01_run",
				jumpClassName:"player01_jump",
				squatClassName:"player01_squat",
				width:66,
				height:60
			},
			{
				className:"player02",
				width:86,
				height:40
			},
			{   className:"player03",
			    width:66,
			    height:60
			}
		],
		//导弹
		missileY:[],
		missiles:{},
		missileType:[
			{
				className:"bigMissile",
				width:50,
				height:26,
				diming:10,
				missileSpeed:15,
				type:"normal"
			}
		],
	   //球怪兽
	   	mstBallY:[],
		mstBalls:{},
		mstBallType:[
			{
				className:"MstBall",
				width:40,
				height:40,
				diming:5,
				missileSpeed:10,
				type:"normal"
			}
		],
	
	}
})
