Template.feedback.events({
    "click .close":function(event, template) {
        $(template.find(".overlay")).addClass("fadeOutUp");
        $(template.find(".overlay-content")).addClass("bounceOutUp");
        setTimeout(function(){Session.set("feedbacking", false);}, 300);
    }
});
