SFDCAdminHelperControllers.
controller('SFDCObjectController',['$rootScope','myFactory',function($rootScope,myFactory){
    self = this;
    this.objs=['a'];
    self.objects =['Init'];
  //  this.artist = myFactory.getArtist();
    conn.describeGlobal().then(function(err, res) {
        self.objects.push('Err');
        console.log(self);
        if (err) {
          console.log(err);
          self.objects = ['Error'];
          return self;
        }
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
