module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    less: {
      main: {
        options: {
          compress: true,
          cleancss: true,
          strictImports: true,
          strictMath: true,
          strictUnits: true
        },
        files: {
          "dist/clockwise.css": "src/clockwise.less",
        }
      }
    },
    "bower-install": {
      target: {
        src: ["dist/index.html"]
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/*.html"],
            dest: "dist/",
            filter: "isFile"
          },
          {
            expand: true,
            flatten: true,
            src: ["src/img/*"],
            dest: "dist/img/",
            filter: "isFile"
          },
          {
            expand: true,
            flatten: true,
            src: ["src/fonts/*"],
            dest: "dist/fonts/",
            filter: "isFile"
          },
        ]
      },
      dependencies: {
        files: [
          {
            expand: true,
            src: ["bower_components/**/*.js"],
            dest: "dist/",
            filter: "isFile"
          },
        ]
      }
    },
    connect: {
      "static": {
        options: {
          hostname: "localhost",
          base: "dist/"
        }
      }
    },
    watch: {
      scripts: {
        files: ["src/*"],
        tasks: ["less", "copy:main", "bower-install"],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-bower-install");
  grunt.loadNpmTasks("grunt-contrib-less");

  grunt.registerTask("build", ["less", "copy:main", "bower-install", "copy:dependencies"]);
  grunt.registerTask("dev", ["build", "connect:static", "watch"]);
  grunt.registerTask("default", ["build"]);

};
