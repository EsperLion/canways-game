window.addEventListener('DOMContentLoaded', function (e) {
    gameManager.setState(gameManager.states.init);
});

document.getElementById('start').addEventListener('click', function () {
    gameManager.setState(gameManager.states.play);
});

document.getElementById('pause').addEventListener('click', function () {
    if (gameManager.currState() === gameManager.states.play)
        gameManager.setState(gameManager.states.paused);
    else if (gameManager.currState() === gameManager.states.paused)
        gameManager.setState(gameManager.states.play);
});

document.getElementById('stop').addEventListener('click', function () {
    gameManager.setState(gameManager.states.stoped);
});

document.getElementById('gen').addEventListener('click', function () {
    gameManager.generate();
});

document.getElementById('speed').addEventListener('change', function (e) {
    gameManager.setSpeed(e.srcElement.options[e.srcElement.selectedIndex].value);
});

document.getElementById('game').addEventListener('click', function (e) {
    if (gameManager.currState() === gameManager.states.play) {
        gameManager.showPopUp();
        return;
    }
    gameManager.clickTile(e);
});





