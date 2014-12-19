/// <vs AfterBuild='default' />
module.exports = function (grunt) {
    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var fs = require('fs');
    var path = require('path');

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        qunit: {
            all: ['js/specs/**/*.html']
        },
        jshint: {
            options: {
                browser: true
            },
            files: ['Gruntfile.js', 'js/dev/*.js']
        },
        watch: {
            scripts: {
                files: ['**/js/dev/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            }
        },
        uglify: {
            options: {
                compress: true,
                banner: '<%= banner %>'
            },
            lsCache: {
                src: [
                    'js/dev/*.js'
                ],
                dest: 'dist/lsCache.min.js'
            }

        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'js/dev/',
                    themedir: 'path/to/custom/theme/',
                    outdir: 'docs/',
                    "themedir": "node_modules\yuidoc-bootstrap-theme",
                    "helpers": ["node_modules\yuidoc-bootstrap-theme/helpers/helpers.js"]
                }
            }
        }

    });

    // Default task.
    grunt.registerTask('default', [ /*'jshint', 'qunit', */ 'uglify']);

};