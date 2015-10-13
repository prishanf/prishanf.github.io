SFDCAdminHelperServices
.factory('SFDCFieldService', function($http,$q){
  var service = {};

  service.craeteFieldLocal = function(fields) {
    var deferred = $q.defer();
    console.log('craeteFieldLocal ' + fields);
    $http({
        method: 'GET',
        url: '/objectDetails.json',
        responseType :'json'
        }).then(function successCallback(response) {
          deferred.resolve(response.data);
    });
    return deferred.promise;

  }

  service.craeteFieldLocalSFDC = function(fields) {
    var deferred = $q.defer();
    console.log('craeteFieldLocalSFDC ' + fields);
    conn.sobject(objName).describe$(function(err, meta) {
      if (err) { return console.error(err); }
      console.log('Label : ' + meta.label);
      console.log('Num of Fields : ' + meta.fields.length);
      deferred.resolve(meta);
    });
    return deferred.promise;
  }

  service.craeteField = function(fields){
      if(conn.accessToken){
        return service.craeteFieldLocalSFDC(fields);
      }else{
        return service.craeteFieldLocal(fields);
      }
  }
  return service;
});
