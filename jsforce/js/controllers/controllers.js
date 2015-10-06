SFDCAdminHelperControllers.
controller('SFDCObjectController',['$rootScope','myFactory','$http',function($rootScope,myFactory,$http){
    self = this;
    this.objs=['a'];
    this.objects =['Init'];
    this.artist = [];
    this.cols =[{name:'Label',select:true},{name:'Api',select:false}];


    // myFactory.getArtist().then(function(data){
    //   self.artist = data;
    //   self.objects = data;
    //   console.log(self.objects);
    //   var cols =Object.keys(self.objects[0]);
    //   self.cols = cols.map(function(item){
    //      var obj ={};
    //      obj.name = item;
    //      obj.select = true;
    //      return obj;
    //    });
    //    console.log(self.cols);
    // });

    myFactory.getObjects().then(function(data){
      self.objects = data;
      var cols =Object.keys(self.objects[0]);
      self.cols = cols.map(function(item){
         var obj ={};
         obj.name = item;
         obj.select = true;
         return obj;
       });
       console.log(self.cols);
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
