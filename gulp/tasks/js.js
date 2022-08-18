import minify from "gulp-minify";

export const js = () => {
   return app.gulp.src(app.path.src.js)
   .pipe(minify({
      noSource: true,
      ext: {
         min: ".js",
      },
   }))
   .pipe(app.gulp.dest(app.path.build.js))
   .pipe(app.sync.stream());
};