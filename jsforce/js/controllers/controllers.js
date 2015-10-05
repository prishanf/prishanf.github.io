SFDCAdminHelperControllers.
controller('SFDCObjectController',['$rootScope','myFactory',function($rootScope,myFactory){
    self = this;
    self.objects=[];
    this.artist = myFactory.getArtist();

    conn.describeGlobal(function(err, res) {
        if (err) { return console.error(err); }
        var objNames= res.sobjects.filter(function(item){
          return item.layoutable;
        });
        console.log(objNames.length);
        objNames.forEach(function(i){
           console.log(i.label);
        });
        self.objects=objNames;
      });
}]);
