Meteor.methods({
  setRoleForUser: function(userId, roleToUpdate){
    var loggedInUser = Meteor.user();

    if (!loggedInUser || !loggedInUser.isAdmin) {
      throw new Meteor.Error(403, "Access denied");
    }
    var user = Meteor.users.findOne({"_id" : userId, "roles": {$in: [roleToUpdate]}});
    var didUpdate;
    if (user != undefined) {
      didUpdate = Meteor.users.update({"_id": userId},  { $pull: { 'roles':roleToUpdate}});
    } else {
      didUpdate = Meteor.users.update({"_id": userId},  { $push: { 'roles':roleToUpdate}});
    }
    return didUpdate;
  },
  setAdmin: function(ids) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser || !loggedInUser.isAdmin) {
      throw new Meteor.Error(403, "Access denied");
    }
    var didUpdate = Meteor.users.update({"_id": {$in: ids}},  { $set: { 'isAdmin': true }}, {multi: true});
    return didUpdate;
  },
  removeAdmin: function(ids) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser || !loggedInUser.isAdmin) {
      throw new Meteor.Error(403, "Access denied");
    }
    var didUpdate = Meteor.users.update({"_id": {$in: ids}},  { $set: { 'isAdmin': false }}, {multi: true});
    return didUpdate;
  },
  userHasAdminRole: function() {
    var loggedInUser = Meteor.user();
    return loggedInUser.isAdmin;
  },
  checkRoleOnServer: function(userId, roleToCheck) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser || !loggedInUser.isAdmin) {
      throw new Meteor.Error(403, "Access denied");
    }

    var userWithRoles = Meteor.users.findOne({"_id" : userId}, {"roles" : 1});
    var hasRole = false;
    if (userWithRoles.roles != undefined) {
      var index = userWithRoles.roles.indexOf(roleToCheck);
      if (index > -1) {
        hasRole = true;
      }
    }
    return hasRole;

  },
  resendVerificationEmail: function () {
    var currentUser = Meteor.user();
    if(currentUser) {
      var emailAddress = currentUser.emails[0].address;
      if(emailAddress) Accounts.sendVerificationEmail(currentUser._id, emailAddress);
    }
    else throw new Meteor.Error("pants-not-found", "Can't find my pants");

    return "Verification email sent";
  },
  removeVote: function(vote) {
    console.log(vote);
    votes.remove({"_id":vote});
  },
  categoryAnalyticsData: function(industries) {
    var dataCube = new Object();

    for(var i = 0; i<levels.length; i++) {
      dataCube[levels[i]] = subjects;

      for(var j = 0; j<subjects.length; j++) {
        if((levels[i]="planetary")&&(subjects[j].name=="physiological_biological")) {
          console.log("Planets");
          console.log(videos.find({"categories.levels":{$in: ["planetary"]}, "categories.subjects":{$in: ["physiological_biological"]}}).count());
        }

        dataCube[levels[i]][j].count = videos.find({"categories.levels":{$in: [levels[i]]}, "categories.subjects":{$in: [subjects[j].name]}}).count();
        // console.log(subject.count);
        // dataCube[levels[i]][j] = subject;
      }
      console.log(dataCube);
    }

    // jquery.each(levels, function(levelIndex, levelName) {
    //   jquery.each(subject, function(subjectIndex, subjectName) {
    //     dataCube[levelName][subjectName] = Videos.find({
    //       "categories.levels":{$in: [levelName]},
    //       "categories.subjects":{$in: [subjectName]},
    //       "categories.industries":{$in: industries}
    //     }).count();
    //   });
    // })
    return dataCube;
  }
});
