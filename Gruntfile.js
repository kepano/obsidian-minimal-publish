/* 
Minimal Theme compiler for Obsidian

MIT License
Copyright (c) 2020-2021 Stephan Ango (@kepano)

Grunt is JS library that runs a sequence of compilation tasks, and watches 
the working files to automatically run this sequence whenever changes happen. 
Read more at gruntjs.com

See readme for more details:
https://github.com/kepano/obsidian-minimal
*/

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* Get the user-defined OBSIDIAN_PATH from .env file 
           so that we can live reload the theme in the vault */ 
        env : {
            local : {
              src : ".env"
            }
        },

        /* Compile the compressed and uncompressed versions of
        the theme using Sass */ 
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'src/css/main.min.css' : 'src/scss/index.scss'
                }
            }
        },

        /* Minify theme used for distribution and live reload */
        cssmin: {
            options: {
                advanced: false,
                aggressiveMerging: false,
                mediaMerging: false,
                restructuring: false
            },
            target: {
                files: {
                    'src/css/main.min.css' : 'src/css/main.min.css'
                }
            }
        },

        /* Concatenate theme files adding in the commented license, plugin compatibility, 
           and Style Settings that would otherwise be removed in compression */
        concat_css: {
            dist: {
                files: {
                  'publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/default.css',
                        'src/css/main.min.css'],
                  'color-schemes/ayu/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/ayu.css',
                        'src/css/main.min.css'],
                  'color-schemes/atom/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/atom.css',
                        'src/css/main.min.css'],
                  'color-schemes/ayu/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/ayu.css',
                        'src/css/main.min.css'],
                  'color-schemes/catppuccin/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/catppuccin.css',
                        'src/css/main.min.css'],
                  'color-schemes/dracula/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/dracula.css',
                        'src/css/main.min.css'],
                  'color-schemes/everforest/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/everforest.css',
                        'src/css/main.min.css'],
                  'color-schemes/flexoki/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/flexoki.css',
                        'src/css/main.min.css'],
                  'color-schemes/gruvbox/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/gruvbox.css',
                        'src/css/main.min.css'],
                  'color-schemes/macos/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/macos.css',
                        'src/css/main.min.css'],
                  'color-schemes/nord/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/nord.css',
                        'src/css/main.min.css'],
                  'color-schemes/sky/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/sky.css',
                        'src/css/main.min.css'],
                  'color-schemes/rose-pine/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/rose-pine.css',
                        'src/css/main.min.css'],
                  'color-schemes/solarized/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/solarized.css',
                        'src/css/main.min.css'],
                  'color-schemes/things/publish.css': [
                        'src/css/license.css',
                        'src/css/root.css',
                        'src/css/color-schemes/things.css',
                        'src/css/main.min.css']
                }
            }
        },

        /* Watch for changes, and compile new changes */ 
        watch: {
            css: {
                files: ['src/**/*.scss','src/**/*.css'],
                tasks: ['env','sass:dist','cssmin','concat_css']
            }
        }
    });
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('loadconst', 'Load constants', function() {
        grunt.config('OBSIDIAN_PATH', process.env.OBSIDIAN_PATH);
    });
    grunt.registerTask('default',['env:local','loadconst','watch']);
}