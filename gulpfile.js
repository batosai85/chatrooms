const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const usemin = require('gulp-jade-usemin');
const browserSync = require("browser-sync").create();



gulp.task('jade-min', function () {
    const src = "./src/views/*.jade";
    const dest = "./public/views"
    gulp.src(src)
        .pipe($.sourcemaps.init())
        .pipe(usemin())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dest));
});

gulp.task("css-min", function () {

    const src = ["./src/css/ie.fix.less", "./src/css/mozilla.fix.less"];
    const dest = "./build/css";
    return gulp.src(src)
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.cssmin())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }));

});

gulp.task('js-min', function () {

    const src = "./src/js/*.js";
    const dest = "./public/js";
    return gulp.src(src)
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }));

});


gulp.task("nodemon", function () {
    return $.nodemon({
        script: "server.js"
    });
});

gulp.task("watch-all", ["nodemon"], function () {

    browserSync.init({
        proxy: "localhost:3000",
        port: 5000,
        notify: true,
        open: false
    });
    gulp.watch("./src/views/*.jade", ["jade-min"]);
    gulp.watch("./src/css/*.less", ["css-min"]);
    gulp.watch("./src/js/*.js", ["js-min"]);

});