
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
  if (Roles.userIsInRole(Meteor.user(), [role])) {
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


trackPageView = function(page_type, page_name) {
  var mixpixel = new Object();
  mixpixel.page_type = page_type;
  mixpixel.page_name = page_name;
  mixpixel.user_type = userType();
  mixpanel.track('View', mixpixel);
}
