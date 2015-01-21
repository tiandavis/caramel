var gulp        	= require('gulp');
var harp        	= require('harp');
var premailer 		= require('gulp-premailer');
var shell			= require('shelljs');
var mandrill 		= require('mandrill-api');
var mandrill_client = new mandrill.Mandrill('MANDRILL-API-KEY');
var fs 				= require('fs');
 
gulp.task('harp:server', function() {
	harp.server(__dirname, {
		port: 9000
	});
});

gulp.task('harp:compile', function() {
	shell.exec('harp compile src ./www');
});

gulp.task('premailer', function() {
    gulp.src('./www/**/*.html')
		.pipe(premailer())
        .pipe(gulp.dest('./emails/'));
});

gulp.task('mandrill', function() {
	fs.readdirSync('./emails/').filter(function(file) {
		return file.substr(-5) === '.html';
    }).forEach(function(file) {
		var _data = JSON.parse(fs.readFileSync('./src/_data.json', 'utf-8'));
		console.log(_data);
		
		var fileName = file.trim().toLowerCase().replace(/\.[^/.]+$/, '');
		
		var templateName = fileName;
		var slug = templateName;
		var fromEmail = _data["defaults"].fromEmail;
		var fromName = _data["defaults"].fromName;
		var subject = _data[fileName].title;
		var code = fs.readFileSync('./emails/' + file, 'utf-8');
		var text = _data[fileName].text.join('\n\n');
		
		console.log([templateName, slug, fromEmail, fromName, subject, text]);

		mandrill_client.templates.add({"name": templateName, "slug": slug, "from_email": fromEmail, "from_name": fromName, "subject": subject, "code": code, "text": text, "publish": true}, function(result) {
            //console.log(result);
        }, function(e) {
            // Mandrill returns the error as an object with name and message keys
            if (e.message.indexOf("already exists")) {
				mandrill_client.templates.update({"name": templateName, "slug": slug, "from_email": fromEmail, "from_name": fromName, "subject": subject, "code": code, "text": text, "publish": true});
            } else {
				console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            }
        });
    });
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*.*'], ['harp:compile', 'premailer']);
});
 
gulp.task('default', ['harp:compile', 'premailer', 'harp:server', 'watch']);

gulp.task('inliner', ['premailer']);

gulp.task('esp', ['harp:compile', 'premailer', 'mandrill']);


