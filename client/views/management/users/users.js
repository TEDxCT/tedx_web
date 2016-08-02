var updatedUsers = [];

Template.registerHelper('users',function(){
  var users = Meteor.users.find();
  return users;
});

Template.registerHelper('compareUserIds',function(checkboxId){
  var currentUserId = Meteor.userId();
  var admin = Meteor.users.findOne({'emails.address' : {$in: ['admin@tedxcapetown.org']}});

  if((Match.test(currentUserId, String))&&(Match.test(admin, Object))) {
    if (currentUserId == checkboxId || admin._id == checkboxId) {
      return true;
    }
  }

  return false;
});

Template.registerHelper('checkRole', function(userId, roleToCheck) {
  var userWithRoles = Meteor.users.findOne({"_id" : userId}, {"roles" : 1});
  var hasRole = false;
  if(Match.test(userWithRoles, Object)) {
    if (userWithRoles.roles != undefined) {
      var index = userWithRoles.roles.indexOf(roleToCheck);
      if (index > -1) {
        hasRole = true;
      }
    }
  }
  return hasRole;
});

Template.users.events({
  'click #checkbox': function(event, template) {

    Meteor.call('toggleUserRole', this._id, event.target.value, function(error, result) {
      if (error) {
        FlashMessages.sendError("Failed to update users");
        console.log(error);
      } else {
        FlashMessages.sendSuccess("Updated user");
      }
    })
  }
})
