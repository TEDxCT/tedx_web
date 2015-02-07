Template.register.events({
	'click .cta' : function() {
		Router.go('speakers.register.apply');
	},

});

Template.nomination.events({
	'submit' : function() {
		Router.go('speakers.register.complete');
	}
});


Template.application.events({
	'submit' : function() {
		Router.go('speakers.register.complete');
	}
});