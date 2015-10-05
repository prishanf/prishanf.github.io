SFDCAdminHelperControllers
.factory('myFactory', function(){
  var _artist = 'Shakira';
  var service = {};

  service.getArtist = function(){
    return _artist;
  }

  return service;
});
