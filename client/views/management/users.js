Template.registerHelper('users',function(){
  var users = Meteor.users.find();
  return users;
});
