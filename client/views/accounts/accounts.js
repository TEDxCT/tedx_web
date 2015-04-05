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

function loginWithPassword(email, password) {
  if(email.val()!="") {
    Meteor.loginWithPassword(email.val(), password.val(), function(error) {
      if(error) {
        $(".help-block").removeClass("hidden");
      }
      else Router.go("/");
    });
  }
  else {
    $(".help-block").removeClass("hidden");
  }
}
