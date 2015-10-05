SFDCAdminHelperControllers.
controller('SFDCObjectController',['$rootScope','myFactory',function($rootScope,myFactory){
    this.artist = myFactory.getArtist();
}]);
