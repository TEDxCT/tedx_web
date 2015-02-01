ContactDetailsSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Contact Name",
  },
  phoneNumber: {
    type: Number,
    label: "Contact Number",
  },
  email: {
    type: String,
    label: "Contact Email"
  },
});

SpeakerSchema = new SimpleSchema({
contact: {
    type: ContactDetailsSchema,
    optional: true

  },
});

speakers.attachSchema(SpeakerSchema);