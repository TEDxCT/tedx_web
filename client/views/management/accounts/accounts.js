Template.login.events({
  'click .login': function(event, template) {
    var email = template.$(".email");
    var password = template.$(".password");
    loginWithPassword(email, password);
  },
  'keypress input.email': function (event, template) {
    if (event.which === 13) {
      var email = template.$(".email");
      var password = template.$(".password");
      loginWithPassword(email, password);
    }
  },
  'keypress input.password': function (event, template) {
    if (event.which === 13) {
      var email = template.$(".email");
      var password = template.$(".password");
      loginWithPassword(email, password);
    }
  }
})

Template.createUser.events({
  'click .createUser': function(event, template) {
    var options = new Object();
    options.email = template.$(".email").val();
    options.password = template.$(".password").val();
    options.profile = new Object();
    options.profile.firstName = template.$(".firstName").val();
    options.profile.lastName = template.$(".lastName").val();
    options.profile.subscribedToUpdates = template.$(".subscribe").is(":checked");
    createNewAccount(options);
  },
  'keypress input.password': function (event, template) {
    if (event.which === 13) {
      var options = new Object();
      options.email = template.$(".email").val();
      options.password = template.$(".password").val();
      options.profile = new Object();
      options.profile.firstName = template.$(".firstName").val();
      options.profile.lastName = template.$(".lastName").val();
      options.profile.subscribedToUpdates = template.$(".subscribe").is(":checked");
      createNewAccount(options);
    }
  }
})

function loginWithPassword(email, password) {
  if(email.val()!="") {
    Meteor.loginWithPassword(email.val(), password.val(), function(error) {
      if(error) {
        $(".help-block").removeClass("hidden");
      }
      else {
        if(Session.get("nextPage")) {
          console.log(Session.get("nextPage"));
          Router.go(Session.get("nextPage"));
          Session.set("nextPage", undefined);
        }
        else Router.go("/");
      }
    });
  }
  else {
    $(".help-block").removeClass("hidden");
  }
}

function createNewAccount(options) {
  if(options.firstName!="") {
    $(".help-block.error-first-name").addClass("hidden");
    if(options.email!="") {
      $(".help-block.error-email").addClass("hidden");
      if(options.password!="") {
        $(".help-block.error-password").addClass("hidden");
        Accounts.createUser(options, function(error) {
          if(error) {
            FlashMessages.sendError("There was an error creating your account, please check all fields are complete and correct.");
          }
          else {
            if(Session.get("nextPage")) {
              Router.go(Session.get("nextPage"));
              Session.set("nextPage", undefined);
            }
            else Router.go("/");
          }
        });
      }
      else {
        $(".help-block.error-password").removeClass("hidden");
      }
    }
    else {
      $(".help-block.error-email").removeClass("hidden");
    }
  } else $(".help-block.error-first-name").removeClass("hidden");

}
