SpeakerApplicationSchema = new SimpleSchema({
email: {
    type: String,
    label: "Email Address",
    optional: false

  },
});

SpeakerNominationSchema = new SimpleSchema({
nominatorFirstName: {
    type: String,
    label: "Nominator First Name",
    optional: false
  },
  nominatorLastName: {
    type: String,
    label: "Nominator Last Name",
    optional: false
  },
  nominatorEmail: {
    type: String,
    label: "Nominator Email Address",
    optional: false
  },
  speakerContact: {
    type: String, 
    label: "Please provide contact details/information for the speaker you want to nominate. This could be an e-mail address, a cellphone number, a website, or a social media account",
optional: false
  },
  speakerIdea: {
    type: String,
    label: "What is this speakers' idea? and why is it worth spreading?",
    optional: false,
  }
});


SpeakerSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: "First Name",
    optional: false
  },
  lastName: {
    type: String,
    label: "Last Name",
    optional: false
  },
  speakerApplication: {
    type: SpeakerApplicationSchema,
    label: "Speaker Application",
  },
  speakerNomination: {
    type: SpeakerNominationSchema,
    label: "Speaker Nomination",
  }
});



speakers.attachSchema(SpeakerSchema);