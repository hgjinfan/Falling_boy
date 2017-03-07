(function(){
	var Scene = window.Scene = function(){
		this.bg = null;
		this.bindEvent();
	};


	Scene.prototype.changeScene = function(num){
		game.nowScene = num;
		switch(num){
			case 1 :
				// game.ctx.strokeRect(game.canvas.width/2-100,game.canvas.height/2-100,100,100);
				// game.ctx.strokeStyle = "red";
				break;

			case 2 :
				this.bg = game.imglist["bg5"];
				game.gamer = new Gamer();
				game.floor = new Floor(game.canvas.width/2-50,240,3);
				break;

			case 3 :
				console.log(4);
				break;
		}
	};


	Scene.prototype.render = function(){
		switch(game.nowScene){
			case 1 :
			    game.ctx.font = "40px Brush Script MT";
			    game.ctx.textAlign = "center";
			    game.ctx.fillText("Falling Boy",game.canvas.width/2,(1-0.618)*game.canvas.height);
                game.ctx.font = "20px Algerian";
			    game.ctx.fillText("start",game.canvas.width/2,240);
			    game.ctx.strokeRect(game.canvas.width/2-30,220,60,30);
				break;
			case 2 :
				//背景渲染
				// game.ctx.drawImage(this.bg,64,0,game.canvas.width,game.canvas.height,0,0,game.canvas.width,game.canvas.height);
				_.each(game.elementArr,function(element){
					element.update();
					element.render();
					element.check && element.check();
					element.touch && element.touch();
				});
				if(game.totalFrame % 100  == 0 ) {
                    new Floor(null,null,null);
                    console.log(game.elementArr.length);
                }
                if(game.score.scores>game.score.highScores){
				    game.score.setScore(game.score.scores);
                }
				// if(game.gamer.y>50){
				// 	game.gamer.start = true;
				// }
				// if(game.gamer.start){
					game.gamer.checkDie();
				// }
				break;
			case 3 :
			    var text1 = ["胜","负","乃","兵","家","常","事"];
			    var text2 = ["大","侠","请","重","新","来","过"];
			    game.ctx.font = "40px 华文行楷";
                game.ctx.textAlign = "center";
			    for(var i = 0 ; i < text1.length; i++){
			        game.ctx.fillText(text1[i],game.canvas.width/2-20,80+i*40);
                }
                for(var j = 0 ; j < text2.length; j++){
			        game.ctx.fillText(text2[j],game.canvas.width/2+20,120+j*40);
                }
				break;
		}
	};


	Scene.prototype.bindEvent = function(){
		console.log(game.nowScene);
		var self = this;
        if(game.nowScene == 1){
            document.onkeydown = null;
            document.onkeyup = null;
            game.canvas.onmousedown = function(event){
                console.log(event.clientX,event.clientY);
                var x = event.clientX;
                var y = event.clientY;
                if(x < game.canvas.width/2+30  && x > game.canvas.width/2-30
                    &&
                    y > 220 && y < 250) {
                    console.log("ok");
                    self.changeScene(2);
                    self.bindEvent();
                    game.canvas.onmousedown = null;
                }
            };
        }else if(game.nowScene == 2){
            document.addEventListener("keydown",function(event){
                var keyNum = event.keyCode;
				game.gamer.isMove = true;
                switch(keyNum){
                    case 37 :

                        game.gamer.direction = 1;
                        break;
                    case 39 :

                        game.gamer.direction = 2;
                        break;
                    // case 40 :
                    //     game.gamer.direction = 0;
                    //     break;
					default:
						game.gamer.isMove = false;
						break;
                }
            });
            document.onkeyup = function(event){
                game.gamer.isMove = false;
            };
        }else if(game.nowScene == 3){

        }
	};
})();
