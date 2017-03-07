/**
 * Created by 291022816 on 2016/12/27 0027 20:12.
 */
(function(){
    var Score = window.Score = function(){
        this.scores = 0;
        this.highScores = 10;
        this.init();
    };

    Score.prototype.init = function(){
        this.loadScore();
    };
    Score.prototype.loadScore = function(){
        if(typeof(Storage) != "undefined"){
            this.highScores = localStorage.getItem("highScores");
            if(this.highScores == null){
                this.setScore(0);
                this.highScores = Number(localStorage.getItem("highScores"));
            }
        }else{
            console.log("false");
        }
    };

    Score.prototype.changeScore = function(){
        if(game.speed == 1){
            this.scores += 5;
        }else if(game.speed == 2){
            this.score += 10;
        }
        if(this.scores / 50 == 0 ){
            game.speed += 5;
        }
    };

    Score.prototype.setScore = function(value){
        localStorage.setItem("highScores",value);
    };
})();
