import fileInclude from "gulp-file-include";
import webpHtml from 'gulp-webp-html-nosvg';
import htmlMin from 'gulp-htmlmin';

export const html = () => {
   return app.gulp.src(app.path.src.html)
      .pipe(fileInclude({
         prefix: '@@',
         basepath: '@file'
         }))
      .pipe(webpHtml())
      .pipe(htmlMin({ collapseWhitespace: true }))
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.sync.stream());
}