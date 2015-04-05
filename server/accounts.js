Accounts.onCreateUser(function(options, user) {  
  options.profile.permissions= "guest";
  return user;
});
