import gulp from "gulp";
import sync from "browser-sync";
import {path} from "./gulp/config/path.js";

global.app = {
   gulp: gulp,
   sync: sync,
   path: path,
}

import {copy} from "./gulp/tasks/copy.js";
import {clean} from "./gulp/tasks/clean.js";
import {styles} from "./gulp/tasks/styles.js";
import {html} from "./gulp/tasks/html.js";
import {js} from "./gulp/tasks/js.js";
import {optiImages, createWebp} from "./gulp/tasks/images.js";
import {convertFonts} from "./gulp/tasks/fonts.js";
import {server} from "./gulp/tasks/server.js";

const images = gulp.series(optiImages, createWebp);

const watcher = () => {
   gulp.watch(app.path.watch.scss, gulp.series(styles));
   gulp.watch(app.path.watch.html, gulp.series(html)).on("change", app.sync.reload);
   gulp.watch(app.path.watch.js, gulp.series(js));
}

const build = gulp.series(clean, copy, html, styles, js, images, convertFonts);
const dev = gulp.series(build, server, watcher);

export {build};

gulp.task('default', dev);