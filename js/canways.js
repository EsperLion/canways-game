var conways = (function () {

    var canvas = document.getElementById('game');

    var ctx = canvas.getContext('2d');

    var filed = {
        width: 800,
        height: 800,
        color: '#eee'
    };

    var tiles = [];

    var initialTilesState = [];

    var nextGen = [];

    var tilesOptions = {
        rows: 200,
        cols: 200,
    };

    var tileSize = 4;

    function configCanvas () {
        ctx.canvas.width = filed.width;
        ctx.canvas.height = filed.height;
        ctx.fillStyle = filed.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    function generateFiled () {
        for (var i = 0; i < tilesOptions.rows; i++) {
            tiles[i] = [];
            for (var j = 0; j < tilesOptions.cols; j++) {
                tiles[i][j] = _.random(100) > 45 ? true : false;
            }
        }
        initialTilesState = _.clone(tiles);
    };

    function drawTile (tile, x, y) {
        ctx.beginPath();
        if (tile)
            ctx.fillStyle = "#000000";
        else
            ctx.fillStyle = "#ffffff";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        ctx.fill();
    };

    function drawTiles () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < tilesOptions.rows; i++)
            for (var j = 0; j < tilesOptions.cols; j++)
                drawTile(tiles[i][j], j, i);
    };

    function genNextGen() {
        resetNextGen();
        for (var i = 0; i < tilesOptions.rows; i++)
            for (var j = 0; j < tilesOptions.cols; j++)
                genTile(tiles[i][j], j, i);
        copyNextGen();
    };

    function resetNextGen () {
        for (var i = 0; i < tilesOptions.rows; i++) {
            nextGen[i] = [];
            nextGen[i].length = tilesOptions.cols;
            _.fill(nextGen[i], false);
        }
    };

    function genTile (tile, x, y) {
        var cords = [];
        var k = 0;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (y + i === y && x + j === x)
                    continue;
                cords.push({
                    i: y + i < 0 ? tilesOptions.rows - 1 : y + i > tilesOptions.rows - 1 ? 0 : y + i,
                    j: x + j < 0 ? tilesOptions.cols - 1 : x + j > tilesOptions.cols - 1 ? 0 : x + j
                });
            }
        }

        for (var i = 0; i < cords.length; i++)
            if (tiles[cords[i].i][cords[i].j])
                k++;

        if (tile) {
            if (k >= 2 && k <= 3)
                nextGen[y][x] = true;
        } else if (!tile) {
            if (k === 3)
                nextGen[y][x] = true;
        }
    };

    function copyNextGen () {
        tiles = _.clone(nextGen);
    };

    function retrieveInitialState () {
        tiles = _.clone(initialTilesState);
    };

    function getMousePosition (e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    function changeTileState (e) {
        var mousePos = getMousePosition(e);
        var x = Math.floor(mousePos.x / tileSize);
        var y = Math.floor(mousePos.y / tileSize);
        tiles[y][x] = !tiles[y][x];
        drawTile(tiles[y][x], x, y);
    };

    return {
        config: configCanvas,
        generateNext: genNextGen,
        draw: drawTiles,
        generate: generateFiled,
        retrieve: retrieveInitialState,
        changeTileSate: changeTileState
    };
})();
