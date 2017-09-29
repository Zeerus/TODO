// * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// PATHS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * *
const path = {
    sass: './src/scss',
    css: './src'
}



// * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Code
// * * * * * * * * * * * * * * * * * * * * * * * * * * * *
const gulp          = require('gulp')
const sass          = require('gulp-sass')
const allSassFiles  = path.sass + '/**/*.scss'

gulp.task('style', () => {
    var cssFiles = ['/App.scss', '/TODOModule.scss', '/FullScreenDialog.scss']
    for (var i = 0; i < cssFiles.length; i++){
        gulp.src(path.sass + cssFiles[i])
            .pipe(sass())
            .pipe(gulp.dest(path.css))
    }
})

gulp.task('watch', () => {
    gulp.watch(allSassFiles, ['style'])
})
