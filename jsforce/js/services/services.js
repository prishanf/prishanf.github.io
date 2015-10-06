SFDCAdminHelperControllers
.factory('myFactory', function($http,$q){
  var service = {};

  service.getObjectsLocal = function() {
    var deferred = $q.defer();

    $http({
        method: 'GET',
        url: '/data.json',
        responseType :'json'
        }).then(function successCallback(response) {
          var objNames= response.data.sobjects.filter(function(item){
            return item.layoutable;
          });
          objNames.forEach(function(i){
          });
          deferred.resolve(objNames);

    });
    return deferred.promise;

  }

  service.getObjectsSFDC = function() {
    var deferred = $q.defer();
    conn.describeGlobal(function(err, res) {
        if (err) {
          deferred.resolve(['Error']);
          return console.error(err);
         }
        var objNames= res.sobjects.filter(function(item){
          return item.layoutable;
        });
        objNames.forEach(function(i){
        });
        deferred.resolve(objNames);
      });
      return deferred.promise;
  }

  service.getObjectsDetailsLocal = function() {
    var deferred = $q.defer()
    $http({
        method: 'GET',
        url: '/objectDetails.json',
        responseType :'json'
        }).then(function successCallback(response) {
          deferred.resolve(response.data);
    });
    return deferred.promise;

  }

  service.getObjectsDetailsSDFC = function(objName) {
    var deferred = $q.defer();
    console.log(objName);
    conn.sobject(objName).describe$(function(err, meta) {
      if (err) { return console.error(err); }
      console.log('Label : ' + meta.label);
      console.log('Num of Fields : ' + meta.fields.length);
      deferred.resolve(meta);
    });
    return deferred.promise;
  }

  service.getObjects = function(){
      if(conn.accessToken){
        return service.getObjectsSDFC();
      }else{
        return service.getObjectsLocal();
      }
  }

  service.getObjectsDetails = function(){
      if(conn.accessToken){
        return service.getObjectsDetailsSDFC();
      }else{
        return service.getObjectsDetailsLocal();
      }
  }

  return service;
});
