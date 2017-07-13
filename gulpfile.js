var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	prefix = require('gulp-autoprefixer'),
	minCSS = require('gulp-clean-css'),
	browsersync = require('browser-sync').create();

function errorLog(error) {
	console.error.bing(error);
	this.emit('end');
}

// minifys JaveScript
gulp.task('js', function () {
	gulp.src('assets/js/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('compiled/js'));
});

// Compress images
gulp.task('images', function () {
	gulp.src('assets/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('compiled/img'))
});

// Compiles SASS
gulp.task('sass', function () {
	gulp.src('assets/scss/main.scss')
		.pipe(plumber())
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(prefix('last 2 versions'))
		.pipe(gulp.dest('compiled/css'))
});

// minify compiled css
gulp.task('minCSS', function () {
	gulp.src('compiled/css/main.css')
		.pipe(minCSS())
		.pipe(gulp.dest('compiled/css/min/'))
})

// Watch files
gulp.task('watch', function () {

	browsersync.init({
		server: {
			baseDir: './'
		}
	})

	gulp.watch('assets/js/**', ['js']).on('change', browsersync.reload);
	gulp.watch('assets/scss/**', ['sass']).on('change', browsersync.reload);
	gulp.watch('**/*.html').on('change', browsersync.reload);
});

// gulp runs all these scripts
gulp.task('default', ['js', 'sass', 'images', 'minCSS', 'watch']);