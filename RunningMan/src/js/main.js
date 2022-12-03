$(function(){
  
  landscape();

  
  var callback = function(){
       //初始化游戏；
      gameInit();
   }
   //预加载图片
  img_preload(GameConfig.gameimg, callback);
    
  
    
})
function gameInit(){

  /*初始化地面*/
  GameConfig.ground = new Ground()._init()._create();
  GameConfig.groundInit={x:0,y:GameConfig.gameBox.height()-GameConfig.ground.config.groundHeight};
  
  /*初始化天空*/
  GameConfig.sky = new Sky()._init()._create();
 
  /*金币y轴初始化*/
  GameConfig.goldY.push(GameConfig.groundInit.y-60);
  GameConfig.goldY.push(GameConfig.groundInit.y-100);
  GameConfig.goldY.push(GameConfig.groundInit.y-140);

  /*导弹y轴初始化*/
  GameConfig.missileY.push(GameConfig.groundInit.y+20);
  GameConfig.missileY.push(GameConfig.groundInit.y-70);
  GameConfig.missileY.push(GameConfig.groundInit.y-100);
  GameConfig.missileY.push(GameConfig.groundInit.y-120);
  /*怪兽(MstBall)y轴初始化*/
  GameConfig.mstBallY.push(GameConfig.groundInit.y-40);

  /*玩家初始化*/
  var curPlayer = GameConfig.roles[0];
  GameConfig.player = new Player({
    runClassName:curPlayer.runClassName,
    jumpClassName:curPlayer.jumpClassName,
    squatClassName:curPlayer.squatClassName,
    width:curPlayer.width,
    height:curPlayer.height,
    pos:{x:GameConfig.gameBox.width()/4,y:GameConfig.groundInit.y-curPlayer.height}
  });
   /*初始化奔跑y轴*/
  GameConfig.runY=GameConfig.groundInit.y-GameConfig.player.config.height;
  GameConfig.player._init()._create();

  /*游戏开始*/
  gameStart();
   /*绑定事件*/
  addEvent();
  
}
function gameStart(){

  clearInterval(GameConfig.globalTimer);
  
  //游戏引擎
  GameConfig.globalTimer=setInterval(function(){
  //移动地面
  GameConfig.ground._move();
  //移动天空
  GameConfig.sky._move();
  //玩家状态
  if(GameConfig.player.config.state=="jump"){
    GameConfig.player._playerJump();
  }
  //统计玩家奔跑距离;
  GameConfig.player._playerDistance();
  
  //只能执行一个满足条件的
  GameConfig.GameCount++;
  if(GameConfig.GameCount>300) {
    GameConfig.GameCount=0;
  }
  //创建金币
  if(GameConfig.GameCount%(GameConfig.gameCoinFrequency)==0){      
    createGold();     
  }

  //创建导弹
  if(GameConfig.GameCount%(GameConfig.gameMissileFrequency)==0){
    createMissile();
  }

  //创建怪兽MstBall
  if(GameConfig.GameCount%(GameConfig.gameMstBallFrequency)==0){
    createMstBall();
  }

  //移动金币
  for(var key in GameConfig.golds){
    if(GameConfig.golds[key].config.type=="fly"){
       GameConfig.golds[key]._fly();       
    }else{
       GameConfig.golds[key]._move();
    }    
  }

  //移动导弹
  for(var key in GameConfig.missiles){    
    GameConfig.missiles[key]._move();        
  }

  //移动怪兽MstBall
  for(var key in GameConfig.mstBalls){   
    GameConfig.mstBalls[key]._move();
  }

  //玩家得分
  GameConfig.scoreBox.html(GameConfig.player.config.sumScore);
  //奔跑距离
  GameConfig.distanceBox.html(GameConfig.player.config.sumDistance);

  },GameConfig.gameFrequency)

}

