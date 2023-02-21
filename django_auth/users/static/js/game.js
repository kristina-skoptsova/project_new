var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "static/img/bird.png"; // Указание нужного изображения
bg.src = "static/img/bg.png";
fg.src = "static/img/fg.png";
pipeUp.src = "static/img/pipeUp.png";
pipeBottom.src = "static/img/pipeBottom.png";

var gap = 90;

function draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(pipeUp, 100, 0);
    ctx.drawImage(pipeBottom, 100, 0 + pipeUp.height + gap);
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, 10, 150);
}
pipeBottom.onload = draw;