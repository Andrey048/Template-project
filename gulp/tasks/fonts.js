import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
   return app.gulp.src(`${app.path.src.fonts}/*.otf`)
      .pipe(fonter({
         formats: ['ttf']
      }))
      .pipe(app.gulp.dest(app.path.build.fonts))
}

export const ttfToWoff = () => {
   return app.gulp.src(`${app.path.src.fonts}/*.ttf`)
      .pipe(fonter({
         formats: ['woff']
      }))
      .pipe(app.gulp.dest(app.path.build.fonts))
}

export const ttfToWoff2 = () => {
   return app.gulp.src(`${app.path.src.fonts}/*.ttf`)
      .pipe(ttf2woff2({
         formats: ['woff2']
      }))
      .pipe(app.gulp.dest(app.path.build.fonts))
}