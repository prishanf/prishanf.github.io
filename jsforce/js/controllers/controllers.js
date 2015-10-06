SFDCAdminHelperControllers.
controller('SFDCObjectController',['$rootScope','myFactory','$http',function($rootScope,myFactory,$http){
    self = this;
    this.objs=['a'];
    this.objects =['Init'];
    this.artist = [];


    myFactory.getArtist().then(function(data){
      self.artist = data;
    });

    myFactory.getObjects().then(function(data){
      self.objects = data;
    });
    // conn.describeGlobal().then(function(err, res) {
    //     self.objects.push('Err');
    //     console.log(self);
    //     if (err) {
    //       console.log(err);
    //       self.objects = ['Error'];
    //       return self;
    //     }
    //     var objNames= res.sobjects.filter(function(item){
    //       return item.layoutable;
    //     });
    //     console.log(objNames.length);
    //     objNames.forEach(function(i){
    //        console.log(i.label);
    //     });
    //     self.objects=objNames;
    //   });

}]);
