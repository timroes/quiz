var autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	debug = require('gulp-debug'),
	fs = require('fs'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	merge = require('merge-stream'),
	minifyCss = require('gulp-minify-css'),
	ngAnnotate = require('gulp-ng-annotate'),
	rimraf = require('gulp-rimraf'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	templateCache = require('gulp-angular-templatecache'),
	uglify = require('gulp-uglify'),
	webserver = require('gulp-webserver'),
	zip = require('gulp-zip');

var pack = require('./package.json');

gulp.task('assets', function() {
	return gulp.src('src/assets/**', { base: 'src' })
		.pipe(gulp.dest('build'));
});

gulp.task('build', ['assets', 'html', 'js', 'libs', 'python', 'quizes', 'styles', 'templates']);

gulp.task('clean', function(cb) {
	return gulp.src('./build', { read: false })
		.pipe(rimraf());
});

gulp.task('default', ['serve']);

gulp.task('html', function() {
	return gulp.src(['src/**/*.html', '!src/views/**', '!src/scripts/directives/**'])
		.pipe(gulp.dest('build'));
});

gulp.task('js', ['jshint'], function() {
	return gulp.src('src/scripts/**/*.js')
		.pipe(sourcemaps.init())
			.pipe(concat('app.min.js'))
			.pipe(ngAnnotate())
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/scripts'));
});

gulp.task('jshint', function() {
	return gulp.src('src/scripts/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('libs', function() {
	return gulp.src('src/libs/**', { base: 'src' })
		.pipe(gulp.dest('build'));
});

gulp.task('package', ['build'], function() {
	return gulp.src(['build/**', '!build/quizes/list.json'])
		.pipe(zip(pack.name + '-' + pack.version + '.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('python', function() {
	return gulp.src('src/**/*.py')
		.pipe(gulp.dest('build'));
});

gulp.task('quizes', function() {
	return gulp.src('quizes/**')
		.pipe(gulp.dest('build/quizes/'));
});

gulp.task('quizlist', ['quizes'], function() {
	var quizes = fs.readdirSync('quizes/').filter(function(file) {
		return fs.statSync('quizes/' + file).isDirectory();
	});
	fs.writeFile('build/quizes/list.json', JSON.stringify(quizes));
});

gulp.task('serve', ['build', 'quizlist'], function() {
	gulp.watch('src/**', ['build']);
	gulp.src('./build')
		.pipe(webserver({ livereload: true, open: true }));
});

gulp.task('styles', function() {

	var less_src = gulp.src('src/styles/**/*.less')
		.pipe(less());

	var sass_src = gulp.src('src/styles/**/*.sass')
		.pipe(sass());

	var css_src = gulp.src('src/styles/**/*.css');

	return merge(less_src, sass_src, css_src)
		.pipe(concat('app.css'))
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest('build/styles'));
});

gulp.task('templates', function() {
	return gulp.src('src/views/**/*.html')
		.pipe(templateCache({ standalone: true }))
		.pipe(gulp.dest('build/scripts'));
});
