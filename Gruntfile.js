module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['**'],
        options: {
          livereload: true
        },
      },
    },
    uglify: {
      asserts: {
        files: [{
          expand: true,
          src: 'public/js/*',
          dest: 'dist/js'
        }]
      }
    },
    cssmin: {
      asserts: {
        expand: true,
        src: 'public/css/*',
        dest: 'dist/css'
      }
    },
    ejs: {
      pages: {
        options: {
          enviroment: 'production'
        },
        cwd: 'public',
        src: ['*.html'],
        expand: true,
        dest: 'dist'
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ejs');
  grunt.loadNpmTasks('grunt-bump');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('min', ['uglify', 'cssmin']);

};
