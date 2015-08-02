
Template.editEventSessions.onRendered(function() {
  $("#s1p1_"+this.data.session1[0]).attr("selected", true);
  $("#s1p2_"+this.data.session1[1]).attr("selected", true);
  $("#s1p3_"+this.data.session1[2]).attr("selected", true);
  $("#s1p4_"+this.data.session1[3]).attr("selected", true);

  $("#s2p1_"+this.data.session2[0]).attr("selected", true);
  $("#s2p2_"+this.data.session2[1]).attr("selected", true);
  $("#s2p3_"+this.data.session2[2]).attr("selected", true);
  $("#s2p4_"+this.data.session2[3]).attr("selected", true);

  $("#s3p1_"+this.data.session3[0]).attr("selected", true);
  $("#s3p2_"+this.data.session3[1]).attr("selected", true);
  $("#s3p3_"+this.data.session3[2]).attr("selected", true);
  $("#s3p4_"+this.data.session3[3]).attr("selected", true);

  $("#s4p1_"+this.data.session4[0]).attr("selected", true);
  $("#s4p2_"+this.data.session4[1]).attr("selected", true);
  $("#s4p3_"+this.data.session4[2]).attr("selected", true);
  $("#s4p4_"+this.data.session4[3]).attr("selected", true);
})

Template.editEventSessions.helpers({
  'speakerInEvent': function() {
    return speakers.find({'selectedEventId' : this._id});
  }
})
