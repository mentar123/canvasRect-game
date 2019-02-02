
var currentPos = 0;
const color = ["red","green","blue","white"];
var score = 0;
var isStart = false;
var  continueAnimate = true;
 function random (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;};
 
function Rect(){
  this.rectH = 20;
  this.rectW = 20;
  this.postion = random(0,600);
  this.grav = random(2,5);
  this.colorNumb = random(0,color.length);
}

var rect1 = new Rect();


function animate() { 
  var scoreTable = document.getElementById('score');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d'); 
  if(!continueAnimate){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    return;
  } 
  isCursorRect = function (x,y){
    return x > rect1.postion && x < rect1.postion + 40 &&
           y > currentPos && y < currentPos + 50;
  };
  canvas.onclick = function(e){
    var x = e.pageX;
    var y = e.pageY;
    if(isCursorRect(x,y)){
      score+=1;
    scoreTable.innerHTML = score; 
      currentPos = canvas.clientHeight;
    }
  }
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);  
  ctx.fillStyle = color[rect1.colorNumb];
  ctx.fillRect(rect1.postion, currentPos, rect1.rectH, rect1.rectW);
  currentPos += rect1.grav;
  if(currentPos >= canvas.clientHeight) {
    currentPos = 0;
    rect1 = new Rect();
  }
  requestAnimationFrame(animate);
}
function startGame(){ 
  if(!isStart){
    score = 0;
    currentPos = 0;
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
