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
			example: {
				port: 1337,
				base: 'src'
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
						// '<%= bower.directory %>/requirejs/require.js',
            '<%= bower.directory %>/noty/js/noty/packaged/jquery.noty.packaged.js',
					]
				}
			}
		}
		// bower_concat: {
		//   all: {
		//     dest: 'js/bower.js',
		//     dependencies: {
		//       'underscore': 'jquery'
		//     }
		//   }
		// },
		// uglify: {
		//    bower: {
		//     options: {
		//       mangle: true,
		//       compress: true
		//     },
		//     files: {
		//       'js/bower.min.js': 'js/bower.js'
		//     }
		//   }
		// }
	});
	require('load-grunt-tasks')(grunt);
	grunt.registerTask('default', 'connect:example');
	grunt.registerTask('buildbower', [
	  'bower_concat',
	  'uglify:bower'
	]);
	grunt.registerTask('mybuild', [
		'copy',
		'uglify'
	]);
};
