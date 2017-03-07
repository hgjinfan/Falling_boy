(function(){
	var Gamer = window.Gamer = function(){
		this.img = null;
		this.step = 2;
		this.f = 0;
		this.direction = 2;//左1，右2
		this.x = game.canvas.width/2 - 16;
		this.y = 10;
		this.dy = 13;
		//修正人物处在挡板的位置
		this.xz = 0;
		//是否开始检测
		this.start = false;
		this.skillList = [];
        this.life = ["★","★","★"];
		//是否在下落
        this.isFall = true;
        //是否左右移动
		this.isMove = false;
		//是否被弹起
		this.isBounce = false;
		this.lock = false;
		var self = this;
		game.elementArr.push(self);
	};

	Gamer.prototype.update = function(){
        if(this.isFall){
            this.f++;
            this.img = game.imglist["fall"];
            if(this.f % 15 == 0) {
                if(this.step >= 6){
                    this.f = 0;
                    this.step = 2;
                    return;
                }
                this.step++;
            }
            this.y += 3;
            this.LBx = this.x;
            this.LBy = this.y + 48;
            this.RBx = this.x + 32;
            this.RBy = this.y + 48;
            this.move();
        }else{
            this.img = game.imglist["run"];
            if(this.isBounce){
                this.img = game.imglist["fall"];
                this.f++;
                this.y -= this.dy;
                if(this.f % 15 == 0){
                    this.step++;
                    if(this.step > 6){
                        this.step = 0;
                    }
                }
                this.dy--;
                if(this.dy == 0){
                    this.isFall = true;
                    this.isBounce = false;
                    // this.f = 0;
                    this.dy = 13;
                }
            }else{
                this.f++;
                if(this.f % 20 == 0){
                    this.step++;
                    if(this.step > 6){
                        this.step = 0;
                    }
                }
                this.y -= game.speed;
            }
            this.LBx = this.x;
            this.LBy = this.y + 48;
            this.RBx = this.x + 32;
            this.RBy = this.y + 48;
            this.move();
        }
	};

	Gamer.prototype.render = function(){
	    if(this.isFall || this.isBounce){
            game.ctx.drawImage(this.img,10+32*(this.direction-1),10+58*this.step,32,48,this.x,this.y,32,48);
        }else{
            game.ctx.drawImage(this.img,32*(this.direction-1),50*this.step,32,48,this.x,this.y + this.xz,32,48);
        }
        for(var i = 0 ; i < this.life.length; i++){
            game.ctx.textAlign = "center";
	        game.ctx.font = "20px 微软雅黑";
	        game.ctx.fillText(this.life[i],this.x+i*20,this.y);
        }
	};

	Gamer.prototype.move  = function(){
	    if(this.isMove && this.direction ==1){
	        this.x -= 2;
	        if(this.x < 0){
	            this.x = 0;
            }
        }else if(this.isMove && this.direction == 2){
	        this.x += 2;
	        if(this.x+32 > game.canvas.width){
	            this.x = game.canvas.width-32;
            }
        }
    };

    Gamer.prototype.stop = function(){
        this.isMove = false;
    };

    Gamer.prototype.Bounce = function(type){
        if(type == 3){
            this.isBounce = true;
        }
    }
    Gamer.prototype.checkDie = function(){
        if(this.LBy >= game.canvas.height || this.life.length == 0 || this.LBy <= 0){
            game.elementArr = _.without(game.elementArr,this);
            if(game.score.scores > game.score.highScores){
                game.score.setScore(game.score.scores);
            }
            game.scene.changeScene(3);
        }
    };
})();
