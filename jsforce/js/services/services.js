SFDCAdminHelperControllers
.factory('myFactory', function($http,$q){
  var _artist = 'Shakira';
  var service = {};

  // service.getArtist = function(){
  //   return _artist;
  // }

  service.getArtist = function() {
    var deferred = $q.defer()
    $http({
        method: 'GET',
        url: '/data.json',
        responseType :'json'
        }).then(function successCallback(response) {
           deferred.resolve(response.data);
    });
    return deferred.promise;

  }

  service.getObjects = function() {
    var deferred = $q.defer();
    conn.describeGlobal(function(err, res) {
        if (err) {
          deferred.resolve(['Error']);
          return console.error(err);
         }
        var objNames= res.sobjects.filter(function(item){
          return item.layoutable;
        });
        console.log(objNames.length);
        objNames.forEach(function(i){
        });
        deferred.resolve(objNames);
      });
      return deferred.promise;
  }

  return service;
});
