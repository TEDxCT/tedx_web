userAuthenticated = function() {
  if(Meteor.userId()==null) return false;
  else return true;
}

userType = function() {
  if(isAdminUser) return 'Admin';
  else if(userAuthenticated) return 'Normal';
  else return 'Guest';
}

isAdminUser = function() {
  if(Meteor.user()!=undefined) {
    if(Meteor.user().emails[0].verified==true) {
      return Meteor.user().emails[0].verified;
    }
  }
  return false;
}

trackPageView = function() {
  var mixpixel = new Object();
  mixpixel.page_type = 'normal';
  mixpixel.page_name = 'watch';
  mixpixel.user_type = userType();
  mixpanel.track('View', mixpixel);
}
