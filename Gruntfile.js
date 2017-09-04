module.exports = function(grunt) { // the general grunt function that is run

  grunt.initConfig({ // here we setup our config object with package.json and all the tasks

    pkg: grunt.file.readJSON('package.json'),

    sass: { // sass tasks
      dist: {
        options: {
          style: 'expanded' // we don't want to compress it
        },
        files: {
          'includes/css/style.css': 'includes/scss/style.scss' // this is our main scss file
        }
      }
    },

    cssmin: { // minifying css task
      dist: {
        files: {
          'includes/css/all.min.css': 'includes/css/style.css'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['includes/js/app.js', 'includes/js/global.js'],
        dest: 'includes/js/all.js',
      },
    },
    uglify: {
      default: {
        files: {
          'includes/js/all.min.js': 'includes/js/all.js'
        }
      }
    },

    watch: { // watch task for general work
      sass: {
        files: ['includes/scss/**/*.scss'],
        tasks: ['sass']
      },
      styles: {
        files: ['includes/css/style.css'],
        tasks: ['cssmin']
      }
    }
  });

  // all the plugins that is needed for above tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // registering the default task that we're going to use along with watch
  grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify']);
};