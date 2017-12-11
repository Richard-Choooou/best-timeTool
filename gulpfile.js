const gulp = require('gulp')
const path = require('path')
const watch = require('gulp-watch')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const cmd = require('node-cmd')

const config = {
	autofx: {
		browsers: [
		   'ie >= 9',
		   'ie_mob >= 10',
		   'ff >= 30',
		   'chrome >= 34',
		   'safari >= 7',
		   'opera >= 23',
		   'ios >= 7',
		   'android >= 4.4',
		   'bb >= 10'
		],
		cascade: true,
		remove: true
	 }
}


function resolve(p) {
	return path.resolve(__dirname, './', p)
}

gulp.task('cmd', () => {
	cmd.get('npm run build', () => {
		console.log('finish')
	})
})


gulp.task('html', () => {
	console.log('html')
	return gulp.src(resolve('./src/**/*.html'))
			.pipe(gulp.dest(resolve('./dist')))
			.pipe(reload({stream: true}))
})


gulp.task('watch', () => {
	browserSync.init({      // 启动Browsersync服务
		server: {
			baseDir: resolve('./dist'),   // 启动服务的目录 默认 index.html    
			index: 'index.html' // 自定义启动文件名
		},
		open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
		injectChanges: true // 注入CSS改变
	});

	gulp.watch(resolve('./src/**/*.js'), ['cmd'])
	gulp.watch(resolve('./src/**/*.html'), ['html'])
	gulp.watch(resolve('./dist/**/*.js'), function() {
		console.log('change')
		
		gulp.src(
			resolve('./dist/bundle.js')
		).pipe(
			reload({stream: true})
		)
	})
})

gulp.task('default', ['watch'])