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

Template.users.events({
  'click .btn-save': function(event, template) {

    var adminUsers = $.grep(updatedUsers, function(e){ return e.isAdmin == true; });
    var normalUsers = $.grep(updatedUsers, function(e){ return e.isAdmin == false; });

    var normalUserIds = []
    normalUsers.forEach(function(item) {
      normalUserIds.push(item._id)
    })

    var adminUserIds = []
    adminUsers.forEach(function(item) {
      adminUserIds.push(item._id)
    })

    if (adminUserIds.length > 0) {
      Meteor.call('setAdmin', adminUserIds, function(error, result) {
        if (error) {
          FlashMessages.sendError("Failed to update users");
        } else {
          FlashMessages.sendSuccess(result + " admins added");
        }
      })
    }

    if (normalUserIds.length > 0) {
      Meteor.call('removeAdmin', normalUserIds, function(error, result) {
        if (error) {
          FlashMessages.sendError("Failed to update users");
        } else {
          FlashMessages.sendSuccess(result + " admins removed");
        }
      })
    }

    updatedUsers = [];

  },
  'click #checkbox': function(event, template) {
    this.isAdmin = !this.isAdmin;
    var idToCheck = this._id

    var existingUpdatedUser;
    updatedUsers.filter(function(e) {
      if (e._id == idToCheck) {
        existingUpdatedUser = e;
      };
    })

    if (existingUpdatedUser != undefined) {
      var i = updatedUsers.indexOf(existingUpdatedUser);
      updatedUsers[i] = this;
    } else {
      updatedUsers.push(this);
    }
  }
})
