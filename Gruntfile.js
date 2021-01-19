module.exports = function(grunt) {

    // init
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-env']
            },
            dist: {
                files: {
                    'dist/cube-gallery.js': 'src/index.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/cube-gallery.js',
                dest: 'dist/cube-gallery.min.js'
            }
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // register tasks
    grunt.registerTask('default', ['babel', 'uglify']);
}