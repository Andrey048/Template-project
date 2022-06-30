export const server = (done) => {
   app.sync.init({
     server: {
       baseDir: 'docs'
     },
     cors: true,
     notify: false,
     ui: false,
   });
   done();
 }