function addEvent(){
 //下蹲GameConfig.btnSquat
  GameConfig.btnSquat.bind("touchstart",function(e){
    var e = e || event;
       squatfn();
       e.preventDefault?e.preventDefault():e.returnValue=false;   
  })
  GameConfig.btnSquat.bind("touchend",function(){
      squatfn2();
}) 
 // 跳跃mousedown/mouseup
  GameConfig.btnJump.bind("touchstart",function(e){
     var e = e || event; 
     jumpfn();
    e.preventDefault?e.preventDefault():e.returnValue=false;  
    
 })

 GameConfig.btnJump.bind("touchend",function(){
    jumpfn2();
  })
  //蹲
  function squatfn(){
    GameConfig.btnSquat.addClass("touchClass");
    if(GameConfig.player.config.state=="run"){
       GameConfig.player.config.state="squat"; 
       GameConfig.player._playerSquat();    
    }
  }
  function squatfn2(){
    GameConfig.btnSquat.removeClass("touchClass");
    if(GameConfig.player.config.state=="squat"){
       GameConfig.player.config.state="run";
       GameConfig.player._playerRun(); 
    }
  }
  //跳
  function jumpfn(){
      GameConfig.btnJump.addClass("touchClass"); 
      if(GameConfig.player.config.state=="run"){
         GameConfig.player.config.state="jump";    
      }
      if(GameConfig.player.config.state=="squat"){
         GameConfig.player.config.state="jump";
      }
  }
  function jumpfn2(){
     GameConfig.btnJump.removeClass("touchClass");
  }
  GameConfig.btnPause.mydialog({
        text:"暂停",
        type:1
  });
  //键盘事件
  document.onkeydown=function(e){
    var e = e || event;
    var key = e.keyCode || e.which || e.charCode; 
    if(key == 90){
        squatfn();
    }
    if(key ==88){
      jumpfn();
    }
  }
  document.onkeyup=function(e){
    var e = e || event;
    var key = e.keyCode || e.which || e.charCode; 
    if(key == 90){
        squatfn2();
    }
    if(key ==88){
      jumpfn2();
    }
  }
}
//创建金币
function createGold(){
    var t = new Date().getTime();
    var goldId = "g"+t;
    var goldType = GameConfig.goldType[Math.floor(Math.random()*(GameConfig.goldType.length))];
    var r = Math.floor(Math.random()*3);
    GameConfig.golds[goldId] = new Gold({
      goldId:goldId,
      className:goldType.className,
      score:goldType.score,
      pos:{x:GameConfig.gameBox.width(),y:GameConfig.goldY[r]},
      width:goldType.width,
      height:goldType.height,
      type:goldType.type
    })
    GameConfig.golds[goldId]._init()._create();
   // console.log(GameConfig.golds)
}
//创建导弹
function createMissile(){
    var t = new Date().getTime();
    var missileId = "m"+t;
    var missileType = GameConfig.missileType[Math.floor(Math.random()*(GameConfig.missileType.length))];
    var r = Math.floor(Math.random()*(GameConfig.missileY.length));
    GameConfig.missiles[missileId] = new Missile({
      missileId:missileId,
      className:missileType.className,
      pos:{x:GameConfig.gameBox.width(),y:GameConfig.missileY[r]},
      width:missileType.width,
      height:missileType.height,
      diming:missileType.diming,
      missileSpeed:missileType.missileSpeed,
      type:missileType.type
    })
    GameConfig.missiles[missileId]._create();
    //console.log(GameConfig.missiles)
}
//创建MstBall
function createMstBall(){
    var t = new Date().getTime();
    var mstBallId = "msb"+t;
    var mstBallType = GameConfig.mstBallType[Math.floor(Math.random()*(GameConfig.mstBallType.length))];
    var r = Math.floor(Math.random()*(GameConfig.mstBallY.length));
    GameConfig.mstBalls[mstBallId] = new MstBall({
      mstBallId:mstBallId,
      className:mstBallType.className,
      pos:{x:GameConfig.gameBox.width(),y:GameConfig.mstBallY[r]},
      width:mstBallType.width,
      height:mstBallType.height,
      diming:mstBallType.diming,
      missileSpeed:mstBallType.missileSpeed,
      type:mstBallType.type
    })  
    GameConfig.mstBalls[mstBallId]._create();
    //console.log(GameConfig.mstBalls)
}
//图片预加载
function img_preload(img, callback){
  var onload_img = 0;
  var tmp_img = [];
  for(var i=0,imgnum=img.length; i<imgnum; i++){
    tmp_img[i] = new Image();
    tmp_img[i].src = img[i];
    if(tmp_img[i].complete){
      onload_img ++;
    }else{
      tmp_img[i].onload = function(){
        onload_img ++;
      }
    }
  }
  var et = setInterval(
    function(){
     // console.log(Math.floor(onload_img/tmp_img.length))
      if(onload_img==img.length){ // 定时器,判断图片完全加载后调用callback
        clearInterval(et);
        
        callback();
      }
    },200);
}