var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	prefix = require('gulp-autoprefixer');


// minifys JaveScript files all ending in .js
gulp.task('scripts', function() {
	gulp.src('assets/js/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('assets/compiled/js'));
});

// Compress images
gulp.task('images', function() {
	gulp.src('assets/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/compiled/img'))
});

// Compiles SASS
gulp.task('sass', function() {
	gulp.src('assets/css/main.sass')
		.pipe(plumber())
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(prefix('last 2 versions'))
		.pipe(gulp.dest('assets/compiled/css'));
});

// Watch files and compiles on save
gulp.task('watch', function() {
	gulp.watch('assets/js/*.js', ['scripts']);
	gulp.watch('assets/css/**', ['sass']);
});




// gulp runs all these scripts
gulp.task('default', ['scripts', 'sass', 'watch', 'images']);
