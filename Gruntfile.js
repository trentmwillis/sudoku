module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            app: {
                files: {
                    'build/js/app.min.js': ['js/app.js']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['styles.scss'],
                    dest: 'build/css',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            css: {
                files: ['scss/*.scss'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('startWatch', ['watch']);
    grunt.registerTask('default', ['sass', 'uglify']);

};
