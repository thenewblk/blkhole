// gulpfile.js
// Include gulp
var gulp = require('gulp');

// npm install --save gulp gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename gulp-nodemon

// Include Our Plugins
var jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	nodemon = require('gulp-nodemon'),
  browserify = require('browserify'),
  reactify = require('reactify'),
	globify = require('require-globify'),
  source = require('vinyl-source-stream'),
	autoprefixer = require('gulp-autoprefixer');


// Lint Task
// gulp.task('lint', function() {
//     return gulp.src('public/javascripts/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('public/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
				.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/styles'));
});

// Compile Our React Stuff
gulp.task('react', function() {
    // Browserify/bundle the JS.
		// browserify -t reactify -t require-globify public/index.js -o public/bundle.js
    browserify('./public/index.js')
				.transform([reactify])
				.transform([globify])
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/'));
});

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('public/views/**/*.jsx', ['react']);
		gulp.watch('public/components/**/*.jsx', ['react']);
		gulp.watch('public/routes.jsx', ['react']);
    gulp.watch('public/styles/*.scss', ['sass']);
});

gulp.task('develop', function () {
  nodemon({ script: 'index.js', watch: ['routes', 'index.js'] })
    // .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    })
})

// Default Task
// gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
gulp.task('default', ['sass', 'react', 'watch', 'develop']);
