
userType = function() {
  if(userIsInRole('admin')) return 'Admin';
  else if(userIsVerified) return 'Normal';
  else return 'Guest';
}

userIsInRole = function(role) {
  var emailIsVerified = userIsVerified();
  // if(Meteor.user()!=undefined) {
  //   if(Meteor.user().emails[0].verified==true) {
  //     emailIsVerified = Meteor.user().emails[0].verified;
  //   }
  // }

  var userIsInRole = false;
  if (Roles.userIsInRole(Meteor.user(), ['admin', role])) {
    userIsInRole = true;
  }

  return (userIsInRole && emailIsVerified);
}
userIsVerified = function() {
  var emailIsVerified = false;
  if(Meteor.user()!=undefined) {
    if(Meteor.user().emails[0].verified==true) {
      emailIsVerified = Meteor.user().emails[0].verified;
    }
  }
  return emailIsVerified;
}

// Track page views with Mixpanel
trackPageView = function(page_type, page_name) {
  var mixpixel = new Object();
  // 
  // if(Session.get("user")) {
  //   var currentUser = Session.get("user");
  //   // Check if this is a first time load for this user
  //   if(currentUser.new) mixpixel.first_time = true;
  //   else mixpixel.first_time = false;
  // }
  mixpixel.page_type = page_type;
  mixpixel.page_name = page_name;
  mixpixel.user_type = userType();
  mixpanel.track('View', mixpixel);
}
