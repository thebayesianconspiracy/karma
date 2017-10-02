"use strict";
module.exports = function(grunt) {

    grunt.initConfig({
        clean: ["dist"],
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: ["index.html", "cssmain.css", "jsmain.js", "res/jsdata.js", "imgs/kgp.jpg","imgs/choro.png","imgs/centroid.png","imgs/zones.png"],
                    dest: "dist/"
                }]
            }
        },

        "gh-pages": {
            options: {
                base: "dist"
            },
            src: ["**"]
        }
    });

    grunt.registerTask("build", ["clean", "copy:dist"]);

    require("load-grunt-tasks")(grunt);
};
