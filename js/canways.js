var canways = (function () {

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
                tiles[i][j] = _.random(100) > 65 ? true : false;
            }
        }
        initialTilesState = _.clone(tiles);
    };

    function drawTile (tile, x, y) {
        ctx.beginPath();
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        if (tile)
            ctx.fillStyle = "#000000";
        else
            ctx.fillStyle = "#ffffff";
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

        var si = y - 1 < 0 ? 0 : y - 1;
        var sj = x - 1 < 0 ? 0 : x - 1;
        var iL = y + 1 > tilesOptions.rows - 1 ? tilesOptions.rows - 1 : y + 1;
        var jL = x + 1 > tilesOptions.cols - 1 ? tilesOptions.cols - 1 : x + 1;
        var k = 0;

        for (var i = si; i <= iL; i++) {
            for (var j = sj; j <= jL; j++) {
                if (y !== i || x !== j) {
                    if (tiles[i][j])
                        k++;
                }
            }
        }

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

    return {
        config: configCanvas,
        generateNext: genNextGen,
        draw: drawTiles,
        generate: generateFiled,
        retrieve: retrieveInitialState
    };
})();
