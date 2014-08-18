module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      public: {
        files: 'public/**',
        options: {
          livereload: true,
          spawn: false
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      asserts: {
        files: [{
          expand: true,
          cwd: 'public',
          src: 'js/*',
          dest: 'dist'
        }]
      }
    },
    cssmin: {
      asserts: {
        expand: true,
        cwd: 'public',
        src: 'css/*',
        dest: 'dist'
      }
    },
    ejs: {
      pages: {
        options: {
          environment: 'production',
          livereload: false
        },
        cwd: 'public',
        src: ['*.html'],
        expand: true,
        dest: 'dist'
      }
    },
    htmlmin: {
      pages: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: 'dist',
        src: ['*.html'],
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
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-ejs');
  grunt.loadNpmTasks('grunt-bump');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'ejs', 'htmlmin']);

};
