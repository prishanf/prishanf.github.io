SFDCAdminHelperControllers
.factory('myFactory', function(){
  var _artist = 'Shakira';
  var service = {};

  // service.getArtist = function(){
  //   return _artist;
  // }

  service.getArtist = function() {
    conn.describeGlobal(function(err, res) {
        if (err) { return console.error(err); }
        var objNames= res.sobjects.filter(function(item){
          return item.layoutable;
        });
        console.log(objNames.length);
        objNames.forEach(function(i){
           console.log(i.label);
        });
        return objNames;
      });
  }

  return service;
});
