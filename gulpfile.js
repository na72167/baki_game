//plug-in
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var sassGlob = require("gulp-sass-glob");

//CSS圧縮
gulp.task('minifycss', function() {
    return gulp.src("src/css/*.css")
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css'));
  });

// sassをコンパイル
gulp.task('sass', function(){
  gulp.src('./src/scss/style.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

// 画像圧縮
// 圧縮前と圧縮後のディレクトリを定義
var paths = {
  srcDir : 'src',
  dstDir : 'dist'
};
// jpg,png,gif画像の圧縮タスク
gulp.task('imagemin', function(){
  var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
  var dstGlob = paths.dstDir;
  gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
      ]
    ))
    .pipe(gulp.dest( dstGlob ));
});


// Gulpを使ったファイルの監視
// watch()を使う
// 第一引数は監視したいディレクトリ配下

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

// defaultで動かすタスクを指定
// defaultに設定しておくとgulpコマンドだけでタスクが実行される
// 書き方は第二引数に配列でタスクを指定する
// gulp.task(‘default’,[‘タスク名’,’タスク名’,’タスク名’,…]);
gulp.task('default',['minifycss','sass',]);