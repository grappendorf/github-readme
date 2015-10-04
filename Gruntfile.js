module.exports = function(grunt) {

  var mapUrlToBowerComponents = function(req, res, next) {
    url_parts = req.url.split('/');
    if (url_parts.length > 2 && url_parts[1] != 'bower_components') {
      req.url = '/bower_components' + req.url;
    }
    return next();
  };

  grunt.initConfig({
    connect: {
      server: {
        options: {
          open: true,
          keepalive: true,
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(mapUrlToBowerComponents);
            return middlewares;
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect']);
};
