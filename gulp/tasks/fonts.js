import fonter from 'gulp-fonter';
import ttfToWoff2 from 'gulp-ttftowoff2';

export const toWoff = () => {
   return app.gulp.src(`${app.path.src.fonts}/**/*.ttf`)
   .pipe(fonter({
      formats: ['woff', 'ttf']
   }))
   .pipe(app.gulp.dest(app.path.build.fonts))
}

export const toWoff2 = () => {
   return app.gulp.src(`${app.path.src.fonts}/**/*.ttf`)
   .pipe(ttfToWoff2())
   .pipe(app.gulp.dest(app.path.build.fonts));
}