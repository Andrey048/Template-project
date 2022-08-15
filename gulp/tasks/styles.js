import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';

const sass = gulpSass(dartSass)

export const styles = () => {
   return app.gulp.src(app.path.src.scss)
     .pipe(sass())
     .pipe(postcss([
         autoprefixer(),
     ]))
     .pipe(csso())
     .pipe(rename(pathFile => {
         pathFile.basename += ".min";
     }))
     .pipe(app.gulp.dest(app.path.build.css))
     .pipe(app.sync.stream());
}