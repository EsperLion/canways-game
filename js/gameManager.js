var gameManager = (function (conways) {

    var game = null;

    var baseSpeed = 100;

    var gameSpeed = baseSpeed;

    var states = {
        paused: 'paused',
        play: 'play',
        stoped: 'stoped',
        init: 'init'
    };

    var currState;

    function initGame () {
        conways.config();
        generateNewFiled();
    };

    function stopGame () {
        stop();
        conways.retrieve();
        conways.draw();
    };

    function generateNewFiled () {
        conways.generate();
        conways.draw();
    };

    function go () {
        game = setInterval(function () {
            conways.generateNext();
            conways.draw();
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

    function clickTile (e) {
        conways.changeTileSate(e);
    };

    function showPopUp () {
        var top = getComputedStyle(document.getElementById('pop-up')).top;
        var show = null;
        return function () {
            document.getElementById('pop-up').style.top = '0px';
            clearTimeout(show);
            show = setTimeout(function () {
                document.getElementById('pop-up').style.top = top;
            },4000);
        };
    };

    return {
        setState: setState,
        states: states,
        generate: generateNewFiled,
        currState: getState,
        setSpeed: setSpeed,
        clickTile: clickTile,
        showPopUp: showPopUp()
    };
})(conways);