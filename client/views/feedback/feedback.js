Template.feedback.events({
  "click #open-modal" : function(e,t) {
        e.preventDefault();
        $("#modal").modal("show");
        },
});
