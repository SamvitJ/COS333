module.exports = function(grunt) {
  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  bower: {
  dev: {
    dest: 'bower_components/bootstrap/scss/_variables.scss'
  }
}

});

  grunt.loadNpmTasks('grunt-bower');

};