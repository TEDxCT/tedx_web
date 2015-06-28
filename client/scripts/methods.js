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

trackPageView = function(page_type, page_name) {
  var mixpixel = new Object();
  mixpixel.page_type = page_type;
  mixpixel.page_name = page_name;
  mixpixel.user_type = userType();
  mixpanel.track('View', mixpixel);
}
