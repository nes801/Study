//描画エリアの生成
var stage = new PIXI.Container();
// var width = 1283;
// var height = 916;
//画像読み込む時はApplicationじゃなくてautoDetectRendererじゃないとダメみたい
var app = new PIXI.autoDetectRenderer({ backgroundColor: 0xF9ECC7, antialias: false });
// document.body.appendChild(app.view);
var map;

//ファイルをアップロード
PIXI.loader
  .add("images/map.jpg")
  .load(setup);

  //ウィンドウサイズが変更されたら画像のリサイズ
  window.onresize=resize;

  //アニメーションの呼び出し
  requestAnimationFrame(animate);


//マウスオーバー
stage.interactive=true;
stage.mousemove=function(mouseData){
  var x=app.plugins.interaction.mouse.global.x;
  var y=app.plugins.interaction.mouse.global.y;

  document.getElementById("winsize").innerHTML="x="+x+",y="+y;
}

function setup(){
  map=PIXI.Texture.fromImage("images/map.jpg");
  // var map = PIXI.loader.resources["images/map.jpg"].texture;
  // map.baseTexture.addListener("loaded",function(){
  //   stage.resize(document.documentElement.clientWidth,document.documentElement.clientHeight);
  // });
  stage.addChild(new PIXI.Sprite(map));

  //円を描く
  var circle=new PIXI.Graphics();
  circle.beginFill(0x9966FF);
  circle.drawCircle(1200,100,50);
  circle.endFill();
  stage.addChild(circle);

  resize();
  // app.render(stage);
}

function animate(){
	//再帰的に呼び出す
	requestAnimationFrame(animate);

	app.render(stage);
  document.getElementById("pixiview").appendChild(app.view);
}

//画像のリサイズ
function resize(){
  console.log('hoge');
  //スクロールバー内側の画面サイズ
  // var W=document.body.clientWidth;
  // var H=document.body.clientHeight;
  var W=document.body.clientWidth;
  // var H=500;


  //画像のサイズを画面横幅サイズに縮小
  stage.scale.x = stage.scale.y = W/map.width;

  var s="画像サイズ：横＝"+map.width+" 高さ＝"+map.height+"  width="+stage.width+" height="+stage.height;
  document.getElementById("winsize").innerHTML=s;
  //Pixi.jsでの表示部をリサイズした画像の大きさに縮小
  app.resize(stage.width,stage.height);
}
