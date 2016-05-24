Template.singlePage.events({
	'click .logo': function() {
		window.open("http://www.tedxcapetown.org","_self");
	}
});

Template.default.helpers({
	"color": function() {
		return "red";
	},
	"selected": function(navLink) {
		if(navLink==Session.get("navSelected")) return "active";
		else return "";
	}
});

Template.default.events({
	'click .mobile-menu-toggle': function() {
		$(".nav-links").toggleClass("visible-mobile");
	}
})
