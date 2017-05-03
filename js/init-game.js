
canways.config();

canways.generate();

canways.draw();

var game = null;

game = setInterval(function () {
    canways.generateNext();
    canways.draw();
}, 300);




