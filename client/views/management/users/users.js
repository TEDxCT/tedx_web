var updatedUsers = [];

Template.registerHelper('users',function(){
  var users = Meteor.users.find();
  return users;
});

Template.registerHelper('compareUserIds',function(checkboxId){
  var currentUserId = Meteor.userId();
  if (currentUserId == checkboxId) {
    return true;
  }
  return false;
});

Template.registerHelper('checkRole', function(userId, roleToCheck) {
  var userWithRoles = Meteor.users.findOne({"_id" : userId}, {"roles" : 1});
  var hasRole = false;
  if (userWithRoles.roles != undefined) {
    var index = userWithRoles.roles.indexOf(roleToCheck);
    if (index > -1) {
      hasRole = true;
    }
  }
  return hasRole;
});

Template.users.events({
  'click .btn-save': function(event, template) {
    //
    // var adminUsers = $.grep(updatedUsers, function(e){ return e.isAdmin == true; });
    // var normalUsers = $.grep(updatedUsers, function(e){ return e.isAdmin == false; });
    //
    // var normalUserIds = []
    // normalUsers.forEach(function(item) {
    //   normalUserIds.push(item._id)
    // })
    //
    // var adminUserIds = []
    // adminUsers.forEach(function(item) {
    //   adminUserIds.push(item._id)
    // })
    //
    // if (adminUserIds.length > 0) {
    //   Meteor.call('setAdmin', adminUserIds, function(error, result) {
    //     if (error) {
    //       FlashMessages.sendError("Failed to update users");
    //     } else {
    //       FlashMessages.sendSuccess(result + " admins added");
    //     }
    //   })
    // }
    //
    // if (normalUserIds.length > 0) {
    //   Meteor.call('removeAdmin', normalUserIds, function(error, result) {
    //     if (error) {
    //       FlashMessages.sendError("Failed to update users");
    //     } else {
    //       FlashMessages.sendSuccess(result + " admins removed");
    //     }
    //   })
    // }
    //
    // updatedUsers = [];

  },
  'click #checkbox': function(event, template) {

    Meteor.call('setRoleForUser', this._id, event.target.value, function(error, result) {
      if (error) {
        FlashMessages.sendError("Failed to update users");
      } else {
        FlashMessages.sendSuccess("Updated user");
      }
    })
  }
})
