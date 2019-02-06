var score = 0;
var isStart = false;
var  continueAnimate = true;

function Rect(){
  this.currentPos = 0;
  this.colorArr = ["red","green","blue","white"];
  this.rectH = 20;
  this.rectW = 20;
  this.postion = random(0,600);
  this.grav = random(2,5);
  this.colorNumb = random(0,this.colorArr.length);
  this.setColor = ()=>this.colorArr[this.colorNumb];
  function random (min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;};
  
}

var rectRand = new Rect();

function animate() { 
  var scoreTable = document.getElementById('score');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d'); 
  if(!continueAnimate){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    return;
  } 

  isCursorRect = function (x,y){
    return x > rectRand.postion && x < rectRand.postion + 40 &&
           y > rectRand.currentPos && y < rectRand.currentPos + 50;
  };
  canvas.onclick = function(e){
    var x = e.pageX;
    var y = e.pageY;
    if(isCursorRect(x,y)){
      score+=1;
    scoreTable.innerHTML = score; 
    rectRand.currentPos = canvas.clientHeight;
    }
  }
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);  
  ctx.fillStyle = rectRand.setColor();
  ctx.fillRect(rectRand.postion, rectRand.currentPos, rectRand.rectH, rectRand.rectW);
  rectRand.currentPos += rectRand.grav;
  if(rectRand.currentPos >= canvas.clientHeight) {
    rectRand.currentPos = 0;
    rectRand = new Rect();
  }
  requestAnimationFrame(animate);
}
function startGame(){ 
  if(!isStart){
    score = 0;
    rectRand = new Rect();
    continueAnimate = true;
    isStart = true;
    document.getElementById('score').innerHTML = score;
    animate();
  }
  
}
function stopGame(){
  if(isStart){
    continueAnimate = false;
    isStart = false;
  }
  
}
document.body.onload = ()=>{
let startBtn =  document.getElementById('start');
let stopBtn = document.getElementById('stop');
startBtn.addEventListener("click",startGame);
stopBtn.addEventListener("click",stopGame)
};
