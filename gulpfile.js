var gulp = require('gulp');
var concat = require('gulp-concat');


gulp.task('default',['concat-js', 'watch']);

gulp.task('concat-js', function () {
   return gulp.src(['./js/canways.js', './js/*.js','!./js/game.js'])
       .pipe(concat('game.js'))
       .pipe(gulp.dest('js/'));
});

gulp.task('watch', function () {

   gulp.watch(['./js/*.js'],['concat-js']);
});