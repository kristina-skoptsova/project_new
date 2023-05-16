var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var gmOvr = new Image();

bird.src = "static/img/bird.png"; // Указание нужного изображения
bg.src = "static/img/bg.png";
fg.src = "static/img/fg.png";
pipeUp.src = "static/img/pipeUp.png";
pipeBottom.src = "static/img/pipeBottom.png";
gmOvr.src = "static/img/gmOvr.png";

var gap = 90;
var  restartBtn = window.document.querySelector('#restart');
var user = document.getElementById('user').innerText;

// При нажатии на кнопку
document.addEventListener('keydown', moveUp);
function moveUp() {
    yPos -= 25;
}

//Создание блоков
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}
var score = 0;
//позиция птицы
var xPos = 5;
var yPos = 150;
var grav = 1.5;

function gameOver() {
        ctx.drawImage(gmOvr, cvs.height/2-200, cvs.width/2, 200, 80)
        ctx.fillStyle = '#000';
            ctx.font = '24px Verdana';
            ctx.fillText('Ваш счет: ' + score, 10, cvs.height - 20)
        cancelAnimationFrame(draw)
        restart()
}
function restart() {
    restartBtn.addEventListener('click', ()=>{
    window.document.location.reload();
    });
    addScore()
}
function draw() {
    ctx.drawImage(bg, 0, 0);
    for(var i=0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        //задаются рандомно блоки
        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        // проверка прикосновений
        if(xPos + bird.width >=pipe[i].x
           && xPos <= pipe[i].x + pipeUp.width
           && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                pipe.splice(0, pipe.length)
                gameOver();
                //Заново начинается игра
           }
        if(pipe[i].x == 5) {
            score++;
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;

    ctx.fillStyle = '#000';
    ctx.font = '24px Verdana';
    ctx.fillText('Счет: ' + score, 10, cvs.height - 20)
    requestAnimationFrame(draw)
}
pipeBottom.onload = draw;

function addScore(){
    existingScore = JSON.parse(localStorage.getItem(user));
    if(existingScore == null) existingScore = [];
    var dict_t = score;
    existingScore.push(dict_t);
    localStorage.setItem(user, JSON.stringify(existingScore));
    array_last_five = existingScore.slice(-5)
    document.getElementById("text").innerText += array_last_five
    return existingScore
}
const leaderBoard = localStorage;
function addResult(){
    const users = Object.keys(leaderBoard).map(user => ({
        user,
        score: leaderBoard[user]
    }));
    users.sort((a, b) => Math.max(...b.score) - Math.max(...a.score));
    const leaderBoardTable = document.getElementById('leaderboard');
    users.forEach(user => {
        const row = document.createElement('tr');
        const userCell = document.createElement('td');
        userCell.textContent = user.user;
        row.appendChild(userCell);
        const bestScoreCell = document.createElement('td');
        bestScoreCell.textContent = Math.max(...user.score);
        row.appendChild(bestScoreCell);
        leaderBoardTable.querySelector('tbody').appendChild(row);
    });
}
window.addEventListener('load', addResult);