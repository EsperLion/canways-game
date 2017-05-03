

(function (angular, _) {

    'use strict';


    angular.module('App',[]);


    angular.module('App')
        .controller('Controller',
            [
                '$scope',
                '$interval',
                function ($scope, $interval) {

                var vm = this;

                vm.tiles = [];

                vm.nextGen = []

                vm.generateField = generateField;
                vm.generateField();

                vm.genNextGen = genNextGen;

                vm.copyNextGen = copyNextGen;


                $interval(function () {
                    for (var i = 0; i < 200; i++) {
                        for (var j = 0; j < 200; j++) {
                            vm.genNextGen(vm.tiles[i][j], j, i);
                        }
                    }
                    copyNextGen(vm.tiles, vm.nextGen);
                    for (var i = 0; i < 200; i++) {
                        for (var j = 0; j < 200; j++) {
                            vm.nextGen[i][j] = false;
                        }
                    }
                }, 300);

                function generateField () {

                    for (var i = 0; i < 200; i++) {
                        vm.tiles[i] = [];
                        vm.nextGen[i] = [];
                        for (var j = 0; j < 200; j++) {
                            vm.tiles[i][j] = _.random(100) > 60;
                            vm.nextGen[i][j] = false;
                        }
                    }

                    console.log(vm.tiles);

                };



                function genNextGen (tile, x, y) {

                    var si = y - 1 < 0 ? 0 : y - 1;
                    var sj = x - 1 < 0 ? 0 : x - 1;
                    var iL = y + 1 > 199 ? 199 : y + 1;
                    var jL = x + 1 > 199 ? 199 : x + 1;
                    var k = 0;

                    for (var i = si; i <= iL; i++) {
                        for (var j = sj; j <= jL; j++) {
                            if (y !== i || x !== j) {
                                if (vm.tiles[i][j])
                                    k++;
                            }
                        }
                    }

                    if (tile) {
                        if (k >= 2 && k <= 3)
                            vm.nextGen[y][x] = true;
                    } else if (!tile) {
                        if (k === 3)
                            vm.nextGen[y][x] = true;
                    }

                };

                function copyNextGen (a, b) {
                    for (var i = 0; i < 200; i++) {
                        for (var j = 0; j < 200; j++) {
                            a[i][j] = b[i][j];
                        }
                    }
                };

            }]);


})(angular, _);