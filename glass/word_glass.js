

//描画エリアの生成
var stage = new PIXI.Container();
var width = 600;
var height = 720;
var app = new PIXI.Application(width,height, { backgroundColor: 0xF9ECC7, antialias: false });
document.body.appendChild(app.view);


//草の基本情報を設定
var word = "Ｗ";
var MAX_grass = 371;
var grasses =[];

var style = new PIXI.TextStyle({
    fontSize: 30,
    fontWeight: "bold",
    fill: 0x529E52,
});


//ループでたくさん生成する
for(var cnt=0;cnt<MAX_grass;cnt++){

	grasses.push(new PIXI.Text('Ｗ',style));
	grasses[cnt].position.x = Math.random()*width;
	grasses[cnt].position.y = Math.random()*height;
	grasses[cnt].alpha = 0.1;
	var base = Math.random();
	grasses[cnt].scale.x=base*(1.2-0.5)+0.5;
	grasses[cnt].scale.y=base*(1.2-0.5)+0.5;
	app.stage.addChild(grasses[cnt]);

}

function animate(){
	//再帰的に呼び出す
	requestAnimationFrame(animate);
	
	for(cnt=0;cnt<MAX_grass;cnt++){
		if(grasses[cnt].alpha <1){
			grasses[cnt].alpha+=0.01;
		}
	}
	app.render(stage);
}

requestAnimationFrame(animate);

