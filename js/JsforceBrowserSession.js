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
});
jsforce.browser.on('disconnect', function() {
  localStorage.removeItem('sf_user_info')
  $('#navigation .navbar-right li.login').show();
  $('#navigation .navbar-right li.profile').hide();
});