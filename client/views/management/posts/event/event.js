Template.editEventSessions.helpers({
  'speakerInEvent': function() {
    return speakers.find({'selectedEventId' : this._id});
  }
})
