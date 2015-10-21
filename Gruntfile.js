var pkgjson = require('./package.json');

var config = {
	pkg: pkgjson,
	app: 'src',
	dist: 'dist'
}

var mybower = {
	directory : 'src/components',
	json : 'bower.json'
}

module.exports = function(grunt) {
	grunt.initConfig({
		config: config,
		pkg: config.pkg,
		// bower: grunt.file.readJSON('./.bowerrc'),
		bower: mybower,

		connect: {
			server: {
				options:{
					port: 9001,
					base: 'src'
				}
			}
		},

		jade: {
			compile: {
				options: {
					pretty: true,
				},
				files: {
					'<%= config.app %>/views/build/main.html': '<%= config.app %>/views/jade/main.jade',
					'<%= config.app %>/views/build/test.html': '<%= config.app %>/views/jade/test.jade'
				}
			}
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/components/font-awesome',
					src: 'css/font-awesome.min.css',
					dest: '<%= config.dist %>'
				},
				{
					expand: true,
					cwd: '<%= config.app %>/components/font-awesome',
					src: 'fonts/*',
					dest: '<%= config.dist %>'
				}]
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			dist: {
				files: {
					'<%= config.app %>/js/lib.min.js': [
					'<%= bower.directory %>/jquery/dist/jquery.js',
					'<%= bower.directory %>/underscore/underscore.js',
						// '<%= bower.directory %>/angular/angular.js',
						'<%= bower.directory %>/noty/js/noty/packaged/jquery.noty.packaged.js',
						]
					}
				}
			},

			jshint: {
				files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
				options: {
					globals: {
						jQuery: true
					}
				}
			},

			watch: {
				src: {
					options: { livereload: true },
					files: ['**/*.js', '**/*.jade'],
				 	tasks: ['jade']
				},
			},
		});

		require('load-grunt-tasks')(grunt);

		grunt.registerTask('default', ['copy', 'uglify', 'connect', 'jade', 'watch']);

		grunt.registerTask('buildbower', [
			'bower_concat',
			'uglify:bower'
			]);

		grunt.registerTask('mybuild', [
			'copy',
			'uglify'
			]);

		grunt.registerTask('serve', [
			'connect:server',
			'watch'
			]);

		grunt.registerTask('build-jade', 'Convert Jade templates into html templates', [
			'jade'
			]);
};
