// class Sprite {
//   constructor(options) {
//     this.ctx = options.ctx;

//     this.image = options.image;

//     this.frameIndex = 0;
//     this.tickCount = 0;
//     this.ticksPerFrame = options.ticksPerFrame || 0;
//     this.numberOfFrames = options.numberOfFrames || 1;

//     this.width = options.width;
//     this.height = options.height;

//     this.start();
//   }

//   update() {
//     this.tickCount++;

//     if (this.tickCount > this.ticksPerFrame) {
//       this.tickCount = 0;
//       if (this.frameIndex < this.numberOfFrames - 1) {
//         this.frameIndex++;
//       } else {
//         this.frameIndex = 0;
//       }
//     }
//   }

//   render() {
//     this.ctx.drawImage(
//       this.image,
//       (this.frameIndex * this.width) / this.numberOfFrames,
//       0,
//       this.width / this.numberOfFrames,
//       this.height,
//       0,
//       0,
//       this.width / this.numberOfFrames,
//       this.height
//     );
//   }

//   start() {
//     let loop = () => {
//       this.update();
//       this.render();

//       window.requestAnimationFrame(loop);
//     };

//     window.requestAnimationFrame(loop);
//   }
// }

// let canvas = document.getElementById("canvas");
// canvas.width = 100;
// canvas.height = 100;

// let coinImage = new Image();

// coinImage.src = "./img/coin-sprite-animation.png";


// let sprite = new Sprite({
//   ctx: canvas.getContext("2d"),
//   image: coinImage,
//   width: 1000,
//   height: 100,
//   numberOfFrames: 10,
//   ticksPerFrame: 4,
// });



var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -= 25;
  fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    // Отслеживание прикосновений
    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // Перезагрузка страницы
    }

    if (pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;