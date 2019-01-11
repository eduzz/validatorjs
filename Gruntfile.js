/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: 'src/*.js',
            options: {
                jshintrc: '.jshintrc'
            }
        },
        browserify: {
            enLang: {
                src: [],
                options: {
                    require: ['./src/lang/en:./lang/en']
                },
                dest: 'dist/lang/en.js'
            },
            dist: {
                files: {
                    'dist/validator.js': 'src/validator.js'
                },
                options: {
                    banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %> - " +
                    "<%= grunt.template.today('yyyy-mm-dd') %> */",
                    browserifyOptions: {
                        standalone: 'Validator'
                    }
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: 'dist/validator.js',
                dest: 'dist/validator.min.js'
            }
        },
        watch: {
            files: ['src/**/*.js'],
            tasks: ['default']
        }
    });

    // Default task.
    grunt.registerTask('build', ['browserify']);
    grunt.registerTask('dist', ['jshint', 'build', 'uglify']);
    grunt.registerTask('default', ['dist']);

};
