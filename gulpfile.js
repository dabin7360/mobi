var gulp = require('gulp'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	browserSync = require('browser-sync').create();

gulp.task('browser-sync',function(){
	var files = [
		'js/*/*.js',
		'css/**/*.css',
		'html/*.html',
		'*.html'
	];
	browserSync.init(files,{
		server : {
			baseDir:''
		}
	})
});

gulp.task('sass',function(){
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputstyle : 'compressed',
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError))
		.pipe(gulp.dest('css'));
})

gulp.task('sass:watch',function(){
	gulp.watch('sass/**/*.scss',['sass']);
})

gulp.task('imagemin',function(){
	gulp.src('big_image/*')
		.pipe(imagemin({
				optimizationLevel : 5,
				progressive: true,
				use:[pngquant()]
			}))
		.pipe(gulp.dest('resource'));
})

gulp.task('default',['browser-sync','sass','sass:watch'],function(){
	console.log('my name is dabin!');
})