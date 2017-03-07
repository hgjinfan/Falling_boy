(function(){
	var Manager = window.Manager = function(url){
		this.url = url;
		this.totalFrame = 0;
		this.t0 = 0;
		this.t = 0;
		this.F0 = 0;
		this.FPS = 60;
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.ctx.font = "20px 微软雅黑";
		this.ctx.textAlign = "center";
		this.ctx.fillText("图片已经加载...",this.canvas.width/2,this.canvas.height/2);
		//图片实例列表
		this.imglist = {};
		this.imgAmout = 0 ;

		this.score = null;
        this.speed = 1;
		this.elementArr = [];
		this.gamer = null;
		this.nowScene = 1;
		this.loadResource(function(){
			this.start();
		});
	};

	//加载资源
	Manager.prototype.loadResource = function(callback) {
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					var Robj = JSON.parse(xhr.responseText);
					var count = 0;
					self.imgAmout = _.size(Robj);
					for(var k in Robj){
						self.imglist[k] = new Image();
						self.imglist[k].src = Robj[k];
						self.imglist[k].onload = function(){
							self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
							count++;
							self.ctx.fillText("图片已经加载"+ count + "/" + self.imgAmout ,self.canvas.width/2,self.canvas.height/2);
							if(count == self.imgAmout){
								console.log("load finished");
								callback && callback.call(self);
							}
						};
					}
				}
			}
		};
		xhr.open("get",this.url);
		xhr.send(null);
	};

	//启动游戏
	Manager.prototype.start = function(){
        this.score = new Score();
		this.scene = new Scene();
		//*********************TODO 测试场景2
		this.scene.changeScene(this.nowScene);
		this.t0 = Date.parse(new Date());
		this.mainCycle();
	};

	//游戏主循环
	Manager.prototype.mainCycle = function(){
		var self = this;
		self.totalFrame++;
		self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
		self.scene.render();
		//FPS
		self.t = Date.parse(new Date());
		if(self.t - self.t0 >= 1000){
			self.FPS = self.totalFrame - self.F0;
			self.t0 = self.t;
			self.F0 = self.totalFrame;
		}
		//TODO：加背景后需要更改
		// self.ctx.fillStyle = "#FFF";
		self.ctx.font ="10px Arial";
		self.ctx.textAlign = "left";
		self.ctx.fillText("totalFrame:" + self.totalFrame,0,10);
		self.ctx.fillText("FPS:" + self.FPS,0,25);

		self.ctx.fillText("scores:" + self.score.scores,200 ,10);
		self.ctx.fillText("highScores:" + self.score.highScores,200,25);

		
		window.requestAnimationFrame(function(){
			self.mainCycle();
		});
	};
})();