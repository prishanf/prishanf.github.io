var SFDCAdminHelperControllers = angular.module('SFDCAdminHelperControllers', []);
SFDCAdminHelperControllers.controller('SFDCObjectListController',['$rootScope','myFactory','$http','NgTableParams','$sce',function($rootScope,myFactory,$http,NgTableParams,$sce){
    self = this;
    this.objects =['Init'];

    self.colsd = [
      { field: "label", title: "Label", show: true,filter: { label: "text" } ,sortable: "label", getValue: htmlValue},
      { field: "name", title: "Name", show: true,filter: { name: "text" } ,sortable: "name", getValue: normal},
      { field: "custom", title: "Custom", show: true, filter: { custom: "select" }, getValue: normal,filterData: [{id:true,title:'True'},{id:false,title:'False'}], sortable: "custom"},
      { field: "customSetting", title: "Custom Setting", show: true, getValue: normal, filter: { customSetting: "select" }, filterData: [{id:true,title:'True'},{id:false,title:'False'}], sortable: "customSetting"}
    ];

    self.tableParams = new NgTableParams();
    myFactory.getObjects().then(function(data){
        self.objects = data;
        self.tableParams.settings({
              dataset: data
        });
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

SFDCAdminHelperControllers.controller('SFDCObjectDetailCtrl', ['$routeParams','myFactory','NgTableParams',
  function($routeParams,myFactory,NgTableParams) {
    var self = this;
    self.objectname = $routeParams.objName;
    self.custObject ={};
    this.cols =['label','name','type','length'];
    self.fieldTypes = [{id:'string',title:'Text'},{id:'picklist',title:'Picklist'},{id:'boolean',title:'Boolean'},
                      {id:'reference',title:'reference'},{id:'textarea',title:'Textarea'},{id:'double',title:'double'},
                      {id:'phone',title:'Phone'},{id:'int',title:'Number'},{id:'datetime',title:'Datetime'},{id:'date',title:'Date'}];
    self.colsd = [
      { field: "label", title: "Label", show: true,filter: { label: "text" } ,sortable: "label"},
      { field: "name", title: "Name", show: true,filter: { name: "text" } ,sortable: "name"},
      { field: "type", title: "Type", show: true, filter: { type: "select" }, filterData: self.fieldTypes, sortable: "type"},
      { field: "custom", title: "Custom", show: true, filter: { custom: "select" },filterData: [{id:true,title:'True'},{id:false,title:'False'}], sortable: "custom"},
      { field: "length", title: "Length", show: true, sortable: "length"},
      { field: "action", title: "", show: true,  dataType: "command"}
    ];

    self.tableParams = new NgTableParams();

    myFactory.getObjectsDetails(self.objectname).then(function(data){
      self.custObject = data;
      console.log(data);
      self.tableParams.settings({
            dataset: data.fields
      });
    });

    this.del = function(row){
      console.log(row);
    }
    this.showpickList = function (row){
        console.log(row.picklistValues);
    }
    this.getPickListValues = function(field){
      var picklist = field.picklistValues.map(function(item){
        return item.label;
      });
      return picklist;
    }
}]);

SFDCAdminHelperControllers.controller('SFDCFieldCreateCtrl', ['$routeParams','SFDCFieldService','NgTableParams',
  function($routeParams,SFDCFieldService,NgTableParams) {
    self= this;
    this.fieldTypes =['Number','Text','Currency','Percent','Checkbox','AutoNumber','Date','Date/Time','Email','Geolocation','Phone','Picklist','TextArea','TextAreaLong'];
    self.objectname = $routeParams.objName;
    this.fields = [
        {type:'Text', label:'', length:18, fullName:'', precision:'',scale:'',api:'a'},
        {type:'Text', label:'', length:18, fullName:'', precision:'',scale:'',api:'p'}
      ];
    this.addMultipleFields =function () {
      for(var i=0; i<this.numOfFields;i++){
          this.fields.push({type: this.fieldType, label:''});
      }
    };
    this.addField = function() {
      this.fields.push({});
    };

    this.removeField = function(contactToRemove) {
      var index = this.fields.indexOf(contactToRemove);
      this.fields.splice(index, 1);
    };

    this.saveFields = function (){
      SFDCFieldService.craeteField(self.fields);
    }

    this.change = function(val){
      val.api = val.label.replace(/[/\s-]/g,'_')+'__c';
    }

    this.clearField = function(contact) {
      contact.label = '';
      contact.api = '';
      contact.length ='';
    };
}]);
