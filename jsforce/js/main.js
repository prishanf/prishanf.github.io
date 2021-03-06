jsforce.browser.init({
  clientId: '3MVG9A2kN3Bn17hv5Z.MnUUfJRTgrq0KwgysLOXrljNJ1JB6HijwsXoNi8Imxvwi3b6pknYch_sU771SM1lTh',
  redirectUri: 'https://jsforce.github.io/callback.html',
  proxyUrl: 'https://node-salesforce-proxy.herokuapp.com/proxy/'
});

jsforce.browser.on('connect', function(conn) {
  var userInfo;
  if (localStorage.getItem('sf_user_info')) {
    userInfo = JSON.parse(localStorage.getItem('sf_user_info'));
    renderProfile();
    return;
  }
  conn.identity().then(function(res) {
    console.log('id', res);
    userInfo = {
      username: res.username,
      photos: res.photos
    };
    localStorage.setItem('sf_user_info', JSON.stringify(userInfo));
    renderProfile();
  });
  function renderProfile() {
    $('#navigation .navbar-right li.login').hide();
    var profileMenu = $('#navigation .navbar-right li.profile').show();
    profileMenu.find('.profile-icon').empty().append(
      $('<img>').attr('src',
        userInfo.photos && userInfo.photos.thumbnail ?
        userInfo.photos.thumbnail + '?oauth_token=' + conn.accessToken :
        '/images/profile-none.png'
      )
    );
    profileMenu.find('.profile-name').text(userInfo.username).attr('title', userInfo.username);
  }
  window.jsconn = jsforce.browser.connection;
});
jsforce.browser.on('disconnect', function() {
  localStorage.removeItem('sf_user_info')
  $('#navigation .navbar-right li.login').show();
  $('#navigation .navbar-right li.profile').hide();
});

$('#oauth-dialog .connect').on('click', function() {
  jsforce.browser.login({
    loginUrl: $('#oauth-dialog select[name=loginUrl]').val(),
    popup: { width: 912, height: 600 }
  }, function(err) {
    if (err) { alert(err.message); }
    $('#oauth-dialog').modal('hide');
  });
});

conn = jsforce.browser.connection;
var app = angular.module('SFDCAdminHelper',['ngRoute','ngTable','ngSanitize','SFDCAdminHelperControllers','SFDCAdminHelperServices']);
var sfdcConn = jsforce.browser.connection;


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/objects', {
        templateUrl: 'partials/object-list.html',
        controller: 'SFDCObjectListController as ctrl'
      }).
      when('/objects/:objName', {
        templateUrl: 'partials/object-detail.html',
        controller: 'SFDCObjectDetailCtrl',
        controllerAs: "ctrl"
      }).
      when('/fieldNew/:objName', {
        templateUrl: 'partials/field-new.html',
        controller: 'SFDCFieldCreateCtrl',
        controllerAs: "ctrl"
      }).
      otherwise({
        redirectTo: '/objects'
      });
  }]);
