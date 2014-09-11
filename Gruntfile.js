module.exports = function(grunt) {
  // Project Configuration
	grunt.initConfig({
		uglify: {
			my_target: {
				options: {
      				mangle: true,
					compress: {
						drop_console: true
					}      				
    			},
				files: {
				}
			}
		},
		copy: {
			remoteProduction: {
				src: [
						'assets/**/*',
						'bower_components/**/*',
						'config/**/*',
						'lib/**/*',
						'!lib/font-awesome',
						'script/**/*',
						'lib/anijs/**/*'
					],
				dest: '../anijs.github.io/',
				options: {
				}
			},

			hmlOverwriteLocalDependencyLoad: {
				src: ['index.html'],
				dest: '../anijs.github.io/',
				options: {
					process: function (content, srcpath) {

						var YUI3 = {
							local: /<script src="..\/framework\/yui3\/3.11.0\/build\/yui\/yui-min.js"><\/script>/g,
							prod: '<script src="http://yui.yahooapis.com/3.14.1/build/yui/yui.js"></script>'
						};

						var AniJS = {
							local: /<script src="..\/..\/anijs\/src\/anijs.js"><\/script>/g,
							prod: '<script src="lib/anijs/anijs.js"></script>'
						};

						var AniJSDomHelper = {
							local: /<script src="..\/..\/anijs\/src\/helpers\/dom\/anijs-helper-dom.js"><\/script>/g,
							prod: '<script src="lib/anijs/helpers/dom/anijs-helper-dom.js"></script>'
						};
						var PureCSS = {
							local: /<link rel="stylesheet" href="bower_components\/pure\/pure.css">/g,
							prod: '<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.4.2/pure.css">'
						};

						var FontAwesome = {
							local: /<link rel="stylesheet" href="lib\/font-awesome\/css\/font-awesome.min.css">/g,
							prod: '<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css">'

						};

						var AnimateCSS = {
							local: /<link rel="stylesheet" href="lib\/animationcss\/animate.css">/g,
							prod: '<link rel="stylesheet" href="http://cdn.jsdelivr.net/animatecss/3.1.0/animate.css">'
						};

						//YUI3 local
						content = content.replace(YUI3.local, YUI3.prod);

						//AniJS
						//TODO: When put it in CDN replace this code
						content = content.replace(AniJS.local, AniJS.prod);
						content = content.replace(AniJSDomHelper.local, AniJSDomHelper.prod);
						//PureCSS
						content = content.replace(PureCSS.local, PureCSS.prod);

						//FontAwesome
						content = content.replace(FontAwesome.local, FontAwesome.prod);
						return content;
					}
				}
			}
		}
	});

  	// Load task-providing plugins.
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask(
		'prod',
		'Compiles all of the assets and copies the files to the build directory.', 
		[ 'uglify', 'copy' ]
	);
};