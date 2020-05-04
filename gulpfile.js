var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync');

// Tasks
gulp.task('browser-sync', function() {
	browserSync({
		server: './',
		notify: false,
		ui: false
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});
 
gulp.task('styles', function(){
	gulp.src('theme/styles/sass/**/*.scss')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer('last 3 versions'))
		.pipe(gulp.dest('theme/styles/'))
		.pipe(browserSync.stream())
});

gulp.task('scripts', function(){
	gulp.src('theme/scripts/master.js')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('master.min.js'))
		.pipe(uglify({
			//preserveComments: 'some'
		}))
		.pipe(gulp.dest('theme/scripts/'))
		.pipe(browserSync.stream());

	gulp.src('theme/scripts/form.js')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('form.min.js'))
		.pipe(uglify({
			//preserveComments: 'some'
		}))
		.pipe(gulp.dest('theme/scripts/'))
		.pipe(browserSync.stream());	
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch('theme/styles/**/*.scss', ['styles']);
	gulp.watch('theme/scripts/**/*.js', ['scripts']);
	gulp.watch(['**/*.html', '!node_modules'], ['bs-reload']);
});
