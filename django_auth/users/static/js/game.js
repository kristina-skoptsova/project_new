var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image(); 
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png"; // Указание нужного изображения
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";