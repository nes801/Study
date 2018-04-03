//描画エリアの生成
var stage = new PIXI.Container();
//画像読み込む時はApplicationじゃなくてautoDetectRendererじゃないとダメみたい
var app = new PIXI.autoDetectRenderer({ backgroundColor: 0xF9ECC7, antialias: false });
var map;

//ファイルをアップロード
PIXI.loader
  .add("images/map.jpg")
  .load(setup);

  //ウィンドウサイズが変更されたら画像のリサイズ
  window.onresize=resize;

  //アニメーションの呼び出し
  requestAnimationFrame(animate);


//マウスクリック時処理
stage.interactive=true;
stage.mousedown=function(mouseData){
  var x =Math.floor(app.plugins.interaction.mouse.global.x/stage.scale.x);
  var y=Math.floor(app.plugins.interaction.mouse.global.y/stage.scale.y);
  createCircle(x,y,10);
  setCircleAction(circles);

  document.getElementById("img_point").innerHTML="x="+x+",y="+y;
}

var circles=[];
function createCircle(x,y,rad){
  var circle=new PIXI.Graphics();
  circle.beginFill(0x9966FF);
  circle.drawCircle(x,y,rad);
  circle.endFill();

  circle.interactive=true;
  circle.buttonMode=true;

  stage.addChild(circle);

  circles.push(circle);
  console.log(x,y);
}

function setCircleAction(circles){
  for (var i = 0; i < circles.length; i++) {
    console.log(circles[i].position.x,circles[i].position.y);
  }
}

function setup(){
  map=PIXI.Texture.fromImage("images/map.jpg");
  stage.addChild(new PIXI.Sprite(map));
  resize();
}

function animate(){
	//再帰的に呼び出す
	requestAnimationFrame(animate);

	app.render(stage);
  document.getElementById("pixiview").appendChild(app.view);
}

//画像のリサイズ
function resize(){
  var W=document.body.clientWidth;

  //画像のサイズを画面横幅サイズに縮小
  stage.scale.x = stage.scale.y = W/map.width;

  var s="画像サイズ：横＝"+map.width+" 高さ＝"+map.height+"  width="+stage.width+" height="+stage.height;
  document.getElementById("winsize").innerHTML=s;
  //Pixi.jsでの表示部をリサイズした画像の大きさに縮小
  app.resize(stage.width,stage.height);
}
