import imageMin from "gulp-imagemin";
import webp from "gulp-webp";


export const optiImages = () => {
   return app.gulp.src(app.path.src.images)
   .pipe(imageMin([
      imageMin.optipng({optimizationLevel: 3}),
      imageMin.mozjpeg({progressive: true}),
      imageMin.svgo(),
      ]))
   .pipe(app.gulp.dest(app.path.build.images));
};

export const createWebp = () => {
   return app.gulp.src(app.path.src.webp)
   .pipe(webp({quality: 90}))
   .pipe(app.gulp.dest(app.path.build.images));
};