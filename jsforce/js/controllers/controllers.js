SFDCAdminHelperControllers.
controller('SFDCObjectController',['$rootScope','myFactory','$http','NgTableParams','$sce',function($rootScope,myFactory,$http,NgTableParams,$sce){
    self = this;
    this.objs=['a'];
    this.objects =['Init'];
    this.artist = [];
    //this.cols =[{name:'label',select:true},{name:'name',select:true},{name:'custom',select:true},{name:'keyPrefix',select:true}];
    self.colsd = [
      { field: "label", title: "Label", show: true,filter: { label: "text" } ,sortable: "label", getValue: htmlValue},
      { field: "name", title: "Name", show: true,filter: { name: "text" } ,sortable: "name", getValue: normal},
      { field: "custom", title: "Custom", show: true, filter: { custom: "select" }, getValue: normal,filterData: [{id:true,title:'True'},{id:false,title:'False'}], sortable: "custom"},
      { field: "customSetting", title: "Custom Setting", show: true, getValue: normal, filter: { customSetting: "select" }, filterData: [{id:true,title:'True'},{id:false,title:'False'}], sortable: "customSetting"}
    ];

    self.tableParams = new NgTableParams();
    // self.tableParams = new NgTableParams({}, {
    //   getData: function(params){
    //      return myFactory.getObjects();
    //   }
    // });

    myFactory.getObjects().then(function(data){
        self.objects = data;
        self.tableParams.settings({
              dataset: data
        });
        //var cols =Object.keys(self.objects[0]);
        /*self.cols = cols.map(function(item){
           var obj ={};
           obj.name = item;
           obj.select = true;
           return obj;
         });
        console.log(Jself.cols); */
      });
      function htmlValue($scope, row) {
         var value = row[this.field];
         var html = "<a href=#/objects/" + value + "><em>" + value + "</em></a>";
         return $sce.trustAsHtml(html);
     }
     function normal($scope, row) {
        var value = row[this.field];
        return value
    }
}]);

SFDCAdminHelperControllers.controller('SFDCObjectDetailCtrl', ['$routeParams','myFactory',
  function($routeParams,myFactory) {
    var self = this;
    self.objectname = $routeParams.objName;
    self.custObject ={};
    this.cols =['label','name','type','length'];
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
