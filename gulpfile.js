var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cssbeautify = require('gulp-cssbeautify'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	prefix = require('gulp-autoprefixer'),
	browsersync = require('browser-sync').create();

function errorLog(error) {
	console.error.bing(error);
	this.emit('end');
}

// minifys JaveScript files all ending in .js
gulp.task('scripts', function() {
	gulp.src('assets/js/functions.js')
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
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(prefix(['last 2 versions'], {cascade: true}))
		.pipe(gulp.dest('assets/compiled/css'))
		.pipe(browsersync.reload({stream: true}));
});


// pretty css
gulp.task('css', function() {
		return gulp.src('assets/compiled/css/*.css')
				.pipe(cssbeautify({
						indent: '  ',
						openbrace: 'separate-line',
						autosemicolon: true
				}))
				.pipe(gulp.dest('assets/compiled/css/clean'));;
});

// Watch files and compiles on save
gulp.task('watch', function() {

	browsersync.init({
		server: {
			baseDir: './'
		}
	})
	gulp.watch('assets/js/*.js', ['scripts']);
	gulp.watch('assets/css/**', ['sass']);
	gulp.watch('**/*.html').on('change', browsersync.reload);
});




// gulp runs all these scripts
gulp.task('default', ['scripts', 'sass', 'watch', 'images', 'css']);
