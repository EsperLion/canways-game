var gameManager = (function (canways) {

    var game = null;
    var baseSpeed = 700;
    var gameSpeed = baseSpeed;
    var states = {
        paused: 'paused',
        play: 'play',
        stoped: 'stoped',
        init: 'init'
    };

    var currState;

    function initGame () {
        canways.config();
        generateNewFiled();
    };

    function stopGame () {
        stop();
        canways.retrieve();
        canways.draw();
    };

    function generateNewFiled () {
        canways.generate();
        canways.draw();
    };

    function go () {
        game = setInterval(function () {
            canways.generateNext();
            canways.draw();
        }, gameSpeed);
    };

    function stop () {
        clearInterval(game);
    };

    function setState (state) {
        currState = state;

        if (currState === states.init) {
            initGame();
            disable('pause');
            disable('stop');
        } else if (currState === states.play) {
            go();
            disable('start');
            disable('gen');
            enable('pause');
            enable('stop');
        } else if (currState === states.paused) {
            stop();
        } else if (currState === states.stoped) {
            stopGame();
            enable('start');
            enable('gen');
            disable('pause');
            disable('stop');
        }
    };

    function getState() {
        return currState;
    };

    function setSpeed(ratio) {
        gameSpeed = baseSpeed / ratio;
        if (currState === states.play) {
            stop();
            go();
        }
    };

    function disable (id) {
        document.getElementById(id).disabled = true;
    };
    function enable (id) {
        document.getElementById(id).disabled = false;
    };

    return {
        setState: setState,
        states: states,
        generate: generateNewFiled,
        currState: getState,
        setSpeed: setSpeed
    };
})(canways);