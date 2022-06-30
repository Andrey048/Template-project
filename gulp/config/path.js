const buildFolder = `./docs`
const srcFolder = `./source`

export const path = {
   build: {
      js: `${buildFolder}/js/`,
      css: `${buildFolder}/css/`,
      html: `${buildFolder}/`,
      images: `${buildFolder}/images/`,
      fonts: `${buildFolder}/fonts/`,
      files: `${buildFolder}/files/`,
   },
   src: {
      js: `${srcFolder}/js/**`,
      images: `${srcFolder}/images/**/*.{jpg,png,svg}`,
      webp: `${srcFolder}/images/**/*.{jpg,png}`,
      scss: `${srcFolder}/scss/pages/*.scss`,
      html: `${srcFolder}/*.html`,
      fonts: `${srcFolder}/fonts/`,
      files: `${srcFolder}/files/**/*.*`,
   },
   watch: {
      js: `${srcFolder}/js/**/*.js`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*.html`,
   },
   clean: buildFolder,
}