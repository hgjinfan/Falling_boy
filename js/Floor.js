(function(){
	var Floor = window.Floor = function(width,height,typeNo){
        this.typeNo = typeNo ? typeNo : Number(_.sample([1,2,3,4],1));
        this.image = game.imglist["floor"+this.typeNo];
		this.x = parseInt(Math.random()*10)*22;
		this.touchCount = 0;
		if(width) {
            this.x = width;
        }
        this.y = game.canvas.height;
		if(height){
			this.y = height;
		}
		this.No = 0;
		this.f = 0;
		this.isTouch = false;
		this.isAdd = false;
        var self = this;
		game.elementArr.push(self);
	};


	Floor.prototype.update = function(){
		//挡板移动
		// this.x += this.dx;
		// if(this.x<0){
		// 	this.dx = - this.dx;
		// }
		// if(this.x > game.canvas.width - 100){
		// 	this.dx = - this.dx;
		// }
		this.y -= game.speed;
        //左上角
        this.LTx = this.x;
        this.LTy = this.y;

        //右上角
        this.RTx = this.x + 100;
        this.RTy = this.y;
		this.die();
	};

	Floor.prototype.render = function(){
		game.ctx.drawImage(this.image, 0, 20*this.No, 100, 20, this.x, this.y, 100, 20);
	};

	Floor.prototype.die = function(){
		if(this.y < -this.image.height ){
			game.elementArr = _.without(game.elementArr,this);
		}
	};

	Floor.prototype.check = function(){
	    //被挡板挡住的判断
		if(game.gamer.LBy >= this.RTy && game.gamer.LBy < (this.RTy + 20)){ // && (game.gamer.RBx < this.LTx) && (game.gamer.LBx > this.RTx)){
            if(game.gamer.RBx > this.LTx && game.gamer.LBx < this.RTx){
                game.gamer.isFall = false;
                console.log(game.score);
                if(!this.isAdd){
                    game.score.changeScore();
                    this.isAdd = true;
                }
                this.isTouch && game.gamer.Bounce(this.typeNo);
                this.transform();
                console.log("ok");
            }
            // console.log(game.gamer.LBx,game.gamer.LBy,game.gamer.RBx,this.LTx,this.LTy,this.RTx);
            if(game.gamer.RBx < this.LTx || game.gamer.LBx > this.RTx){
                game.gamer.isFall = true;
                game.gamer.xz = 0;
            }
		}
	};

	Floor.prototype.transform = function(){
        switch(this.typeNo){
            case 1:
                break;
            case 2:
                var self = this;
                this.f++;
                if(this.f >= 3){
                    this.No = 1;
                    setTimeout(function(){
                        game.elementArr = _.without(game.elementArr,self);
                        game.gamer.isFall = true;
                    },game.FPS*4);
                }
                break;
            case 3:
                this.No = 1;
                var self = this;
                setTimeout(function(){
                    self.No = 0;
                },game.FPS);
                break;
            case 4:
                game.gamer.xz = 8;
                if(this.touchCount == 1){
                    game.gamer.life.pop();
                }
                break;
        }
    };

	Floor.prototype.touch = function(){
	    if(this.isTouch){//节流
	        this.touchCount++;
	        return;
	    }else{
            if(game.gamer.LBy >= this.RTy
                &&
                game.gamer.LBy < (this.RTy + 20)
                &&
                game.gamer.LBx < this.RTx
                &&
                game.gamer.RBx > this.LTx
                &&
                game.gamer.isFall == false
            ){
                this.isTouch = true;
                // this.touchCount++;
                if(this.typeNo == 4){
                    game.score.scores -= 10;
                }
                console.log(this.touchCount);
            }else{
                this.isTouch = false;
            }
        }
    };
})();