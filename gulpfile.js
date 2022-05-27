const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html-nosvg");
const del = require("del");
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');



const copy = () => {
   return gulp.src([
      "source/fonts/**/*.*",
      "source/img/**",
      "source/js/**",
      "source/*.ico"
      ], {base: "source"})
      .pipe(gulp.dest("build"));
   };
exports.copy = copy;


const clean = () => {
   return del("build");
  };
exports.clean = clean;


const styles = () => {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .on('error', catchErr)
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

function catchErr(e) {
   console.log(e);
   this.emit('end');
}


const html = () => {
   return gulp.src("source/*.html")
      .pipe(fileinclude({
         prefix: '@@',
         basepath: '@file'
         }))
      .pipe(webphtml())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build/"))
      .pipe(sync.stream());
}
exports.html = html;


const images = () => {
   return gulp.src("source/img/**/*.{jpg,png,svg}")
      .pipe(imagemin([
         imagemin.optipng({optimizationLevel: 3}),
         imagemin.mozjpeg({progressive: true}),
         imagemin.svgo(),
         ]))
      .pipe(gulp.dest("build/img"))

}
exports.images = images;


const createWebp = () => {
   return gulp.src("source/img/**/*.{png,jpg}")
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest("source/img"))
}
exports.createWebp = createWebp;


const sprite = () => {
   return gulp.src("source/img/**/*.svg")
      .pipe(svgstore())
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest("build/img"))
  }
exports.sprite = sprite


const fonts = () => {
   return gulp.src("source/fonts/**/*.otf")
      .pipe(fonter({
         formats: ['ttf']
      }))
      .pipe(gulp.dest('build/fonts'))

      .pipe(gulp.src("source/fonts/**/*.ttf"))
      .pipe(fonter({
         formats: ['woff']
      }))
      .pipe(gulp.dest('build/fonts'))

      .pipe(gulp.src("source/fonts/**/*.ttf"))
      .pipe(ttf2woff2())
      .pipe(gulp.dest('build/fonts'));
}
exports.fonts = fonts;


const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;


const watcher = () => {
  gulp.watch("source/scss/**/*.scss", gulp.series("styles"));
  gulp.watch("source/**/*.html", gulp.series("html")).on("change", sync.reload);
}


const build = gulp.series(
   clean,
   copy,
   styles,
   html,
   server,
   watcher,
  );
exports.build = build;


exports.default = gulp.series(
  clean,
  copy,
  styles,
  // sprite,
  html,
  fonts,
  images,
  createWebp,
  server,
  watcher,
);
