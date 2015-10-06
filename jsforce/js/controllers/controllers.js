SFDCAdminHelperControllers.
controller('SFDCObjectController',['$rootScope','myFactory','$http',function($rootScope,myFactory,$http){
    self = this;
    this.objs=['a'];
    this.objects =['Init'];
    this.artist = [];
    this.cols =[{name:'label',select:true},{name:'name',select:true},{name:'custom',select:true},{name:'keyPrefix',select:true}];

    myFactory.getObjects().then(function(data){
        self.objects = data;
        //var cols =Object.keys(self.objects[0]);
        /*self.cols = cols.map(function(item){
           var obj ={};
           obj.name = item;
           obj.select = true;
           return obj;
         });
        console.log(Jself.cols); */
      });
}]);

SFDCAdminHelperControllers.controller('SFDCObjectDetailCtrl', ['$routeParams','myFactory',
  function($routeParams,myFactory) {
    var self = this;
    self.objectname = $routeParams.objName;
    self.custObject ={};
    this.cols =['label','name','type','length'];
    console.log($routeParams.phoneId);
    myFactory.getObjectsDetails(self.objectname).then(function(data){
      self.custObject = data;
    });

    this.getPickListValues = function(field){
      var picklist = field.picklistValues.map(function(item){
        return item.label;
      });
      return picklist;
    }
}]);
